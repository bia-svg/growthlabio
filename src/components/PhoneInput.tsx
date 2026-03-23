import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

interface Country {
  name: string;
  code: string;
  dial: string;
  flag: string;
  maxDigits: number;
}

const countries: Country[] = [
  { name: "Brazil", code: "BR", dial: "+55", flag: "🇧🇷", maxDigits: 11 },
  { name: "United States", code: "US", dial: "+1", flag: "🇺🇸", maxDigits: 10 },
  { name: "United Kingdom", code: "GB", dial: "+44", flag: "🇬🇧", maxDigits: 10 },
  { name: "Portugal", code: "PT", dial: "+351", flag: "🇵🇹", maxDigits: 9 },
  { name: "Spain", code: "ES", dial: "+34", flag: "🇪🇸", maxDigits: 9 },
  { name: "France", code: "FR", dial: "+33", flag: "🇫🇷", maxDigits: 9 },
  { name: "Germany", code: "DE", dial: "+49", flag: "🇩🇪", maxDigits: 11 },
  { name: "Italy", code: "IT", dial: "+39", flag: "🇮🇹", maxDigits: 10 },
  { name: "Canada", code: "CA", dial: "+1", flag: "🇨🇦", maxDigits: 10 },
  { name: "Mexico", code: "MX", dial: "+52", flag: "🇲🇽", maxDigits: 10 },
  { name: "Argentina", code: "AR", dial: "+54", flag: "🇦🇷", maxDigits: 10 },
  { name: "Chile", code: "CL", dial: "+56", flag: "🇨🇱", maxDigits: 9 },
  { name: "Colombia", code: "CO", dial: "+57", flag: "🇨🇴", maxDigits: 10 },
  { name: "Peru", code: "PE", dial: "+51", flag: "🇵🇪", maxDigits: 9 },
  { name: "Uruguay", code: "UY", dial: "+598", flag: "🇺🇾", maxDigits: 8 },
  { name: "Paraguay", code: "PY", dial: "+595", flag: "🇵🇾", maxDigits: 9 },
  { name: "Bolivia", code: "BO", dial: "+591", flag: "🇧🇴", maxDigits: 8 },
  { name: "Ecuador", code: "EC", dial: "+593", flag: "🇪🇨", maxDigits: 9 },
  { name: "Venezuela", code: "VE", dial: "+58", flag: "🇻🇪", maxDigits: 10 },
  { name: "Costa Rica", code: "CR", dial: "+506", flag: "🇨🇷", maxDigits: 8 },
  { name: "Panama", code: "PA", dial: "+507", flag: "🇵🇦", maxDigits: 8 },
  { name: "Dominican Republic", code: "DO", dial: "+1", flag: "🇩🇴", maxDigits: 10 },
  { name: "Guatemala", code: "GT", dial: "+502", flag: "🇬🇹", maxDigits: 8 },
  { name: "Honduras", code: "HN", dial: "+504", flag: "🇭🇳", maxDigits: 8 },
  { name: "El Salvador", code: "SV", dial: "+503", flag: "🇸🇻", maxDigits: 8 },
  { name: "Nicaragua", code: "NI", dial: "+505", flag: "🇳🇮", maxDigits: 8 },
  { name: "Cuba", code: "CU", dial: "+53", flag: "🇨🇺", maxDigits: 8 },
  { name: "Puerto Rico", code: "PR", dial: "+1", flag: "🇵🇷", maxDigits: 10 },
  { name: "Jamaica", code: "JM", dial: "+1", flag: "🇯🇲", maxDigits: 10 },
  { name: "Trinidad and Tobago", code: "TT", dial: "+1", flag: "🇹🇹", maxDigits: 10 },
  { name: "Australia", code: "AU", dial: "+61", flag: "🇦🇺", maxDigits: 9 },
  { name: "New Zealand", code: "NZ", dial: "+64", flag: "🇳🇿", maxDigits: 9 },
  { name: "Japan", code: "JP", dial: "+81", flag: "🇯🇵", maxDigits: 10 },
  { name: "South Korea", code: "KR", dial: "+82", flag: "🇰🇷", maxDigits: 10 },
  { name: "China", code: "CN", dial: "+86", flag: "🇨🇳", maxDigits: 11 },
  { name: "India", code: "IN", dial: "+91", flag: "🇮🇳", maxDigits: 10 },
  { name: "Indonesia", code: "ID", dial: "+62", flag: "🇮🇩", maxDigits: 11 },
  { name: "Thailand", code: "TH", dial: "+66", flag: "🇹🇭", maxDigits: 9 },
  { name: "Vietnam", code: "VN", dial: "+84", flag: "🇻🇳", maxDigits: 10 },
  { name: "Philippines", code: "PH", dial: "+63", flag: "🇵🇭", maxDigits: 10 },
  { name: "Malaysia", code: "MY", dial: "+60", flag: "🇲🇾", maxDigits: 10 },
  { name: "Singapore", code: "SG", dial: "+65", flag: "🇸🇬", maxDigits: 8 },
  { name: "Taiwan", code: "TW", dial: "+886", flag: "🇹🇼", maxDigits: 9 },
  { name: "Hong Kong", code: "HK", dial: "+852", flag: "🇭🇰", maxDigits: 8 },
  { name: "Pakistan", code: "PK", dial: "+92", flag: "🇵🇰", maxDigits: 10 },
  { name: "Bangladesh", code: "BD", dial: "+880", flag: "🇧🇩", maxDigits: 10 },
  { name: "Sri Lanka", code: "LK", dial: "+94", flag: "🇱🇰", maxDigits: 9 },
  { name: "Nepal", code: "NP", dial: "+977", flag: "🇳🇵", maxDigits: 10 },
  { name: "Myanmar", code: "MM", dial: "+95", flag: "🇲🇲", maxDigits: 9 },
  { name: "Cambodia", code: "KH", dial: "+855", flag: "🇰🇭", maxDigits: 9 },
  { name: "Laos", code: "LA", dial: "+856", flag: "🇱🇦", maxDigits: 10 },
  { name: "Russia", code: "RU", dial: "+7", flag: "🇷🇺", maxDigits: 10 },
  { name: "Turkey", code: "TR", dial: "+90", flag: "🇹🇷", maxDigits: 10 },
  { name: "Saudi Arabia", code: "SA", dial: "+966", flag: "🇸🇦", maxDigits: 9 },
  { name: "United Arab Emirates", code: "AE", dial: "+971", flag: "🇦🇪", maxDigits: 9 },
  { name: "Israel", code: "IL", dial: "+972", flag: "🇮🇱", maxDigits: 9 },
  { name: "Egypt", code: "EG", dial: "+20", flag: "🇪🇬", maxDigits: 10 },
  { name: "South Africa", code: "ZA", dial: "+27", flag: "🇿🇦", maxDigits: 9 },
  { name: "Nigeria", code: "NG", dial: "+234", flag: "🇳🇬", maxDigits: 10 },
  { name: "Kenya", code: "KE", dial: "+254", flag: "🇰🇪", maxDigits: 9 },
  { name: "Ghana", code: "GH", dial: "+233", flag: "🇬🇭", maxDigits: 9 },
  { name: "Morocco", code: "MA", dial: "+212", flag: "🇲🇦", maxDigits: 9 },
  { name: "Tunisia", code: "TN", dial: "+216", flag: "🇹🇳", maxDigits: 8 },
  { name: "Algeria", code: "DZ", dial: "+213", flag: "🇩🇿", maxDigits: 9 },
  { name: "Ethiopia", code: "ET", dial: "+251", flag: "🇪🇹", maxDigits: 9 },
  { name: "Tanzania", code: "TZ", dial: "+255", flag: "🇹🇿", maxDigits: 9 },
  { name: "Uganda", code: "UG", dial: "+256", flag: "🇺🇬", maxDigits: 9 },
  { name: "Angola", code: "AO", dial: "+244", flag: "🇦🇴", maxDigits: 9 },
  { name: "Mozambique", code: "MZ", dial: "+258", flag: "🇲🇿", maxDigits: 9 },
  { name: "Netherlands", code: "NL", dial: "+31", flag: "🇳🇱", maxDigits: 9 },
  { name: "Belgium", code: "BE", dial: "+32", flag: "🇧🇪", maxDigits: 9 },
  { name: "Switzerland", code: "CH", dial: "+41", flag: "🇨🇭", maxDigits: 9 },
  { name: "Austria", code: "AT", dial: "+43", flag: "🇦🇹", maxDigits: 11 },
  { name: "Sweden", code: "SE", dial: "+46", flag: "🇸🇪", maxDigits: 10 },
  { name: "Norway", code: "NO", dial: "+47", flag: "🇳🇴", maxDigits: 8 },
  { name: "Denmark", code: "DK", dial: "+45", flag: "🇩🇰", maxDigits: 8 },
  { name: "Finland", code: "FI", dial: "+358", flag: "🇫🇮", maxDigits: 10 },
  { name: "Poland", code: "PL", dial: "+48", flag: "🇵🇱", maxDigits: 9 },
  { name: "Czech Republic", code: "CZ", dial: "+420", flag: "🇨🇿", maxDigits: 9 },
  { name: "Romania", code: "RO", dial: "+40", flag: "🇷🇴", maxDigits: 9 },
  { name: "Hungary", code: "HU", dial: "+36", flag: "🇭🇺", maxDigits: 9 },
  { name: "Greece", code: "GR", dial: "+30", flag: "🇬🇷", maxDigits: 10 },
  { name: "Ireland", code: "IE", dial: "+353", flag: "🇮🇪", maxDigits: 9 },
  { name: "Iceland", code: "IS", dial: "+354", flag: "🇮🇸", maxDigits: 7 },
  { name: "Ukraine", code: "UA", dial: "+380", flag: "🇺🇦", maxDigits: 9 },
  { name: "Croatia", code: "HR", dial: "+385", flag: "🇭🇷", maxDigits: 9 },
  { name: "Serbia", code: "RS", dial: "+381", flag: "🇷🇸", maxDigits: 9 },
  { name: "Bulgaria", code: "BG", dial: "+359", flag: "🇧🇬", maxDigits: 9 },
  { name: "Slovakia", code: "SK", dial: "+421", flag: "🇸🇰", maxDigits: 9 },
  { name: "Slovenia", code: "SI", dial: "+386", flag: "🇸🇮", maxDigits: 8 },
  { name: "Lithuania", code: "LT", dial: "+370", flag: "🇱🇹", maxDigits: 8 },
  { name: "Latvia", code: "LV", dial: "+371", flag: "🇱🇻", maxDigits: 8 },
  { name: "Estonia", code: "EE", dial: "+372", flag: "🇪🇪", maxDigits: 8 },
  { name: "Luxembourg", code: "LU", dial: "+352", flag: "🇱🇺", maxDigits: 9 },
  { name: "Malta", code: "MT", dial: "+356", flag: "🇲🇹", maxDigits: 8 },
  { name: "Cyprus", code: "CY", dial: "+357", flag: "🇨🇾", maxDigits: 8 },
  { name: "Qatar", code: "QA", dial: "+974", flag: "🇶🇦", maxDigits: 8 },
  { name: "Kuwait", code: "KW", dial: "+965", flag: "🇰🇼", maxDigits: 8 },
  { name: "Bahrain", code: "BH", dial: "+973", flag: "🇧🇭", maxDigits: 8 },
  { name: "Oman", code: "OM", dial: "+968", flag: "🇴🇲", maxDigits: 8 },
  { name: "Jordan", code: "JO", dial: "+962", flag: "🇯🇴", maxDigits: 9 },
  { name: "Lebanon", code: "LB", dial: "+961", flag: "🇱🇧", maxDigits: 8 },
  { name: "Iraq", code: "IQ", dial: "+964", flag: "🇮🇶", maxDigits: 10 },
  { name: "Iran", code: "IR", dial: "+98", flag: "🇮🇷", maxDigits: 10 },
  { name: "Afghanistan", code: "AF", dial: "+93", flag: "🇦🇫", maxDigits: 9 },
  { name: "Uzbekistan", code: "UZ", dial: "+998", flag: "🇺🇿", maxDigits: 9 },
  { name: "Kazakhstan", code: "KZ", dial: "+7", flag: "🇰🇿", maxDigits: 10 },
  { name: "Georgia", code: "GE", dial: "+995", flag: "🇬🇪", maxDigits: 9 },
  { name: "Armenia", code: "AM", dial: "+374", flag: "🇦🇲", maxDigits: 8 },
  { name: "Azerbaijan", code: "AZ", dial: "+994", flag: "🇦🇿", maxDigits: 9 },
  { name: "Mongolia", code: "MN", dial: "+976", flag: "🇲🇳", maxDigits: 8 },
  { name: "Fiji", code: "FJ", dial: "+679", flag: "🇫🇯", maxDigits: 7 },
  { name: "Papua New Guinea", code: "PG", dial: "+675", flag: "🇵🇬", maxDigits: 8 },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  hasError?: boolean;
  defaultCountry?: string;
  variant?: "landing" | "dashboard";
}

