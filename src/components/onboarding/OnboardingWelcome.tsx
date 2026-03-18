import { Sparkles, ArrowRight, MessageCircle } from "lucide-react";

interface Props {
  onStart: () => void;
  onAiHelp?: () => void;
}

const OnboardingWelcome = ({ onStart, onAiHelp }: Props) => (
  <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-6">
    <div className="max-w-[560px] text-center dash-page-enter">
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-8">
        <Sparkles className="w-6 h-6 text-primary-foreground" />
      </div>

      <h1 className="text-[36px] font-bold tracking-[-0.04em] text-[hsl(var(--dash-text-primary))] mb-4 leading-[1.15]">
        Configure sua operação<br />em poucos minutos
      </h1>

      <p className="text-[15px] text-[hsl(var(--dash-text-secondary))] mb-3 max-w-[440px] mx-auto leading-relaxed">
        Conecte suas fontes de dados, monte seu funil e veja como transformar mídia em receita com inteligência.
      </p>

      <p className="text-[13px] text-[hsl(var(--dash-text-tertiary))] mb-10 max-w-[400px] mx-auto">
        Vamos te guiar passo a passo para conectar suas contas e estruturar a visão do seu negócio.
      </p>

      <div className="flex flex-col items-center gap-3">
        <button
          onClick={onStart}
          className="h-[48px] px-8 bg-primary text-primary-foreground rounded-lg text-[14px] font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          Começar configuração
          <ArrowRight className="w-4 h-4" />
        </button>

        <button className="h-[40px] px-5 text-[13px] font-medium text-[hsl(var(--dash-text-secondary))] hover:text-[hsl(var(--dash-text-primary))] transition-colors flex items-center gap-2 rounded-lg hover:bg-[hsl(var(--dash-hover))]">
          <MessageCircle className="w-4 h-4" />
          Quero ajuda da IA
        </button>
      </div>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-6 mt-14 text-[12px] text-[hsl(var(--dash-text-tertiary))]">
        <span className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--dash-green))]" />
          Setup em ~5 min
        </span>
        <span className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--dash-green))]" />
          Sem código
        </span>
        <span className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--dash-green))]" />
          Dados seguros
        </span>
      </div>
    </div>
  </div>
);

export default OnboardingWelcome;
