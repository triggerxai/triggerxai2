import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const TABLE_NAME = "Newsletter Subscribers";

const inputSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(255),
});

export const subscribeToNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const pat = process.env.AIRTABLE_PAT;
    const baseId = process.env.AIRTABLE_BASE_ID;
    if (!pat || !baseId) {
      return { ok: false as const, error: "Newsletter is not configured yet." };
    }

    const tableUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(TABLE_NAME)}`;
    const headers = {
      Authorization: `Bearer ${pat}`,
      "Content-Type": "application/json",
    };

    try {
      // Check for duplicate
      const filter = encodeURIComponent(`LOWER({Email})='${data.email.replace(/'/g, "\\'")}'`);
      const dupRes = await fetch(`${tableUrl}?filterByFormula=${filter}&maxRecords=1`, { headers });
      if (dupRes.ok) {
        const dupJson = (await dupRes.json()) as { records?: unknown[] };
        if (dupJson.records && dupJson.records.length > 0) {
          return { ok: true as const, duplicate: true };
        }
      }

      // Insert
      const createRes = await fetch(tableUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          records: [{ fields: { Email: data.email } }],
          typecast: true,
        }),
      });

      if (!createRes.ok) {
        const text = await createRes.text();
        console.error(`Airtable insert failed [${createRes.status}]: ${text}`);
        return { ok: false as const, error: "Couldn't subscribe. Please try again." };
      }

      return { ok: true as const, duplicate: false };
    } catch (err) {
      console.error("Newsletter subscribe error:", err);
      return { ok: false as const, error: "Network error. Please try again." };
    }
  });
