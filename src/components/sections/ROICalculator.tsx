import { useEffect, useRef, useState } from "react";
import {
  X,
  Calculator,
  ArrowRight,
  Bot,
  Phone,
  TrendingUp,
  PiggyBank,
  Percent,
  Sparkles,
  Clock,
  Activity,
  Gauge,
} from "lucide-react";

interface ROICalculatorProps {
  open: boolean;
  onClose: () => void;
}

const currencies = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "INR", symbol: "₹" },
  { code: "BDT", symbol: "৳" },
  { code: "AUD", symbol: "A$" },
  { code: "CAD", symbol: "C$" },
  { code: "SGD", symbol: "S$" },
];

/** Animated number hook — smoothly transitions between values */
const useAnimatedNumber = (value: number, duration = 600) => {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    fromRef.current = display;
    startRef.current = null;
    const target = value;

    const tick = (ts: number) => {
      if (startRef.current == null) startRef.current = ts;
      const t = Math.min(1, (ts - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = fromRef.current + (target - fromRef.current) * eased;
      setDisplay(next);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return display;
};

const ROICalculator = ({ open, onClose }: ROICalculatorProps) => {
  // Inputs
  const [currency, setCurrency] = useState("USD");
  const [automationType, setAutomationType] = useState<"chatbot" | "voice">("chatbot");

  const [monthlyInquiries, setMonthlyInquiries] = useState(2000);
  const [conversionRate, setConversionRate] = useState(10);
  const [avgOrderValue, setAvgOrderValue] = useState(5000);
  const [missedLeads, setMissedLeads] = useState(120);
  const [employeeCost, setEmployeeCost] = useState(3000);

  // Assumptions (editable)
  const [leadRecovery, setLeadRecovery] = useState(30);
  const [conversionIncrease, setConversionIncrease] = useState(15);
  const [missedCallRecovery, setMissedCallRecovery] = useState(40);
  const [bookingRateIncrease, setBookingRateIncrease] = useState(20);

  const sym = currencies.find((c) => c.code === currency)?.symbol || "$";

  // ===== Calculations (UNCHANGED LOGIC) =====
  const recoveryRate = automationType === "voice" ? missedCallRecovery : leadRecovery;
  const convIncrease = automationType === "voice" ? bookingRateIncrease : conversionIncrease;

  const recoveredLeads = Math.round(missedLeads * (recoveryRate / 100));
  const additionalConversions = Math.round(
    recoveredLeads * ((conversionRate + convIncrease) / 100)
  );
  const monthlyRevenue = additionalConversions * avgOrderValue;
  const costSavings = Math.round(employeeCost * 0.4);
  const annualGain = (monthlyRevenue + costSavings) * 12;
  const roiPercent =
    employeeCost > 0 ? Math.round(((monthlyRevenue + costSavings) / employeeCost) * 100) : 0;

  // Derived dashboard metrics
  const hoursSaved = Math.round(monthlyInquiries * 0.05 + recoveredLeads * 0.5);
  const efficiencyGain = Math.min(98, 40 + Math.round(recoveryRate * 0.6 + convIncrease * 0.8));
  const workloadReduction = Math.min(95, Math.round(recoveryRate * 0.7 + 25));

  // Animated values
  const aRevenue = useAnimatedNumber(monthlyRevenue);
  const aAnnual = useAnimatedNumber(annualGain);
  const aROI = useAnimatedNumber(roiPercent);
  const aHours = useAnimatedNumber(hoursSaved);
  const aEfficiency = useAnimatedNumber(efficiencyGain);
  const aWorkload = useAnimatedNumber(workloadReduction);
  const aConversions = useAnimatedNumber(additionalConversions);
  const aSavings = useAnimatedNumber(costSavings);

  // Gauge geometry — semicircle
  const gaugeMax = 300;
  const gaugePct = Math.min(1, Math.max(0, aROI / gaugeMax));
  const radius = 120;
  const circumference = Math.PI * radius;
  const dash = circumference * gaugePct;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-6xl max-h-[92vh] overflow-hidden rounded-3xl animate-fade-in"
        style={{
          animationDuration: "0.25s",
          background: "linear-gradient(180deg, #fbfaf6 0%, #f6f4ee 100%)",
          boxShadow:
            "0 30px 80px -20px rgba(15,23,42,0.35), 0 8px 24px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.7)",
          border: "1px solid rgba(15,23,42,0.06)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-black/5">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(185,166,243,0.25), rgba(190,242,100,0.25))",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              <Calculator className="w-5 h-5 text-[#0f172a]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] tracking-tight">
                ROI Intelligence Dashboard
              </h2>
              <p className="text-[11px] sm:text-xs text-[#0f172a]/50">
                Live AI automation impact estimator
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            data-click-sound
            className="w-8 h-8 rounded-full bg-white border border-black/5 flex items-center justify-center hover:bg-[#f5f5f7] transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-[#0f172a]" />
          </button>
        </div>

        {/* Body — split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] overflow-y-auto max-h-[calc(92vh-65px)]">
          {/* ============ LEFT — INPUTS ============ */}
          <div className="p-5 sm:p-7 space-y-5 border-b lg:border-b-0 lg:border-r border-black/5">
            {/* Currency segmented */}
            <Field label="Currency">
              <div className="flex flex-wrap gap-1.5">
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    data-click-sound
                    onClick={() => setCurrency(c.code)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      currency === c.code
                        ? "bg-[#0a0a0a] text-white shadow-sm"
                        : "bg-white text-[#0f172a]/70 border border-black/5 hover:border-black/15"
                    }`}
                  >
                    <span className="mr-1">{c.symbol}</span>
                    {c.code}
                  </button>
                ))}
              </div>
            </Field>

            {/* Automation type */}
            <Field label="Automation Type">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "chatbot", title: "AI Chatbot", icon: Bot },
                  { id: "voice", title: "AI Voice Agent", icon: Phone },
                ].map((t) => {
                  const Icon = t.icon;
                  const active = automationType === t.id;
                  return (
                    <button
                      key={t.id}
                      data-click-sound
                      onClick={() => setAutomationType(t.id as "chatbot" | "voice")}
                      className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? "bg-[#0a0a0a] text-white shadow-md"
                          : "bg-white text-[#0f172a]/80 border border-black/5 hover:border-black/15"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {t.title}
                    </button>
                  );
                })}
              </div>
            </Field>

            {/* Sliders */}
            <Slider
              label="Monthly customer inquiries"
              value={monthlyInquiries}
              onChange={setMonthlyInquiries}
              min={50}
              max={20000}
              step={50}
              format={(v) => v.toLocaleString()}
            />

            <Slider
              label="Lead-to-customer conversion rate"
              value={conversionRate}
              onChange={setConversionRate}
              min={1}
              max={50}
              step={1}
              format={(v) => `${v}%`}
            />

            <Slider
              label="Missed leads per month"
              value={missedLeads}
              onChange={setMissedLeads}
              min={0}
              max={2000}
              step={5}
              format={(v) => v.toLocaleString()}
            />

            {/* Two number inputs */}
            <div className="grid grid-cols-2 gap-3">
              <NumberInput
                label={`Avg order value (${sym})`}
                value={avgOrderValue}
                onChange={setAvgOrderValue}
              />
              <NumberInput
                label={`Employee cost / mo (${sym})`}
                value={employeeCost}
                onChange={setEmployeeCost}
              />
            </div>

            {/* Assumptions */}
            <div className="pt-2 border-t border-black/5">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-[#0f172a]/45 mb-3">
                Impact Assumptions
              </p>
              {automationType === "chatbot" ? (
                <div className="space-y-4">
                  <Slider
                    label="Lead recovery increase"
                    value={leadRecovery}
                    onChange={setLeadRecovery}
                    min={5}
                    max={80}
                    step={1}
                    format={(v) => `${v}%`}
                  />
                  <Slider
                    label="Conversion rate increase"
                    value={conversionIncrease}
                    onChange={setConversionIncrease}
                    min={2}
                    max={60}
                    step={1}
                    format={(v) => `${v}%`}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <Slider
                    label="Missed call recovery"
                    value={missedCallRecovery}
                    onChange={setMissedCallRecovery}
                    min={5}
                    max={90}
                    step={1}
                    format={(v) => `${v}%`}
                  />
                  <Slider
                    label="Booking rate increase"
                    value={bookingRateIncrease}
                    onChange={setBookingRateIncrease}
                    min={2}
                    max={60}
                    step={1}
                    format={(v) => `${v}%`}
                  />
                </div>
              )}
            </div>
          </div>

          {/* ============ RIGHT — DASHBOARD ============ */}
          <div className="p-5 sm:p-7 space-y-4 bg-gradient-to-br from-[#fbfaf6] via-[#f7f4ec] to-[#f3eee2]">
            {/* Hero savings card with gauge */}
            <div
              className="relative rounded-2xl p-5 sm:p-6 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #faf8f3 100%)",
                border: "1px solid rgba(15,23,42,0.05)",
                boxShadow:
                  "0 12px 32px -8px rgba(185,166,243,0.20), 0 2px 8px rgba(15,23,42,0.04)",
              }}
            >
              {/* Soft glow */}
              <div
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-50 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(185,166,243,0.45) 0%, transparent 70%)",
                }}
              />
              <div
                className="absolute -bottom-20 -left-10 w-48 h-48 rounded-full opacity-40 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(190,242,100,0.4) 0%, transparent 70%)",
                }}
              />

              <div className="relative flex flex-col items-center text-center">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 border border-black/5 mb-3">
                  <Sparkles className="w-3 h-3 text-[#0f172a]/60" />
                  <span className="text-[10px] font-semibold tracking-wider text-[#0f172a]/60 uppercase">
                    Live ROI Estimate
                  </span>
                </div>

                {/* Gauge */}
                <div className="relative w-full max-w-[280px] aspect-[2/1]">
                  <svg viewBox="0 0 280 150" className="w-full h-full">
                    <defs>
                      <linearGradient id="roi-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#b9a6f3" />
                        <stop offset="60%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#bef264" />
                      </linearGradient>
                    </defs>
                    {/* Track */}
                    <path
                      d={`M 20 140 A ${radius} ${radius} 0 0 1 260 140`}
                      stroke="rgba(15,23,42,0.06)"
                      strokeWidth="14"
                      fill="none"
                      strokeLinecap="round"
                    />
                    {/* Value */}
                    <path
                      d={`M 20 140 A ${radius} ${radius} 0 0 1 260 140`}
                      stroke="url(#roi-grad)"
                      strokeWidth="14"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${dash} ${circumference}`}
                      style={{ transition: "stroke-dasharray 0.3s ease-out" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-[#0f172a]/50">
                      Automation ROI
                    </p>
                    <p className="text-3xl sm:text-4xl font-extrabold text-[#0a0a0a] tabular-nums leading-none">
                      {Math.round(aROI).toLocaleString()}%
                    </p>
                  </div>
                </div>

                <div className="mt-2">
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-[#0f172a]/50">
                    Monthly Revenue Recovered
                  </p>
                  <p className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#0a0a0a] tabular-nums">
                    {sym} {Math.round(aRevenue).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Stat grid */}
            <div className="grid grid-cols-2 gap-3">
              <Stat
                icon={<PiggyBank className="w-4 h-4" />}
                tint="#bef264"
                label="Cost savings"
                value={`${sym} ${Math.round(aSavings).toLocaleString()}`}
                sub="/ month"
              />
              <Stat
                icon={<Clock className="w-4 h-4" />}
                tint="#b9a6f3"
                label="Hours saved"
                value={`${Math.round(aHours).toLocaleString()}`}
                sub="hrs / month"
              />
              <Stat
                icon={<TrendingUp className="w-4 h-4" />}
                tint="#a78bfa"
                label="New conversions"
                value={`+${Math.round(aConversions).toLocaleString()}`}
                sub="/ month"
              />
              <Stat
                icon={<Activity className="w-4 h-4" />}
                tint="#bef264"
                label="Annual gain"
                value={`${sym} ${Math.round(aAnnual).toLocaleString()}`}
                sub="projected"
              />
            </div>

            {/* Efficiency bars */}
            <div
              className="rounded-2xl p-4 sm:p-5 space-y-3.5 bg-white/80 backdrop-blur-sm"
              style={{
                border: "1px solid rgba(15,23,42,0.05)",
                boxShadow: "0 4px 16px rgba(15,23,42,0.04)",
              }}
            >
              <Bar
                icon={<Gauge className="w-3.5 h-3.5" />}
                label="Operational efficiency"
                value={Math.round(aEfficiency)}
                color="linear-gradient(90deg, #b9a6f3, #a78bfa)"
              />
              <Bar
                icon={<Activity className="w-3.5 h-3.5" />}
                label="Manual workload reduced"
                value={Math.round(aWorkload)}
                color="linear-gradient(90deg, #bef264, #84cc16)"
              />
            </div>

            {/* Insight */}
            <div
              className="rounded-2xl p-4 flex gap-3"
              style={{
                background:
                  "linear-gradient(135deg, rgba(185,166,243,0.12), rgba(190,242,100,0.12))",
                border: "1px solid rgba(185,166,243,0.25)",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #b9a6f3, #bef264)",
                  color: "#0a0a0a",
                }}
              >
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-[13px] leading-relaxed text-[#0f172a]/75">
                By automating repetitive workflows, your business could save{" "}
                <strong className="text-[#0a0a0a]">
                  {Math.round(aHours).toLocaleString()}+ hours/month
                </strong>{" "}
                and reduce operational overhead by{" "}
                <strong className="text-[#0a0a0a]">{Math.round(aWorkload)}%</strong>.
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={() =>
                window.open(
                  "https://calendly.com/aditya_das/triggerx-aditya-das-consultation",
                  "_blank"
                )
              }
              data-click-sound
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-white font-semibold text-sm transition-all hover:-translate-y-0.5"
              style={{
                background: "#0a0a0a",
                boxShadow: "0 10px 28px -8px rgba(15,23,42,0.4)",
              }}
            >
              Book a Call to Capture This ROI
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============== Sub-components ============== */

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#0f172a]/50 mb-2">
      {label}
    </label>
    {children}
  </div>
);

const Slider = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}) => {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="text-xs font-medium text-[#0f172a]/70">{label}</label>
        <span className="text-sm font-bold text-[#0a0a0a] tabular-nums">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roi-slider w-full h-1.5 rounded-full appearance-none cursor-pointer outline-none"
        style={{
          background: `linear-gradient(to right, #0a0a0a 0%, #0a0a0a ${pct}%, rgba(15,23,42,0.08) ${pct}%, rgba(15,23,42,0.08) 100%)`,
        }}
      />
      <style>{`
        .roi-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px; height: 18px;
          border-radius: 9999px;
          background: #ffffff;
          border: 2px solid #0a0a0a;
          box-shadow: 0 2px 8px rgba(15,23,42,0.18);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .roi-slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
        .roi-slider::-moz-range-thumb {
          width: 18px; height: 18px;
          border-radius: 9999px;
          background: #ffffff;
          border: 2px solid #0a0a0a;
          box-shadow: 0 2px 8px rgba(15,23,42,0.18);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

const NumberInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) => (
  <div>
    <label className="block text-xs font-medium text-[#0f172a]/70 mb-1.5">{label}</label>
    <input
      type="number"
      value={value || ""}
      onChange={(e) => onChange(Number(e.target.value) || 0)}
      className="w-full px-3.5 py-2.5 text-sm bg-white border border-black/5 rounded-xl outline-none focus:border-[#0a0a0a]/30 focus:ring-2 focus:ring-[#b9a6f3]/30 transition-all text-[#0a0a0a] tabular-nums"
    />
  </div>
);

const Stat = ({
  icon,
  tint,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  tint: string;
  label: string;
  value: string;
  sub?: string;
}) => (
  <div
    className="rounded-2xl p-3.5 bg-white/80 backdrop-blur-sm transition-all hover:-translate-y-0.5"
    style={{
      border: "1px solid rgba(15,23,42,0.05)",
      boxShadow: "0 4px 14px rgba(15,23,42,0.04)",
    }}
  >
    <div className="flex items-center justify-between mb-2">
      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#0f172a]/50">
        {label}
      </span>
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center"
        style={{
          background: `${tint}22`,
          color: "#0a0a0a",
        }}
      >
        {icon}
      </div>
    </div>
    <p className="text-lg sm:text-xl font-extrabold text-[#0a0a0a] tabular-nums leading-tight">
      {value}
    </p>
    {sub && <p className="text-[10px] text-[#0f172a]/45 mt-0.5">{sub}</p>}
  </div>
);

const Bar = ({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) => (
  <div>
    <div className="flex items-center justify-between mb-1.5">
      <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#0f172a]/70">
        {icon}
        {label}
      </div>
      <span className="text-xs font-bold text-[#0a0a0a] tabular-nums">{value}%</span>
    </div>
    <div className="h-1.5 rounded-full bg-black/[0.06] overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{
          width: `${value}%`,
          background: color,
          transition: "width 0.4s ease-out",
        }}
      />
    </div>
  </div>
);

export default ROICalculator;
