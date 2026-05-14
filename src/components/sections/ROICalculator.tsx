import { useState } from "react";
import { X, Calculator, ArrowRight, ArrowLeft, Bot, Phone, DollarSign, BarChart3, Zap, TrendingUp, PiggyBank, Percent } from "lucide-react";

interface ROICalculatorProps {
  open: boolean;
  onClose: () => void;
}

const currencies = [
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "GBP", symbol: "£", label: "British Pound" },
  { code: "INR", symbol: "₹", label: "Indian Rupee" },
  { code: "BDT", symbol: "৳", label: "Bangladeshi Taka" },
  { code: "AUD", symbol: "A$", label: "Australian Dollar" },
  { code: "CAD", symbol: "C$", label: "Canadian Dollar" },
  { code: "SGD", symbol: "S$", label: "Singapore Dollar" },
];

const automationTypes = [
  {
    id: "chatbot",
    title: "AI Chatbot",
    icon: Bot,
    features: ["Website / WhatsApp / Messenger", "Lead capture & support", "24/7 instant responses"],
  },
  {
    id: "voice",
    title: "AI Voice Agent",
    icon: Phone,
    features: ["AI calling automation", "Appointment booking", "Customer support calls"],
  },
];

const defaultAssumptions = {
  chatbot: {
    responseTime: "Instant",
    leadRecovery: 30,
    conversionIncrease: 15,
  },
  voice: {
    callsHandled: "24/7",
    missedCallRecovery: 40,
    bookingRateIncrease: 20,
  },
};

