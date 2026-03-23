import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

interface Country {
  name: string;
  code: string;
  dial: string;
  flag: string;
}

const countries: Country[] = [
  { name: "Brazil", code: "BR", dial: "+55", flag: "🇧🇷" },
  { name: "United States", code: "US", dial: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", dial: "+44", flag: "🇬🇧" },
  { name: "Portugal", code: "PT", dial: "+351", flag: "🇵🇹" },
  { name: "Spain", code: "ES", dial: "+34", flag: "🇪🇸" },
  { name: "France", code: "FR", dial: "+33", flag: "🇫🇷" },
  { name: "Germany", code: "DE", dial: "+49", flag: "🇩🇪" },
  { name: "Italy", code: "IT", dial: "+39", flag: "🇮🇹" },
  { name: "Canada", code: "CA", dial: "+1", flag: "🇨🇦" },
  { name: "Mexico", code: "MX", dial: "+52", flag: "🇲🇽" },
  { name: "Argentina", code: "AR", dial: "+54", flag: "🇦🇷" },
  { name: "Chile", code: "CL", dial: "+56", flag: "🇨🇱" },
  { name: "Colombia", code: "CO", dial: "+57", flag: "🇨🇴" },
  { name: "Peru", code: "PE", dial: "+51", flag: "🇵🇪" },
  { name: "Uruguay", code: "UY", dial: "+598", flag: "🇺🇾" },
  { name: "Paraguay", code: "PY", dial: "+595", flag: "🇵🇾" },
  { name: "Bolivia", code: "BO", dial: "+591", flag: "🇧🇴" },
  { name: "Ecuador", code: "EC", dial: "+593", flag: "🇪🇨" },
  { name: "Venezuela", code: "VE", dial: "+58", flag: "🇻🇪" },
  { name: "Costa Rica", code: "CR", dial: "+506", flag: "🇨🇷" },
  { name: "Panama", code: "PA", dial: "+507", flag: "🇵🇦" },
  { name: "Dominican Republic", code: "DO", dial: "+1", flag: "🇩🇴" },
  { name: "Guatemala", code: "GT", dial: "+502", flag: "🇬🇹" },
  { name: "Honduras", code: "HN", dial: "+504", flag: "🇭🇳" },
  { name: "El Salvador", code: "SV", dial: "+503", flag: "🇸🇻" },
  { name: "Nicaragua", code: "NI", dial: "+505", flag: "🇳🇮" },
  { name: "Cuba", code: "CU", dial: "+53", flag: "🇨🇺" },
  { name: "Puerto Rico", code: "PR", dial: "+1", flag: "🇵🇷" },
  { name: "Jamaica", code: "JM", dial: "+1", flag: "🇯🇲" },
  { name: "Trinidad and Tobago", code: "TT", dial: "+1", flag: "🇹🇹" },
  { name: "Australia", code: "AU", dial: "+61", flag: "🇦🇺" },
  { name: "New Zealand", code: "NZ", dial: "+64", flag: "🇳🇿" },
  { name: "Japan", code: "JP", dial: "+81", flag: "🇯🇵" },
  { name: "South Korea", code: "KR", dial: "+82", flag: "🇰🇷" },
  { name: "China", code: "CN", dial: "+86", flag: "🇨🇳" },
  { name: "India", code: "IN", dial: "+91", flag: "🇮🇳" },
  { name: "Indonesia", code: "ID", dial: "+62", flag: "🇮🇩" },
  { name: "Thailand", code: "TH", dial: "+66", flag: "🇹🇭" },
  { name: "Vietnam", code: "VN", dial: "+84", flag: "🇻🇳" },
  { name: "Philippines", code: "PH", dial: "+63", flag: "🇵🇭" },
  { name: "Malaysia", code: "MY", dial: "+60", flag: "🇲🇾" },
  { name: "Singapore", code: "SG", dial: "+65", flag: "🇸🇬" },
  { name: "Taiwan", code: "TW", dial: "+886", flag: "🇹🇼" },
  { name: "Hong Kong", code: "HK", dial: "+852", flag: "🇭🇰" },
  { name: "Pakistan", code: "PK", dial: "+92", flag: "🇵🇰" },
  { name: "Bangladesh", code: "BD", dial: "+880", flag: "🇧🇩" },
  { name: "Sri Lanka", code: "LK", dial: "+94", flag: "🇱🇰" },
  { name: "Nepal", code: "NP", dial: "+977", flag: "🇳🇵" },
  { name: "Myanmar", code: "MM", dial: "+95", flag: "🇲🇲" },
  { name: "Cambodia", code: "KH", dial: "+855", flag: "🇰🇭" },
  { name: "Laos", code: "LA", dial: "+856", flag: "🇱🇦" },
  { name: "Russia", code: "RU", dial: "+7", flag: "🇷🇺" },
  { name: "Turkey", code: "TR", dial: "+90", flag: "🇹🇷" },
  { name: "Saudi Arabia", code: "SA", dial: "+966", flag: "🇸🇦" },
  { name: "United Arab Emirates", code: "AE", dial: "+971", flag: "🇦🇪" },
  { name: "Israel", code: "IL", dial: "+972", flag: "🇮🇱" },
  { name: "Egypt", code: "EG", dial: "+20", flag: "🇪🇬" },
  { name: "South Africa", code: "ZA", dial: "+27", flag: "🇿🇦" },
  { name: "Nigeria", code: "NG", dial: "+234", flag: "🇳🇬" },
  { name: "Kenya", code: "KE", dial: "+254", flag: "🇰🇪" },
  { name: "Ghana", code: "GH", dial: "+233", flag: "🇬🇭" },
  { name: "Morocco", code: "MA", dial: "+212", flag: "🇲🇦" },
  { name: "Tunisia", code: "TN", dial: "+216", flag: "🇹🇳" },
  { name: "Algeria", code: "DZ", dial: "+213", flag: "🇩🇿" },
  { name: "Ethiopia", code: "ET", dial: "+251", flag: "🇪🇹" },
  { name: "Tanzania", code: "TZ", dial: "+255", flag: "🇹🇿" },
  { name: "Uganda", code: "UG", dial: "+256", flag: "🇺🇬" },
  { name: "Angola", code: "AO", dial: "+244", flag: "🇦🇴" },
  { name: "Mozambique", code: "MZ", dial: "+258", flag: "🇲🇿" },
  { name: "Netherlands", code: "NL", dial: "+31", flag: "🇳🇱" },
  { name: "Belgium", code: "BE", dial: "+32", flag: "🇧🇪" },
  { name: "Switzerland", code: "CH", dial: "+41", flag: "🇨🇭" },
  { name: "Austria", code: "AT", dial: "+43", flag: "🇦🇹" },
  { name: "Sweden", code: "SE", dial: "+46", flag: "🇸🇪" },
  { name: "Norway", code: "NO", dial: "+47", flag: "🇳🇴" },
  { name: "Denmark", code: "DK", dial: "+45", flag: "🇩🇰" },
  { name: "Finland", code: "FI", dial: "+358", flag: "🇫🇮" },
  { name: "Poland", code: "PL", dial: "+48", flag: "🇵🇱" },
  { name: "Czech Republic", code: "CZ", dial: "+420", flag: "🇨🇿" },
  { name: "Romania", code: "RO", dial: "+40", flag: "🇷🇴" },
  { name: "Hungary", code: "HU", dial: "+36", flag: "🇭🇺" },
  { name: "Greece", code: "GR", dial: "+30", flag: "🇬🇷" },
  { name: "Ireland", code: "IE", dial: "+353", flag: "🇮🇪" },
  { name: "Iceland", code: "IS", dial: "+354", flag: "🇮🇸" },
  { name: "Ukraine", code: "UA", dial: "+380", flag: "🇺🇦" },
  { name: "Croatia", code: "HR", dial: "+385", flag: "🇭🇷" },
  { name: "Serbia", code: "RS", dial: "+381", flag: "🇷🇸" },
  { name: "Bulgaria", code: "BG", dial: "+359", flag: "🇧🇬" },
  { name: "Slovakia", code: "SK", dial: "+421", flag: "🇸🇰" },
  { name: "Slovenia", code: "SI", dial: "+386", flag: "🇸🇮" },
  { name: "Lithuania", code: "LT", dial: "+370", flag: "🇱🇹" },
  { name: "Latvia", code: "LV", dial: "+371", flag: "🇱🇻" },
  { name: "Estonia", code: "EE", dial: "+372", flag: "🇪🇪" },
  { name: "Luxembourg", code: "LU", dial: "+352", flag: "🇱🇺" },
  { name: "Malta", code: "MT", dial: "+356", flag: "🇲🇹" },
  { name: "Cyprus", code: "CY", dial: "+357", flag: "🇨🇾" },
  { name: "Qatar", code: "QA", dial: "+974", flag: "🇶🇦" },
  { name: "Kuwait", code: "KW", dial: "+965", flag: "🇰🇼" },
  { name: "Bahrain", code: "BH", dial: "+973", flag: "🇧🇭" },
  { name: "Oman", code: "OM", dial: "+968", flag: "🇴🇲" },
  { name: "Jordan", code: "JO", dial: "+962", flag: "🇯🇴" },
  { name: "Lebanon", code: "LB", dial: "+961", flag: "🇱🇧" },
  { name: "Iraq", code: "IQ", dial: "+964", flag: "🇮🇶" },
  { name: "Iran", code: "IR", dial: "+98", flag: "🇮🇷" },
  { name: "Afghanistan", code: "AF", dial: "+93", flag: "🇦🇫" },
  { name: "Uzbekistan", code: "UZ", dial: "+998", flag: "🇺🇿" },
  { name: "Kazakhstan", code: "KZ", dial: "+7", flag: "🇰🇿" },
  { name: "Georgia", code: "GE", dial: "+995", flag: "🇬🇪" },
  { name: "Armenia", code: "AM", dial: "+374", flag: "🇦🇲" },
  { name: "Azerbaijan", code: "AZ", dial: "+994", flag: "🇦🇿" },
  { name: "Mongolia", code: "MN", dial: "+976", flag: "🇲🇳" },
  { name: "Fiji", code: "FJ", dial: "+679", flag: "🇫🇯" },
  { name: "Papua New Guinea", code: "PG", dial: "+675", flag: "🇵🇬" },
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
          onChange={(e) => onChange(selectedCountry.dial + " " + e.target.value)}
          onBlur={onBlur}
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
