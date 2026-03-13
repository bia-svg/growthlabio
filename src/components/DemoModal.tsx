import { useState } from "react";

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
}

const DemoModal = ({ open, onClose }: DemoModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert("Preencha nome, e-mail e WhatsApp.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setEmail("");
        setPhone("");
      }, 400);
    }, 3500);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/25 backdrop-blur-lg"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-background border border-border rounded-xl p-10 max-w-[380px] w-full relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 text-gl-g300 hover:text-foreground text-base leading-none p-1"
        >
          ✕
        </button>

        {!submitted ? (
          <div>
            <p className="text-[11px] font-semibold tracking-widest uppercase text-gl-g300 mb-2">
              Acesso antecipado
            </p>
            <h2 className="text-[26px] font-bold tracking-tight text-foreground mb-1">
              Agendar demo
            </h2>
            <p className="text-sm font-light text-gl-g400 mb-6 leading-relaxed">
              30 minutos. Dados reais. Retorno em até 24h.
            </p>
            <div className="mb-3">
              <label className="block text-xs font-medium text-gl-g500 mb-1">Nome</label>
              <input
                className="w-full bg-gl-off border border-border rounded-lg px-3 py-2.5 text-sm text-foreground outline-none focus:border-foreground focus:bg-background transition-colors placeholder:text-gl-g200"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
              />
            </div>
            <div className="mb-3">
              <label className="block text-xs font-medium text-gl-g500 mb-1">E-mail</label>
              <input
                className="w-full bg-gl-off border border-border rounded-lg px-3 py-2.5 text-sm text-foreground outline-none focus:border-foreground focus:bg-background transition-colors placeholder:text-gl-g200"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@empresa.com.br"
              />
            </div>
            <div className="mb-3">
              <label className="block text-xs font-medium text-gl-g500 mb-1">WhatsApp</label>
              <input
                className="w-full bg-gl-off border border-border rounded-lg px-3 py-2.5 text-sm text-foreground outline-none focus:border-foreground focus:bg-background transition-colors placeholder:text-gl-g200"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 9 0000-0000"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full mt-1 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-gl-g700 transition-colors"
            >
              Quero uma demo →
            </button>
            <p className="text-[11.5px] text-gl-g300 text-center mt-2.5">
              Sem compromisso. Sem spam.
            </p>
          </div>
        ) : (
          <div className="text-center py-3">
            <div className="text-4xl mb-3">✓</div>
            <h3 className="text-[22px] font-bold tracking-tight text-foreground mb-2">
              Recebemos!
            </h3>
            <p className="text-sm font-light text-gl-g400 leading-relaxed">
              Nosso time vai entrar em contato via WhatsApp em até 24h para confirmar o horário da sua demo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoModal;
