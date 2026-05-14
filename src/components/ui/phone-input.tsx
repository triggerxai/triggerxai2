import * as React from "react";
import { useState, useRef, useEffect } from "react";

const COUNTRIES = [
  { code: "BD", dial: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "US", dial: "+1", flag: "🇺🇸", name: "United States" },
  { code: "GB", dial: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "IN", dial: "+91", flag: "🇮🇳", name: "India" },
  { code: "CA", dial: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "AU", dial: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "DE", dial: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "FR", dial: "+33", flag: "🇫🇷", name: "France" },
  { code: "AE", dial: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "SA", dial: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "MY", dial: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "SG", dial: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "PK", dial: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "NP", dial: "+977", flag: "🇳🇵", name: "Nepal" },
  { code: "LK", dial: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "JP", dial: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "KR", dial: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "CN", dial: "+86", flag: "🇨🇳", name: "China" },
  { code: "BR", dial: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "NG", dial: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "ZA", dial: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "EG", dial: "+20", flag: "🇪🇬", name: "Egypt" },
  { code: "TR", dial: "+90", flag: "🇹🇷", name: "Turkey" },
  { code: "IT", dial: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "ES", dial: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "NL", dial: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "SE", dial: "+46", flag: "🇸🇪", name: "Sweden" },
  { code: "PH", dial: "+63", flag: "🇵🇭", name: "Philippines" },
  { code: "ID", dial: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "TH", dial: "+66", flag: "🇹🇭", name: "Thailand" },
  { code: "VN", dial: "+84", flag: "🇻🇳", name: "Vietnam" },
  { code: "MX", dial: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "QA", dial: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "KW", dial: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "OM", dial: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "BH", dial: "+973", flag: "🇧🇭", name: "Bahrain" },
];

interface PhoneInputProps {
  value: string;
  onChange: (fullNumber: string) => void;
  required?: boolean;
  className?: string;
}

export default function PhoneInput({ value, onChange, required, className }: PhoneInputProps) {
  const [selected, setSelected] = useState(COUNTRIES[0]);
  const [localNumber, setLocalNumber] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Sync outward
  useEffect(() => {
    onChange(localNumber ? `${selected.dial} ${localNumber}` : "");
  }, [selected, localNumber]);

  // Parse incoming value on mount
  useEffect(() => {
    if (value && !localNumber) {
      const match = COUNTRIES.find((c) => value.startsWith(c.dial));
      if (match) {
        setSelected(match);
        setLocalNumber(value.slice(match.dial.length).trim());
      }
    }
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open && searchRef.current) searchRef.current.focus();
  }, [open]);

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`relative flex ${className || ""}`} ref={dropdownRef}>
      {/* Country selector */}
      <button
        type="button"
        onClick={() => { setOpen(!open); setSearch(""); }}
        className="flex items-center gap-1.5 px-3 py-2.5 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-sm hover:bg-gray-100 transition-colors shrink-0"
      >
        <span className="text-base leading-none">{selected.flag}</span>
        <span className="text-gray-600 text-xs font-medium">{selected.dial}</span>
        <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>

      {/* Phone input */}
      <input
        type="tel"
        required={required}
        value={localNumber}
        onChange={(e) => setLocalNumber(e.target.value.replace(/[^\d\s\-()]/g, ""))}
        placeholder="1XXX XXXXXX"
        className="w-full px-4 py-2.5 rounded-r-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 mt-1 w-72 max-h-60 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="p-2 border-b border-gray-100">
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <div className="overflow-y-auto max-h-44">
            {filtered.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => { setSelected(c); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-gray-50 transition-colors ${selected.code === c.code ? "bg-gray-100 font-medium" : ""}`}
              >
                <span className="text-base">{c.flag}</span>
                <span className="text-gray-900">{c.name}</span>
                <span className="text-gray-400 ml-auto text-xs">{c.dial}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-sm text-gray-400 py-4">No results</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
