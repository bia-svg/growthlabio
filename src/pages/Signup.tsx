import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Loader2, Check, ChevronDown } from "lucide-react";

const languages = [
  { code: "pt", label: "Português (BR)", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

const Signup = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("pt") ? "pt" : "en";

  // Two modes: full form or google-extra (phone + language only)
  const [mode, setMode] = useState<"full" | "google-extra">("full");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [selectedLang, setSelectedLang] = useState(i18n.language?.startsWith("pt") ? "pt" : "en");
  const [langOpen, setLangOpen] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const touch = (f: string) => setTouched((p) => ({ ...p, [f]: true }));

  const handleSignup = () => {
    if (mode === "full") {
      if (!firstName.trim() || !email.trim() || !phone.trim() || !password.trim()) {
        setError(lang === "pt" ? "Preencha todos os campos." : "Please fill in all fields.");
        return;
      }
    } else {
      if (!phone.trim()) {
        setError(lang === "pt" ? "Preencha o telefone." : "Please fill in your phone number.");
        return;
      }
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      i18n.changeLanguage(selectedLang);
      const isFirstLogin = !localStorage.getItem("gl_onboarded");
      if (isFirstLogin) {
        navigate("/integrations");
      } else {
        navigate("/dashboard");
      }
    }, 1200);
  };

  const handleGoogle = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMode("google-extra");
      setFirstName("User");
      setEmail("user@gmail.com");
    }, 1000);
  };

  const selectedLangObj = languages.find((l) => l.code === selectedLang) || languages[0];

  return (
    <div className="flex h-screen w-full font-inter">
      {/* Left — Social proof */}
      <div className="hidden lg:flex w-[55%] bg-dash-sidebar border-r border-dash-border flex-col">
        <div className="px-7 pt-6">
          <a href="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-dash-text-primary no-underline">
            <div className="w-6 h-6 bg-black rounded-[5px] flex items-center justify-center">
              <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                <path d="M1 10L4.5 5.5L7 8L10 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="3" r="1.2" fill="white" />
              </svg>
            </div>
            GrowthLab
          </a>
        </div>

        <div className="flex-1 flex items-center justify-center px-12">
          <div className="max-w-[420px]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-6">
              {lang === "pt" ? "Por que o GrowthLab?" : "Why GrowthLab?"}
            </div>

            <div className="space-y-5">
              {[
                {
                  icon: "⚡",
                  title: lang === "pt" ? "Setup em minutos" : "Setup in minutes",
                  desc: lang === "pt" ? "Conecte suas fontes e tenha insights imediatos." : "Connect your sources and get instant insights.",
                },
                {
                  icon: "🤖",
                  title: lang === "pt" ? "IA que age por você" : "AI that acts for you",
                  desc: lang === "pt" ? "Recomendações semanais baseadas nos seus dados reais." : "Weekly recommendations based on your real data.",
                },
                {
                  icon: "📈",
                  title: lang === "pt" ? "Resultados comprovados" : "Proven results",
                  desc: lang === "pt" ? "Clientes têm em média 4.2× ROAS após 30 dias." : "Clients average 4.2× ROAS after 30 days.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <span className="text-[20px] mt-0.5">{item.icon}</span>
                  <div>
                    <h3 className="text-[14px] font-semibold text-dash-text-primary">{item.title}</h3>
                    <p className="text-[13px] text-dash-text-tertiary mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px bg-dash-border my-8" />

            <div className="flex gap-3">
              {[
                { value: lang === "pt" ? "14 dias grátis" : "14 days free", label: lang === "pt" ? "sem cartão" : "no credit card" },
                { value: "< 5 min", label: "setup" },
                { value: "24/7", label: lang === "pt" ? "suporte" : "support" },
              ].map((m) => (
                <div key={m.value} className="flex-1 border border-dash-border bg-background rounded-md px-3 py-3 text-center">
                  <div className="text-[15px] font-bold tracking-[-0.02em] text-dash-text-primary">{m.value}</div>
                  <div className="text-[11px] text-dash-text-tertiary mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-[360px]">
          {mode === "google-extra" ? (
            /* Google extra info step */
            <>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-[hsl(var(--dash-green-bg))] flex items-center justify-center">
                  <Check className="w-4 h-4 text-[hsl(var(--dash-green))]" />
                </div>
                <span className="text-[13px] text-[hsl(var(--dash-green))] font-medium">
                  {lang === "pt" ? "Google conectado" : "Google connected"}
                </span>
              </div>
              <h1 className="text-[24px] font-bold tracking-[-0.03em] text-dash-text-primary mb-1 mt-4">
                {lang === "pt" ? "Quase lá!" : "Almost there!"}
              </h1>
              <p className="text-[14px] text-dash-text-tertiary mb-8">
                {lang === "pt" ? "Precisamos de mais algumas informações." : "We need a few more details."}
              </p>

              {error && (
                <div className="bg-dash-red-bg border border-[hsl(5,40%,85%)] rounded-md px-3 py-2 text-[13px] text-dash-red mb-4">
                  {error}
                </div>
              )}

              {/* Phone */}
              <div className="mb-4">
                <label className="block text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-1.5">
                  {lang === "pt" ? "Telefone / WhatsApp" : "Phone / WhatsApp"}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={() => touch("phone")}
                  placeholder={lang === "pt" ? "(11) 9 0000-0000" : "+1 (555) 000-0000"}
                  className={`w-full bg-dash-sidebar border rounded-md px-3 py-2.5 text-[14px] text-dash-text-primary outline-none transition-colors placeholder:text-dash-text-tertiary ${
                    touched.phone && !phone.trim() ? "border-dash-red" : "border-dash-border focus:border-dash-text-primary"
                  }`}
                />
              </div>

              {/* Language */}
              <div className="mb-8">
                <label className="block text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-1.5">
                  {lang === "pt" ? "Idioma preferido" : "Preferred language"}
                </label>
                <div className="relative">
                  <button
                    onClick={() => setLangOpen(!langOpen)}
                    className="w-full bg-dash-sidebar border border-dash-border rounded-md px-3 py-2.5 text-[14px] text-dash-text-primary flex items-center justify-between hover:border-dash-text-tertiary transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span>{selectedLangObj.flag}</span>
                      <span>{selectedLangObj.label}</span>
                    </span>
                    <ChevronDown className="w-4 h-4 text-dash-text-tertiary" />
                  </button>
                  {langOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-dash-border rounded-md shadow-lg z-10 overflow-hidden">
                      {languages.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => { setSelectedLang(l.code); setLangOpen(false); }}
                          className={`w-full px-3 py-2.5 text-[14px] text-left flex items-center gap-2 hover:bg-dash-sidebar transition-colors ${
                            selectedLang === l.code ? "bg-dash-sidebar font-medium text-dash-text-primary" : "text-dash-text-secondary"
                          }`}
                        >
                          <span>{l.flag}</span>
                          <span>{l.label}</span>
                          {selectedLang === l.code && <Check className="w-3.5 h-3.5 ml-auto text-primary" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleSignup}
                disabled={loading}
                className="w-full h-10 bg-dash-text-primary text-white rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  lang === "pt" ? "Criar conta" : "Create account"
                )}
              </button>
            </>
          ) : (
            /* Full signup form */
            <>
              <h1 className="text-[24px] font-bold tracking-[-0.03em] text-dash-text-primary mb-1">
                {lang === "pt" ? "Crie sua conta" : "Create your account"}
              </h1>
              <p className="text-[14px] text-dash-text-tertiary mb-8">
                {lang === "pt" ? "14 dias grátis. Sem cartão de crédito." : "14 days free. No credit card required."}
              </p>

              {error && (
                <div className="bg-dash-red-bg border border-[hsl(5,40%,85%)] rounded-md px-3 py-2 text-[13px] text-dash-red mb-4">
                  {error}
                </div>
              )}

              {/* Google signup */}
              <button
                onClick={handleGoogle}
                disabled={loading}
                className="w-full h-10 border border-dash-border rounded-md text-[14px] font-medium text-dash-text-primary hover:bg-dash-sidebar transition-colors flex items-center justify-center gap-2 mb-5"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    {lang === "pt" ? "Cadastrar com Google" : "Sign up with Google"}
                  </>
                )}
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-dash-border" />
                <span className="text-[12px] text-dash-text-tertiary">{lang === "pt" ? "ou" : "or"}</span>
                <div className="flex-1 h-px bg-dash-border" />
              </div>

              {/* First name */}
              <div className="mb-4">
                <label className="block text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-1.5">
                  {lang === "pt" ? "Primeiro nome" : "First name"}
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onBlur={() => touch("firstName")}
                  placeholder={lang === "pt" ? "Seu nome" : "Your name"}
                  className={`w-full bg-dash-sidebar border rounded-md px-3 py-2.5 text-[14px] text-dash-text-primary outline-none transition-colors placeholder:text-dash-text-tertiary ${
                    touched.firstName && !firstName.trim() ? "border-dash-red" : "border-dash-border focus:border-dash-text-primary"
                  }`}
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-1.5">
                  {lang === "pt" ? "E-mail" : "Email"}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => touch("email")}
                  placeholder={lang === "pt" ? "voce@empresa.com" : "you@company.com"}
                  className={`w-full bg-dash-sidebar border rounded-md px-3 py-2.5 text-[14px] text-dash-text-primary outline-none transition-colors placeholder:text-dash-text-tertiary ${
                    touched.email && !email.trim() ? "border-dash-red" : "border-dash-border focus:border-dash-text-primary"
                  }`}
                />
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="block text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-1.5">
                  {lang === "pt" ? "Telefone / WhatsApp" : "Phone / WhatsApp"}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={() => touch("phone")}
                  placeholder={lang === "pt" ? "(11) 9 0000-0000" : "+1 (555) 000-0000"}
                  className={`w-full bg-dash-sidebar border rounded-md px-3 py-2.5 text-[14px] text-dash-text-primary outline-none transition-colors placeholder:text-dash-text-tertiary ${
                    touched.phone && !phone.trim() ? "border-dash-red" : "border-dash-border focus:border-dash-text-primary"
                  }`}
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-1.5">
                  {lang === "pt" ? "Senha" : "Password"}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => touch("password")}
                  placeholder="••••••••"
                  className={`w-full bg-dash-sidebar border rounded-md px-3 py-2.5 text-[14px] text-dash-text-primary outline-none transition-colors placeholder:text-dash-text-tertiary ${
                    touched.password && !password.trim() ? "border-dash-red" : "border-dash-border focus:border-dash-text-primary"
                  }`}
                />
                <p className="text-[11px] text-dash-text-tertiary mt-1.5">
                  {lang === "pt" ? "Mínimo 8 caracteres" : "Minimum 8 characters"}
                </p>
              </div>

              {/* Language */}
              <div className="mb-6">
                <label className="block text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-1.5">
                  {lang === "pt" ? "Idioma" : "Language"}
                </label>
                <div className="relative">
                  <button
                    onClick={() => setLangOpen(!langOpen)}
                    className="w-full bg-dash-sidebar border border-dash-border rounded-md px-3 py-2.5 text-[14px] text-dash-text-primary flex items-center justify-between hover:border-dash-text-tertiary transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span>{selectedLangObj.flag}</span>
                      <span>{selectedLangObj.label}</span>
                    </span>
                    <ChevronDown className="w-4 h-4 text-dash-text-tertiary" />
                  </button>
                  {langOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-dash-border rounded-md shadow-lg z-10 overflow-hidden">
                      {languages.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => { setSelectedLang(l.code); setLangOpen(false); }}
                          className={`w-full px-3 py-2.5 text-[14px] text-left flex items-center gap-2 hover:bg-dash-sidebar transition-colors ${
                            selectedLang === l.code ? "bg-dash-sidebar font-medium text-dash-text-primary" : "text-dash-text-secondary"
                          }`}
                        >
                          <span>{l.flag}</span>
                          <span>{l.label}</span>
                          {selectedLang === l.code && <Check className="w-3.5 h-3.5 ml-auto text-primary" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleSignup}
                disabled={loading}
                className="w-full h-10 bg-dash-text-primary text-white rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  lang === "pt" ? "Criar conta" : "Create account"
                )}
              </button>

              <p className="text-center text-[13px] text-dash-text-tertiary mt-6">
                {lang === "pt" ? "Já tem conta?" : "Already have an account?"}{" "}
                <button onClick={() => navigate("/login")} className="text-dash-blue hover:underline">
                  {lang === "pt" ? "Entrar" : "Sign in"}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
