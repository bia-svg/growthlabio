import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-background flex flex-col font-inter">
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

      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-[480px] text-center">
          <h1 className="text-[32px] font-bold tracking-[-0.04em] text-dash-text-primary mb-3">
            Welcome, Vini
          </h1>
          <p className="text-[14px] text-dash-text-tertiary leading-relaxed mb-10">
            Let's set up your GrowthLab. You'll see your first insights in under 10 minutes.
          </p>
          <button
            onClick={() => navigate("/onboarding")}
            className="w-full h-[44px] bg-dash-text-primary text-white rounded-md text-[15px] font-semibold hover:opacity-90 transition-opacity"
          >
            Get started →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
