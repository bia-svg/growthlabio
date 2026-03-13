import RevealUp from "./RevealUp";

const AgentSection = () => (
  <div className="max-w-[1040px] mx-auto px-7 mt-24">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-[72px] items-center">
      <RevealUp>
        <div className="inline-flex items-center gap-[5px] border border-border rounded-full px-3 py-1 text-xs font-medium text-gl-g400 mb-4">
          ✦ AI Agent
        </div>
        <h2 className="text-[clamp(30px,3.5vw,46px)] font-bold leading-[1.05] tracking-[-0.035em] text-foreground mb-3.5">
          Gerencie<br />conversando.
        </h2>
        <p className="text-[17px] font-light text-gl-g400 leading-[1.75] max-w-[520px] mb-6">
          Converse com um copiloto que lê seus dados em tempo real, propõe mudanças com justificativa e executa com a sua aprovação. Estratégia e operação no mesmo lugar.
        </p>
        <div className="flex flex-col gap-[11px]">
          {[
            "Pergunta \"por que meu ROAS caiu?\" — recebe análise com os dados reais da conta",
            "Pede para criar uma campanha nova — o agente conduz o processo com perguntas",
            "Aprova ou rejeita ações propostas. Nada executa sem sua confirmação",
            "Histórico salvo — o agente aprende o contexto da conta ao longo do tempo",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2.5 text-sm font-light text-gl-g500 leading-relaxed">
              <span className="text-gl-g200 shrink-0 mt-0.5 text-xs">↗</span>
              {item}
            </div>
          ))}
        </div>
      </RevealUp>

      <RevealUp>
        <div className="bg-background border border-border rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,.05),0_1px_3px_rgba(0,0,0,.03)]">
          <div className="flex items-center gap-2.5 px-4 py-3.5 bg-gl-off border-b border-border">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-[11px] font-bold text-primary-foreground">GL</div>
            <div>
              <div className="text-[13px] font-semibold text-foreground">GrowthLab AI</div>
              <div className="text-[11px] text-gl-green">● Online — Velaris / Plano Anual</div>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-2.5">
            <div className="p-2.5 px-3 rounded-lg bg-primary text-primary-foreground text-[13px] leading-relaxed self-end max-w-[88%]">
              O ROAS caiu essa semana. O que está acontecendo?
            </div>
            <div className="p-2.5 px-3 rounded-lg bg-gl-off border border-border text-[13px] leading-relaxed text-gl-g700 self-start max-w-[88%]">
              Analisando os últimos 7 dias...
              <div className="font-mono text-[10.5px] text-gl-g400 bg-background border border-border rounded-[5px] p-2 mt-[7px] leading-[1.7]">
                Spend: R$12.400 (+18% WoW)<br />
                Leads: 89 (-22% WoW)<br />
                CPL: R$139 (+52% WoW) ⚠<br />
                Ad Set principal → freq 4.8, CTR -31%
              </div>
              <span className="block mt-2">Criativo saturado. Redireciono o budget para o Lookalike 1% que está com ROAS 2.1× esta semana?</span>
            </div>
            <div className="bg-gl-green-bg border border-gl-green/20 rounded-lg p-3 text-[13px] self-start max-w-[90%]">
              <div className="text-[9.5px] font-bold tracking-widest uppercase text-gl-green mb-1">Proposta de ação</div>
              <div className="text-gl-g700 mb-2.5 text-[12.5px] leading-relaxed">
                1. Pausar Ad Set principal → libera R$320/dia<br />
                2. Lookalike 1%: R$400 → R$720/dia
              </div>
              <div className="flex gap-[5px]">
                <button className="text-xs font-semibold bg-primary text-primary-foreground border-none rounded-[5px] px-3 py-1.5">Executar</button>
                <button className="text-xs bg-background text-gl-g400 border border-border rounded-[5px] px-3 py-1.5">Cancelar</button>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 border-t border-border flex gap-[7px] items-center">
            <div className="flex-1 bg-gl-off border border-border rounded-[7px] px-3 py-2 text-[12.5px] text-gl-g300">
              Pergunte sobre sua conta...
            </div>
            <button className="w-8 h-8 bg-primary text-primary-foreground border-none rounded-[7px] text-[13px] flex items-center justify-center">↑</button>
          </div>
        </div>
      </RevealUp>
    </div>
  </div>
);

export default AgentSection;
