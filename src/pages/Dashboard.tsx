import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashSidebar from "@/components/dashboard/DashSidebar";
import DashTopbar from "@/components/dashboard/DashTopbar";
import AlertBanner from "@/components/dashboard/AlertBanner";
import ComingSoonOverlay from "@/components/dashboard/ComingSoonOverlay";
import Performance from "@/pages/dashboard/Performance";
import AIAgent from "@/pages/dashboard/AIAgent";
import Optimizer from "@/pages/dashboard/Optimizer";
import Competitor from "@/pages/dashboard/Competitor";
import Attribution from "@/pages/dashboard/Attribution";
import Billing from "@/pages/dashboard/Billing";
import Goals from "@/pages/dashboard/Goals";
import Integrations from "@/pages/dashboard/Integrations";
import { useLocation } from "react-router-dom";

const breadcrumbMap: Record<string, string> = {
  "/app": "Performance",
  "/app/agent": "AI Copilot",
  "/app/optimizer": "Optimizer",
  "/app/competitor": "Competitors",
  "/app/goals": "Goals",
  "/app/attribution": "Attribution",
  "/app/billing": "Billing",
  "/app/integrations": "Integrations",
};

const Dashboard = () => {
  const [optimizerCount, setOptimizerCount] = useState(3);
  const location = useLocation();
  const breadcrumb = breadcrumbMap[location.pathname] || "Dashboard";

  return (
    <div className="flex h-screen w-full overflow-hidden font-inter">
      <DashSidebar optimizerCount={optimizerCount} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashTopbar breadcrumb={breadcrumb} />
        <AlertBanner />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route index element={<Performance />} />
            <Route path="agent" element={<ComingSoonOverlay><AIAgent /></ComingSoonOverlay>} />
            <Route path="optimizer" element={<ComingSoonOverlay><Optimizer onCountChange={setOptimizerCount} /></ComingSoonOverlay>} />
            <Route path="competitor" element={<ComingSoonOverlay><Competitor /></ComingSoonOverlay>} />
            <Route path="goals" element={<Goals />} />
            <Route path="attribution" element={<ComingSoonOverlay><Attribution /></ComingSoonOverlay>} />
            <Route path="billing" element={<Billing />} />
            <Route path="integrations" element={<Integrations />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
