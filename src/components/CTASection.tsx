import RevealUp from "./RevealUp";

interface CTASectionProps {
  onOpenModal: () => void;
}

const CTASection = ({ onOpenModal }: CTASectionProps) => (
  <RevealUp className="py-24 border-t border-border text-center">
    <div className="max-w-[1040px] mx-auto px-7">
      <h2 className="text-[clamp(32px,4vw,56px)] font-bold leading-[1.05] tracking-[-0.035em] text-foreground max-w-[600px] mx-auto mb-3.5">
        Pronto para operar<br />em outro nível?
      </h2>
      <p className="text-[17px] font-light text-gl-g400 max-w-[420px] mx-auto mb-8 leading-[1.7]">
        30 minutos de demo com dados reais. Sem slides, sem pitch.
      </p>
      <div className="flex items-center justify-center gap-2.5">
        <button onClick={onOpenModal} className="text-[15px] font-medium text-primary-foreground bg-primary rounded-lg px-6 py-3 hover:bg-gl-g700 transition-colors">
          Agendar demo
        </button>
        <a href="#pricing" className="text-[15px] font-medium text-gl-g500 border border-border rounded-lg px-6 py-3 hover:bg-gl-g50 hover:border-gl-g200 hover:text-foreground transition-all no-underline">
          Ver preços
        </a>
      </div>
    </div>
  </RevealUp>
);

export default CTASection;
