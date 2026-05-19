import { useEffect, useMemo, useRef, useState } from "react";
import {
  X,
  Calculator,
  ArrowRight,
  Phone,
  Workflow,
  Bot,
  Target,
  Sparkles,
  Clock,
  TrendingUp,
  PiggyBank,
  Activity,
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
  { code: "AUD", symbol: "A$" },
  { code: "CAD", symbol: "C$" },
];

type ServiceId = "voice" | "workflow" | "chatbot" | "leadgen";

const services: { id: ServiceId; title: string; icon: typeof Phone }[] = [
  { id: "voice", title: "Voice Agent", icon: Phone },
  { id: "workflow", title: "Workflow Automation", icon: Workflow },
  { id: "chatbot", title: "AI Chatbot", icon: Bot },
  { id: "leadgen", title: "Lead Qualification", icon: Target },
];

/** Animated number hook */
const useAnimatedNumber = (value: number, duration = 500) => {
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
      setDisplay(fromRef.current + (target - fromRef.current) * eased);
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
  const [currency, setCurrency] = useState("USD");
  const [service, setService] = useState<ServiceId>("voice");
  const [monthlyFee, setMonthlyFee] = useState(2000);

  // Voice Agent
  const [v_leads, setVLeads] = useState(500);
  const [v_deal, setVDeal] = useState(1500);
  const [v_afterPct, setVAfterPct] = useState(40);
  const [v_hourCost, setVHourCost] = useState(25);
  const [v_weekHours, setVWeekHours] = useState(20);

  // Workflow
  const [w_hoursWeek, setWHoursWeek] = useState(15);
  const [w_staff, setWStaff] = useState(3);
  const [w_hourCost, setWHourCost] = useState(30);
  const [w_errorCost, setWErrorCost] = useState(2000);

  // Chatbot
  const [c_visitors, setCVisitors] = useState(8000);
  const [c_convRate, setCConvRate] = useState(3);
  const [c_tickets, setCTickets] = useState(400);
  const [c_supportCost, setCSupportCost] = useState(20);
  const [c_hoursPerTicket, setCHoursPerTicket] = useState(0.5);
  const [c_deal, setCDeal] = useState(800);
  const [c_close, setCClose] = useState(20);

  // Lead Qualification
  const [l_leads, setLLeads] = useState(300);
  const [l_manualHours, setLManualHours] = useState(40);
  const [l_salesCost, setLSalesCost] = useState(35);
  const [l_close, setLClose] = useState(15);
  const [l_deal, setLDeal] = useState(2500);

  const sym = currencies.find((c) => c.code === currency)?.symbol || "$";

  // ===== Calculations =====
  const result = useMemo(() => {
    let monthlyValue = 0;
    let hoursSaved = 0;

    if (service === "voice") {
      const lost = v_leads * (v_afterPct / 100) * 0.35;
      const revenue = lost * v_deal * 0.15;
      const hSaved = v_weekHours * 4 * 0.8;
      const staffSaved = hSaved * v_hourCost;
      monthlyValue = revenue + staffSaved;
      hoursSaved = hSaved;
    } else if (service === "workflow") {
      const hWeek = w_hoursWeek * 0.5;
      const labour = hWeek * 4 * w_hourCost * w_staff;
      const errSaved = w_errorCost * 0.85;
      monthlyValue = labour + errSaved;
      hoursSaved = hWeek * 4 * w_staff;
    } else if (service === "chatbot") {
      const addLeads = c_visitors * 0.35 * (c_convRate / 100);
      const revLeads = addLeads * c_deal * (c_close / 100);
      const ticketsAuto = c_tickets * 0.6;
      const supportHours = ticketsAuto * c_hoursPerTicket;
      const supportSaved = supportHours * c_supportCost;
      monthlyValue = revLeads + supportSaved;
      hoursSaved = supportHours;
    } else {
      const hSaved = l_manualHours * 0.7;
      const labour = hSaved * l_salesCost;
      const newClose = l_close * 1.3;
      const addDeals = l_leads * ((newClose - l_close) / 100);
      const revAdd = addDeals * l_deal;
      monthlyValue = labour + revAdd;
      hoursSaved = hSaved * 4;
    }

    const annualValue = monthlyValue * 12;
    const roiMultiple = monthlyFee > 0 ? monthlyValue / monthlyFee : 0;
    const paybackWeeks =
      monthlyValue > 0 ? (monthlyFee / monthlyValue) * 4.33 : 0;

    return { monthlyValue, annualValue, hoursSaved, roiMultiple, paybackWeeks };
  }, [
    service, monthlyFee,
    v_leads, v_deal, v_afterPct, v_hourCost, v_weekHours,
    w_hoursWeek, w_staff, w_hourCost, w_errorCost,
    c_visitors, c_convRate, c_tickets, c_supportCost, c_hoursPerTicket, c_deal, c_close,
    l_leads, l_manualHours, l_salesCost, l_close, l_deal,
  ]);

  const aMonthly = useAnimatedNumber(result.monthlyValue);
  const aAnnual = useAnimatedNumber(result.annualValue);
  const aHours = useAnimatedNumber(result.hoursSaved);
  const aROI = useAnimatedNumber(result.roiMultiple);
  const aPayback = useAnimatedNumber(result.paybackWeeks);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-5xl max-h-[96vh] overflow-hidden rounded-2xl animate-fade-in flex flex-col"
        style={{
          animationDuration: "0.25s",
          background: "linear-gradient(180deg, #fbfaf6 0%, #f6f4ee 100%)",
          boxShadow:
            "0 30px 80px -20px rgba(15,23,42,0.35), 0 8px 24px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.7)",
          border: "1px solid rgba(15,23,42,0.06)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-black/5 shrink-0">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(185,166,243,0.25), rgba(190,242,100,0.25))",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              <Calculator className="w-4.5 h-4.5 text-[#0f172a]" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-[#0a0a0a] tracking-tight">
                ROI Intelligence Dashboard
              </h2>
              <p className="text-[10px] sm:text-[11px] text-[#0f172a]/50">
                Real numbers. Real value. Built for your business.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white border border-black/5 flex items-center justify-center hover:bg-[#f5f5f7] transition-colors"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5 text-[#0f172a]" />
          </button>
        </div>

        {/* Service tabs */}
        <div className="px-4 sm:px-6 pt-3 pb-2 shrink-0">
          <div className="grid grid-cols-4 gap-1.5">
            {services.map((s) => {
              const Icon = s.icon;
              const active = service === s.id;
              return (
                <button
                  key={s.id}
                  data-click-sound
                  onClick={() => setService(s.id)}
                  className={`flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-[11px] sm:text-xs font-medium transition-all ${
                    active
                      ? "bg-[#0a0a0a] text-white shadow-md"
                      : "bg-white text-[#0f172a]/75 border border-black/5 hover:border-black/15"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] flex-1 min-h-0">
          {/* LEFT — INPUTS */}
          <div className="p-4 sm:p-5 space-y-3 border-b lg:border-b-0 lg:border-r border-black/5 overflow-y-auto">
            {/* Currency + Monthly Fee */}
            <div className="grid grid-cols-[1fr_auto] gap-2 items-end">
              <NumberInput
                label={`Our monthly fee (${sym})`}
                value={monthlyFee}
                onChange={setMonthlyFee}
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="px-2.5 py-2 text-xs bg-white border border-black/10 rounded-lg outline-none focus:border-[#0a0a0a]/40 font-medium text-[#0a0a0a]"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.symbol} {c.code}
                  </option>
                ))}
              </select>
            </div>

            {service === "voice" && (
              <>
                <Slider label="Monthly inbound leads / calls" value={v_leads} onChange={setVLeads} min={50} max={5000} step={50} format={(v) => v.toLocaleString()} />
                <div className="grid grid-cols-2 gap-2.5">
                  <NumberInput label={`Avg deal value (${sym})`} value={v_deal} onChange={setVDeal} />
                  <NumberInput label={`Staff hourly cost (${sym})`} value={v_hourCost} onChange={setVHourCost} />
                </div>
                <Slider label="% leads coming after hours" value={v_afterPct} onChange={setVAfterPct} min={0} max={100} step={5} format={(v) => `${v}%`} />
                <Slider label="Staff hours on calls per week" value={v_weekHours} onChange={setVWeekHours} min={1} max={80} step={1} format={(v) => `${v} hrs`} />
              </>
            )}

            {service === "workflow" && (
              <>
                <Slider label="Manual task hours per week" value={w_hoursWeek} onChange={setWHoursWeek} min={1} max={100} step={1} format={(v) => `${v} hrs`} />
                <div className="grid grid-cols-2 gap-2.5">
                  <NumberInput label="Staff doing manual work" value={w_staff} onChange={setWStaff} />
                  <NumberInput label={`Hourly staff cost (${sym})`} value={w_hourCost} onChange={setWHourCost} />
                </div>
                <NumberInput label={`Monthly cost of errors & rework (${sym})`} value={w_errorCost} onChange={setWErrorCost} />
              </>
            )}

            {service === "chatbot" && (
              <>
                <Slider label="Monthly website visitors" value={c_visitors} onChange={setCVisitors} min={500} max={100000} step={500} format={(v) => v.toLocaleString()} />
                <div className="grid grid-cols-2 gap-2.5">
                  <NumberInput label="Current conv. rate (%)" value={c_convRate} onChange={setCConvRate} />
                  <NumberInput label="Close rate (%)" value={c_close} onChange={setCClose} />
                </div>
                <Slider label="Monthly support tickets" value={c_tickets} onChange={setCTickets} min={10} max={5000} step={10} format={(v) => v.toLocaleString()} />
                <div className="grid grid-cols-3 gap-2.5">
                  <NumberInput label={`Support /hr (${sym})`} value={c_supportCost} onChange={setCSupportCost} />
                  <NumberInput label="Hrs / ticket" value={c_hoursPerTicket} onChange={setCHoursPerTicket} />
                  <NumberInput label={`Deal (${sym})`} value={c_deal} onChange={setCDeal} />
                </div>
              </>
            )}

            {service === "leadgen" && (
              <>
                <Slider label="Monthly leads generated" value={l_leads} onChange={setLLeads} min={20} max={5000} step={10} format={(v) => v.toLocaleString()} />
                <Slider label="Manual qualification hours / mo" value={l_manualHours} onChange={setLManualHours} min={1} max={200} step={1} format={(v) => `${v} hrs`} />
                <div className="grid grid-cols-3 gap-2.5">
                  <NumberInput label={`Sales /hr (${sym})`} value={l_salesCost} onChange={setLSalesCost} />
                  <NumberInput label="Close rate (%)" value={l_close} onChange={setLClose} />
                  <NumberInput label={`Deal (${sym})`} value={l_deal} onChange={setLDeal} />
                </div>
              </>
            )}
          </div>

          {/* RIGHT — RESULTS */}
          <div className="p-4 sm:p-5 space-y-3 bg-gradient-to-br from-[#fbfaf6] via-[#f7f4ec] to-[#f3eee2] overflow-y-auto">
            {/* Hero — Monthly Value */}
            <div
              className="relative rounded-2xl p-4 sm:p-5 overflow-hidden text-center"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #faf8f3 100%)",
                border: "1px solid rgba(15,23,42,0.05)",
                boxShadow:
                  "0 12px 32px -8px rgba(185,166,243,0.20), 0 2px 8px rgba(15,23,42,0.04)",
              }}
            >
              <div
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-50 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(185,166,243,0.45) 0%, transparent 70%)",
                }}
              />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 border border-black/5 mb-2">
                  <Sparkles className="w-3 h-3 text-[#0f172a]/60" />
                  <span className="text-[10px] font-semibold tracking-wider text-[#0f172a]/60 uppercase">
                    Monthly Value Generated
                  </span>
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#0a0a0a] tabular-nums leading-none">
                  {sym} {Math.round(aMonthly).toLocaleString()}
                </p>
                <p className="mt-1.5 text-[11px] text-[#0f172a]/55">
                  Annual:{" "}
                  <strong className="text-[#0a0a0a]">
                    {sym} {Math.round(aAnnual).toLocaleString()}
                  </strong>
                </p>
              </div>
            </div>

            {/* Stat grid */}
            <div className="grid grid-cols-3 gap-2">
              <Stat
                icon={<TrendingUp className="w-3.5 h-3.5" />}
                tint="#a78bfa"
                label="ROI Multiple"
                value={`${aROI.toFixed(1)}x`}
              />
              <Stat
                icon={<Clock className="w-3.5 h-3.5" />}
                tint="#b9a6f3"
                label="Hours / mo"
                value={`${Math.round(aHours).toLocaleString()}`}
              />
              <Stat
                icon={<PiggyBank className="w-3.5 h-3.5" />}
                tint="#bef264"
                label="Payback"
                value={`${aPayback < 0.5 ? "<1" : Math.round(aPayback)} wks`}
              />
            </div>

            {/* Benchmark */}
            <div
              className="rounded-xl p-3 flex gap-2.5"
              style={{
                background:
                  "linear-gradient(135deg, rgba(185,166,243,0.12), rgba(190,242,100,0.12))",
                border: "1px solid rgba(185,166,243,0.25)",
              }}
            >
              <div
                className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #b9a6f3, #bef264)",
                  color: "#0a0a0a",
                }}
              >
                <Activity className="w-3.5 h-3.5" />
              </div>
              <p className="text-[11px] sm:text-xs leading-relaxed text-[#0f172a]/75">
                Businesses using AI automation see{" "}
                <strong className="text-[#0a0a0a]">$3.70 returned per $1 invested</strong> on
                average. Your estimated return is{" "}
                <strong className="text-[#0a0a0a]">{aROI.toFixed(1)}x</strong>.
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
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:-translate-y-0.5"
              style={{
                background: "#0a0a0a",
                boxShadow: "0 10px 28px -8px rgba(15,23,42,0.4)",
              }}
            >
              Book a Free 30-min Audit
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============== Sub-components ============== */

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
      <div className="flex items-baseline justify-between mb-1">
        <label className="text-[11px] font-medium text-[#0f172a]/70">{label}</label>
        <span className="text-xs font-bold text-[#0a0a0a] tabular-nums">{format(value)}</span>
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
          width: 16px; height: 16px;
          border-radius: 9999px;
          background: #ffffff;
          border: 2px solid #0a0a0a;
          box-shadow: 0 2px 8px rgba(15,23,42,0.18);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .roi-slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
        .roi-slider::-moz-range-thumb {
          width: 16px; height: 16px;
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
    <label className="block text-[11px] font-medium text-[#0f172a]/70 mb-1">{label}</label>
    <input
      type="number"
      value={value || ""}
      onChange={(e) => onChange(Number(e.target.value) || 0)}
      className="w-full px-2.5 py-2 text-xs bg-white border border-black/10 rounded-lg outline-none focus:border-[#0a0a0a]/40 focus:ring-2 focus:ring-[#b9a6f3]/30 transition-all text-[#0a0a0a] tabular-nums font-semibold"
    />
  </div>
);

const Stat = ({
  icon,
  tint,
  label,
  value,
}: {
  icon: React.ReactNode;
  tint: string;
  label: string;
  value: string;
}) => (
  <div
    className="rounded-xl p-2.5 bg-white/80 backdrop-blur-sm transition-all hover:-translate-y-0.5"
    style={{
      border: "1px solid rgba(15,23,42,0.05)",
      boxShadow: "0 4px 14px rgba(15,23,42,0.04)",
    }}
  >
    <div className="flex items-center justify-between mb-1.5">
      <span className="text-[9px] uppercase tracking-wider font-semibold text-[#0f172a]/50">
        {label}
      </span>
      <div
        className="w-6 h-6 rounded-md flex items-center justify-center"
        style={{
          background: `${tint}22`,
          color: "#0a0a0a",
        }}
      >
        {icon}
      </div>
    </div>
    <p className="text-base sm:text-lg font-extrabold text-[#0a0a0a] tabular-nums leading-tight">
      {value}
    </p>
  </div>
);

export default ROICalculator;