const PhoneInput = ({
  value,
  onChange,
  onBlur,
  placeholder,
  hasError = false,
  defaultCountry = "BR",
  variant = "dashboard",
}: PhoneInputProps) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    () => countries.find((c) => c.code === defaultCountry) || countries[0]
  );
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open && searchRef.current) searchRef.current.focus();
  }, [open]);

  const filtered = search
    ? countries.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.dial.includes(search) ||
          c.code.toLowerCase().includes(search.toLowerCase())
      )
    : countries;

  const handleSelect = (country: Country) => {
    const oldDial = selectedCountry.dial;
    setSelectedCountry(country);
    setOpen(false);
    setSearch("");
    // Replace old dial code with new one
    if (value.startsWith(oldDial)) {
      onChange(country.dial + " " + value.slice(oldDial.length).trimStart());
    } else if (!value || value === oldDial + " ") {
      onChange(country.dial + " ");
    }
  };

  // Set initial dial code if empty
  useEffect(() => {
    if (!value) {
      onChange(selectedCountry.dial + " ");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLanding = variant === "landing";

  const inputClasses = isLanding
    ? `flex-1 bg-gl-off border-0 border-none rounded-r-lg px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-gl-g200`
    : `flex-1 bg-transparent border-0 border-none px-3 py-2.5 text-[14px] text-dash-text-primary outline-none transition-colors placeholder:text-dash-text-tertiary`;

  const containerClasses = isLanding
    ? `flex items-center bg-gl-off border rounded-lg transition-colors ${hasError ? "border-destructive" : "border-border focus-within:border-foreground focus-within:bg-background"}`
    : `flex items-center bg-dash-sidebar border rounded-md transition-colors ${hasError ? "border-dash-red" : "border-dash-border focus-within:border-dash-text-primary"}`;

  return (
    <div ref={containerRef} className="relative">
      <div className={containerClasses}>
        {/* Country selector button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-1 pl-3 pr-1 py-2.5 shrink-0 ${
            isLanding ? "text-foreground" : "text-dash-text-primary"
          }`}
        >
          <span className="text-[16px] leading-none">{selectedCountry.flag}</span>
          <span className="text-[13px] font-medium">{selectedCountry.dial}</span>
          <ChevronDown className="w-3.5 h-3.5 text-dash-text-tertiary" />
        </button>

        <div className={`w-px h-5 ${isLanding ? "bg-border" : "bg-dash-border"}`} />

        {/* Phone number input */}
        <input
          type="tel"
          value={value.startsWith(selectedCountry.dial) ? value.slice(selectedCountry.dial.length).trimStart() : value}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "");
            if (digits.length <= selectedCountry.maxDigits) {
              onChange(selectedCountry.dial + " " + e.target.value);
            }
          }}
          onBlur={onBlur}
          maxLength={selectedCountry.maxDigits + 3}
          placeholder={placeholder || "000 000 0000"}
          className={inputClasses}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-dash-border rounded-md shadow-lg z-50 overflow-hidden max-h-[280px] flex flex-col">
          {/* Search */}
          <div className="p-2 border-b border-dash-border">
            <div className="flex items-center gap-2 px-2 py-1.5 bg-dash-sidebar rounded">
              <Search className="w-3.5 h-3.5 text-dash-text-tertiary shrink-0" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country..."
                className="flex-1 bg-transparent text-[13px] text-dash-text-primary outline-none placeholder:text-dash-text-tertiary"
              />
            </div>
          </div>
          {/* List */}
          <div className="overflow-y-auto flex-1">
            {filtered.length === 0 && (
              <div className="px-3 py-4 text-[13px] text-dash-text-tertiary text-center">No results</div>
            )}
            {filtered.map((c) => (
              <button
                key={c.code}
                onClick={() => handleSelect(c)}
                className={`w-full px-3 py-2 text-[13px] text-left flex items-center gap-2.5 hover:bg-dash-sidebar transition-colors ${
                  selectedCountry.code === c.code
                    ? "bg-dash-sidebar font-medium text-dash-text-primary"
                    : "text-dash-text-secondary"
                }`}
              >
                <span className="text-[15px]">{c.flag}</span>
                <span className="flex-1 truncate">{c.name}</span>
                <span className="text-dash-text-tertiary text-[12px]">{c.dial}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;
