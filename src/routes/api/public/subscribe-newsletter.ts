import { createFileRoute } from "@tanstack/react-router";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const TABLE_NAME = "Newsletter Subscribers";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

export const Route = createFileRoute("/api/public/subscribe-newsletter")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      POST: async ({ request }) => {
        const pat = process.env.AIRTABLE_PAT;
        const baseId = process.env.AIRTABLE_BASE_ID;
        if (!pat || !baseId) {
          return json({ error: "Newsletter is not configured." }, 500);
        }

        let payload: { email?: unknown };
        try {
          payload = await request.json();
        } catch {
          return json({ error: "Invalid JSON" }, 400);
        }

        const email =
          typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
        if (!email || email.length > 255 || !EMAIL_RE.test(email)) {
          return json({ error: "Please enter a valid email." }, 400);
        }

        const tableUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(TABLE_NAME)}`;
        const headers = {
          Authorization: `Bearer ${pat}`,
          "Content-Type": "application/json",
        };

        try {
          const filter = encodeURIComponent(
            `LOWER({Email})='${email.replace(/'/g, "\\'")}'`,
          );
          const dupRes = await fetch(
            `${tableUrl}?filterByFormula=${filter}&maxRecords=1`,
            { headers },
          );
          if (dupRes.ok) {
            const dupJson = (await dupRes.json()) as { records?: unknown[] };
            if (dupJson.records && dupJson.records.length > 0) {
              return json({ ok: true, duplicate: true });
            }
          }

          const createRes = await fetch(tableUrl, {
            method: "POST",
            headers,
            body: JSON.stringify({
              records: [{ fields: { Email: email } }],
              typecast: true,
            }),
          });

          if (!createRes.ok) {
            const text = await createRes.text();
            console.error(`Airtable insert failed [${createRes.status}]: ${text}`);
            return json({ error: "Couldn't subscribe. Please try again." }, 502);
          }

          return json({ ok: true, duplicate: false });
        } catch (err) {
          console.error("Newsletter subscribe error:", err);
          return json({ error: "Network error. Please try again." }, 500);
        }
      },
    },
  },
});
