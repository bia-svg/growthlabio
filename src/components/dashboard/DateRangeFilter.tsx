import { useState, useRef, useEffect } from "react";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { format, subDays, startOfMonth, endOfMonth, subMonths, startOfWeek, endOfWeek, startOfYear } from "date-fns";
import { pt, enUS } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

const presets = [
  { id: "today", getDates: () => ({ from: new Date(), to: new Date() }) },
  { id: "yesterday", getDates: () => ({ from: subDays(new Date(), 1), to: subDays(new Date(), 1) }) },
  { id: "last7", getDates: () => ({ from: subDays(new Date(), 6), to: new Date() }) },
  { id: "last14", getDates: () => ({ from: subDays(new Date(), 13), to: new Date() }) },
  { id: "last30", getDates: () => ({ from: subDays(new Date(), 29), to: new Date() }) },
  { id: "last60", getDates: () => ({ from: subDays(new Date(), 59), to: new Date() }) },
  { id: "last90", getDates: () => ({ from: subDays(new Date(), 89), to: new Date() }) },
  { id: "thisWeek", getDates: () => ({ from: startOfWeek(new Date(), { weekStartsOn: 1 }), to: new Date() }) },
  { id: "lastWeek", getDates: () => {
    const start = startOfWeek(subDays(new Date(), 7), { weekStartsOn: 1 });
    return { from: start, to: endOfWeek(start, { weekStartsOn: 1 }) };
  }},
  { id: "thisMonth", getDates: () => ({ from: startOfMonth(new Date()), to: new Date() }) },
  { id: "lastMonth", getDates: () => {
    const m = subMonths(new Date(), 1);
    return { from: startOfMonth(m), to: endOfMonth(m) };
  }},
  { id: "thisYear", getDates: () => ({ from: startOfYear(new Date()), to: new Date() }) },
  { id: "custom", getDates: () => ({ from: subDays(new Date(), 29), to: new Date() }) },
] as const;

const presetLabels: Record<string, { en: string; pt: string }> = {
  today:     { en: "Today",         pt: "Hoje" },
  yesterday: { en: "Yesterday",     pt: "Ontem" },
  last7:     { en: "Last 7 days",   pt: "Últimos 7 dias" },
  last14:    { en: "Last 14 days",  pt: "Últimos 14 dias" },
  last30:    { en: "Last 30 days",  pt: "Últimos 30 dias" },
  last60:    { en: "Last 60 days",  pt: "Últimos 60 dias" },
  last90:    { en: "Last 90 days",  pt: "Últimos 90 dias" },
  thisWeek:  { en: "This week",     pt: "Esta semana" },
  lastWeek:  { en: "Last week",     pt: "Semana passada" },
  thisMonth: { en: "This month",    pt: "Este mês" },
  lastMonth: { en: "Last month",    pt: "Mês passado" },
  thisYear:  { en: "This year",     pt: "Este ano" },
  custom:    { en: "Custom range",  pt: "Personalizado" },
};

interface DateRangeFilterProps {
  onChange?: (range: { from: Date; to: Date }, presetId: string) => void;
}

const DateRangeFilter = ({ onChange }: DateRangeFilterProps) => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("pt") ? "pt" : "en";
  const locale = lang === "pt" ? pt : enUS;

  const [open, setOpen] = useState(false);
  const [activePreset, setActivePreset] = useState("last30");
  const [range, setRange] = useState<DateRange | undefined>(() => presets.find(p => p.id === "last30")!.getDates());

  const selectPreset = (id: string) => {
    const preset = presets.find(p => p.id === id)!;
    const dates = preset.getDates();
    setActivePreset(id);
    setRange(dates);
    if (id !== "custom") {
      onChange?.(dates as { from: Date; to: Date }, id);
      setOpen(false);
    }
  };

  const handleCalendarSelect = (newRange: DateRange | undefined) => {
    setRange(newRange);
    setActivePreset("custom");
    if (newRange?.from && newRange?.to) {
      onChange?.({ from: newRange.from, to: newRange.to }, "custom");
    }
  };

  const displayLabel = () => {
    if (activePreset !== "custom") {
      return presetLabels[activePreset]?.[lang] || presetLabels[activePreset]?.en;
    }
    if (range?.from && range?.to) {
      return `${format(range.from, "dd MMM", { locale })} – ${format(range.to, "dd MMM yyyy", { locale })}`;
    }
    return presetLabels.custom[lang];
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1.5 text-[12px] text-[hsl(var(--dash-text-secondary))] border border-[hsl(var(--dash-border))] rounded-md px-2.5 py-1 hover:bg-[hsl(var(--dash-hover))] transition-colors">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span className="font-medium">{displayLabel()}</span>
          <ChevronDown className="w-3 h-3 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end" sideOffset={6}>
        <div className="flex">
          {/* Presets sidebar */}
          <div className="w-[160px] border-r border-[hsl(var(--border))] py-2">
            {presets.filter(p => p.id !== "custom").map(preset => (
              <button
                key={preset.id}
                onClick={() => selectPreset(preset.id)}
                className={cn(
                  "w-full text-left px-3 py-1.5 text-[12px] transition-colors",
                  activePreset === preset.id
                    ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] font-medium"
                    : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]"
                )}
              >
                {presetLabels[preset.id][lang]}
              </button>
            ))}
            <div className="border-t border-[hsl(var(--border))] my-1" />
            <button
              onClick={() => setActivePreset("custom")}
              className={cn(
                "w-full text-left px-3 py-1.5 text-[12px] transition-colors",
                activePreset === "custom"
                  ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] font-medium"
                  : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]"
              )}
            >
              {presetLabels.custom[lang]}
            </button>
          </div>

          {/* Calendar */}
          <div className="p-3">
            <Calendar
              mode="range"
              selected={range}
              onSelect={handleCalendarSelect}
              numberOfMonths={2}
              disabled={(date) => date > new Date()}
              locale={locale}
              className={cn("pointer-events-auto")}
            />
            {range?.from && range?.to && (
              <div className="text-[11px] text-[hsl(var(--muted-foreground))] text-center pt-1 border-t border-[hsl(var(--border))]">
                {format(range.from, "dd MMM yyyy", { locale })} – {format(range.to, "dd MMM yyyy", { locale })}
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangeFilter;