const ROICalculator = ({ open, onClose }: ROICalculatorProps) => {
  const [step, setStep] = useState(1);
  const [currency, setCurrency] = useState("");
  const [automationType, setAutomationType] = useState<"chatbot" | "voice" | "">("");

  // Step 3 inputs
  const [monthlyInquiries, setMonthlyInquiries] = useState("");
  const [avgResponseTime, setAvgResponseTime] = useState("");
  const [conversionRate, setConversionRate] = useState("");
  const [avgOrderValue, setAvgOrderValue] = useState("");
  const [missedLeads, setMissedLeads] = useState("");
  const [employeeCost, setEmployeeCost] = useState("");

  // Step 4 assumptions (editable)
  const [leadRecovery, setLeadRecovery] = useState("30");
  const [conversionIncrease, setConversionIncrease] = useState("15");
  const [missedCallRecovery, setMissedCallRecovery] = useState("40");
  const [bookingRateIncrease, setBookingRateIncrease] = useState("20");

  const selectedCurrency = currencies.find((c) => c.code === currency);
  const sym = selectedCurrency?.symbol || "$";

  // Calculations
  const inquiries = Number(monthlyInquiries) || 0;
  const orderVal = Number(avgOrderValue) || 0;
  const missed = Number(missedLeads) || 0;
  const empCost = Number(employeeCost) || 0;
  const convRate = Number(conversionRate) || 0;

  const recoveryRate = automationType === "voice" ? Number(missedCallRecovery) : Number(leadRecovery);
  const convIncrease = automationType === "voice" ? Number(bookingRateIncrease) : Number(conversionIncrease);

  const recoveredLeads = Math.round(missed * (recoveryRate / 100));
  const additionalConversions = Math.round(recoveredLeads * ((convRate + convIncrease) / 100));
  const monthlyRevenue = additionalConversions * orderVal;
  const costSavings = Math.round(empCost * 0.4);
  const annualGain = (monthlyRevenue + costSavings) * 12;
  const roiPercent = empCost > 0 ? Math.round(((monthlyRevenue + costSavings) / empCost) * 100) : 0;

  const canProceed = () => {
    if (step === 1) return currency !== "";
    if (step === 2) return automationType !== "";
    if (step === 3) return monthlyInquiries && avgOrderValue && missedLeads;
    return true;
  };

  const handleNext = () => {
    if (step === 2 && automationType) {
      if (automationType === "chatbot") {
        setLeadRecovery(String(defaultAssumptions.chatbot.leadRecovery));
        setConversionIncrease(String(defaultAssumptions.chatbot.conversionIncrease));
      } else {
        setMissedCallRecovery(String(defaultAssumptions.voice.missedCallRecovery));
        setBookingRateIncrease(String(defaultAssumptions.voice.bookingRateIncrease));
      }
    }
    setStep((s) => Math.min(s + 1, 5));
  };

  const handleReset = () => {
    setStep(1);
    setCurrency("");
    setAutomationType("");
    setMonthlyInquiries("");
    setAvgResponseTime("");
    setConversionRate("");
    setAvgOrderValue("");
    setMissedLeads("");
    setEmployeeCost("");
  };

  if (!open) return null;

  const stepTitles = ["Select Currency", "Automation Type", "Business Metrics", "Impact Assumptions", "Your ROI Results"];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative bg-white rounded-2xl shadow-2xl shadow-black/10 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto animate-fade-in"
        style={{ animationDuration: "0.25s" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-gray-800" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">ROI Calculator</h2>
              <p className="text-xs text-gray-500">Step {step} of 5 — {stepTitles[step - 1]}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div className="h-full bg-gray-900 transition-all duration-500" style={{ width: `${(step / 5) * 100}%` }} />
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {/* Step 1 — Currency */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700 mb-4">Which currency would you like to calculate ROI in?</p>
              <div className="grid grid-cols-2 gap-2">
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm transition-all ${
                      currency === c.code
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-lg font-semibold">{c.symbol}</span>
                    <span>{c.code}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Automation Type */}
          {step === 2 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700 mb-4">What type of AI automation are you calculating ROI for?</p>
              <div className="grid grid-cols-1 gap-3">
                {automationTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setAutomationType(type.id as "chatbot" | "voice")}
                      className={`flex items-start gap-4 px-5 py-4 rounded-xl border text-left transition-all ${
                        automationType === type.id
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        automationType === type.id ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{type.title}</p>
                        <ul className="mt-1 space-y-0.5">
                          {type.features.map((f, i) => (
                            <li key={i} className="text-xs text-gray-500">• {f}</li>
                          ))}
                        </ul>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3 — Business Metrics */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Enter your current business metrics</p>
              <InputField label="Monthly customer inquiries" value={monthlyInquiries} onChange={setMonthlyInquiries} placeholder="e.g. 2000" />
              <InputField label="Average response time (minutes)" value={avgResponseTime} onChange={setAvgResponseTime} placeholder="e.g. 30" />
              <InputField label="Lead-to-customer conversion rate (%)" value={conversionRate} onChange={setConversionRate} placeholder="e.g. 10" />
              <InputField label={`Average order value (${sym})`} value={avgOrderValue} onChange={setAvgOrderValue} placeholder="e.g. 5000" />
              <InputField label="Missed leads per month" value={missedLeads} onChange={setMissedLeads} placeholder="e.g. 120" />
              <InputField label={`Employee cost — monthly (${sym})`} value={employeeCost} onChange={setEmployeeCost} placeholder="e.g. 3000" />
            </div>
          )}

          {/* Step 4 — Assumptions */}
          {step === 4 && (
            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Automation impact assumptions <span className="text-gray-400">(editable)</span></p>
              {automationType === "chatbot" ? (
                <>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Response time after automation</p>
                    <p className="text-sm font-semibold text-gray-900">⚡ Instant</p>
                  </div>
                  <InputField label="Lead recovery increase (%)" value={leadRecovery} onChange={setLeadRecovery} placeholder="30" />
                  <InputField label="Conversion rate increase (%)" value={conversionIncrease} onChange={setConversionIncrease} placeholder="15" />
                </>
              ) : (
                <>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Calls handled after automation</p>
                    <p className="text-sm font-semibold text-gray-900">📞 24/7 Coverage</p>
                  </div>
                  <InputField label="Missed call recovery (%)" value={missedCallRecovery} onChange={setMissedCallRecovery} placeholder="40" />
                  <InputField label="Booking rate increase (%)" value={bookingRateIncrease} onChange={setBookingRateIncrease} placeholder="20" />
                </>
              )}
            </div>
          )}

          {/* Step 5 — Results */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-5 space-y-1">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Monthly Revenue Recovered</p>
                <p className="text-3xl font-bold text-gray-900">{sym} {monthlyRevenue.toLocaleString()}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <ResultCard icon={<TrendingUp className="w-4 h-4" />} label="Additional Conversions" value={`+${additionalConversions}/mo`} />
                <ResultCard icon={<PiggyBank className="w-4 h-4" />} label="Cost Savings" value={`${sym} ${costSavings.toLocaleString()}/mo`} />
                <ResultCard icon={<BarChart3 className="w-4 h-4" />} label="Annual Revenue Gain" value={`${sym} ${annualGain.toLocaleString()}`} />
                <ResultCard icon={<Percent className="w-4 h-4" />} label="Automation ROI" value={`${roiPercent}%`} />
              </div>

              <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-500 space-y-1">
                <p><strong>Type:</strong> {automationType === "chatbot" ? "AI Chatbot" : "AI Voice Agent"}</p>
                <p><strong>{automationType === "chatbot" ? "Lead Recovery" : "Missed Call Recovery"}:</strong> +{automationType === "chatbot" ? leadRecovery : missedCallRecovery}%</p>
                <p><strong>Recovered Leads:</strong> {recoveredLeads}/mo</p>
              </div>

              <button
                onClick={() => window.open("https://calendly.com/aditya_das/triggerx-aditya-das-consultation", "_blank")}
                className="w-full bg-gray-900 text-white font-medium text-sm py-3 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                Recover This Revenue With Automation
                <ArrowRight className="w-4 h-4" />
              </button>

              <button onClick={handleReset} className="w-full text-gray-500 text-sm py-2 hover:text-gray-700 transition-colors">
                Start Over
              </button>
            </div>
          )}
        </div>

        {/* Footer nav (steps 1-4) */}
        {step < 5 && (
          <div className="px-6 pb-5 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button onClick={() => setStep((s) => s - 1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {step === 4 ? "Calculate" : "Next"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const InputField = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900"
    />
  </div>
);

const ResultCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="bg-gray-50 rounded-xl p-4 space-y-2">
    <div className="w-8 h-8 rounded-lg bg-gray-200/60 flex items-center justify-center text-gray-600">{icon}</div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-base font-bold text-gray-900">{value}</p>
  </div>
);

export default ROICalculator;
