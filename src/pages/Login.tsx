import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const handleSignIn = () => {
    if (!email.trim() || !password.trim()) {
      setError(t("login.fillAll"));
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const isFirstLogin = !localStorage.getItem("gl_onboarded");
      if (isFirstLogin) {
        navigate("/integrations");
      } else {
        navigate("/app");
      }
    }, 1200);
  };

  const handleGoogle = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const isFirstLogin = !localStorage.getItem("gl_onboarded");
      if (isFirstLogin) {
        navigate("/integrations");
      } else {
        navigate("/app");
      }
    }, 1000);
  };

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
              {t("login.socialProof.label")}
            </div>
            <blockquote className="text-[20px] font-semibold leading-[1.4] tracking-[-0.02em] text-dash-text-primary mb-4">
              {t("login.socialProof.quote")}
            </blockquote>
            <p className="text-[13px] text-dash-text-tertiary mb-8">
              {t("login.socialProof.author")}
            </p>

            <div className="h-px bg-dash-border mb-8" />

            <div className="flex gap-3">
              {[
                { value: "4.2× ROAS", label: "avg. client result" },
                { value: "↓ 34%", label: "avg. CPL reduction" },
                { value: "< 6h", label: "time to first insight" },
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
          <h1 className="text-[24px] font-bold tracking-[-0.03em] text-dash-text-primary mb-1">{t("login.title")}</h1>
          <p className="text-[14px] text-dash-text-tertiary mb-8">{t("login.subtitle")}</p>

          {error && (
            <div className="bg-dash-red-bg border border-[hsl(5,40%,85%)] rounded-md px-3 py-2 text-[13px] text-dash-red mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-1.5">
              {t("login.email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              placeholder={t("login.emailPlaceholder")}
              className={`w-full bg-dash-sidebar border rounded-md px-3 py-2.5 text-[14px] text-dash-text-primary outline-none transition-colors placeholder:text-dash-text-tertiary ${
                emailTouched && !email.trim() ? "border-dash-red" : "border-dash-border focus:border-dash-text-primary"
              }`}
            />
          </div>

          <div className="mb-2">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-1.5">
              {t("login.password")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setPasswordTouched(true)}
              placeholder={t("login.passwordPlaceholder")}
              className={`w-full bg-dash-sidebar border rounded-md px-3 py-2.5 text-[14px] text-dash-text-primary outline-none transition-colors placeholder:text-dash-text-tertiary ${
                passwordTouched && !password.trim() ? "border-dash-red" : "border-dash-border focus:border-dash-text-primary"
              }`}
            />
          </div>

          <div className="flex justify-end mb-6">
            <button className="text-[12px] text-dash-blue hover:underline">{t("login.forgotPassword")}</button>
          </div>

          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full h-10 bg-dash-text-primary text-white rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              t("login.signIn")
            )}
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-dash-border" />
            <span className="text-[12px] text-dash-text-tertiary">{t("login.or")}</span>
            <div className="flex-1 h-px bg-dash-border" />
          </div>

          <button
            onClick={handleGoogle}
            className="w-full h-10 border border-dash-border rounded-md text-[14px] font-medium text-dash-text-primary hover:bg-dash-sidebar transition-colors flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {t("login.continueGoogle")}
          </button>

          <p className="text-center text-[13px] text-dash-text-tertiary mt-6">
            {t("login.noAccount")}{" "}
            <button onClick={() => navigate("/signup")} className="text-dash-blue hover:underline">
              {t("login.startTrial")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
