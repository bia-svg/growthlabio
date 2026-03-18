import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashSidebar from "@/components/dashboard/DashSidebar";
import DashTopbar from "@/components/dashboard/DashTopbar";
import AlertBanner from "@/components/dashboard/AlertBanner";
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
  "/dashboard": "Performance",
  "/dashboard/agent": "AI Copilot",
  "/dashboard/optimizer": "Optimizer",
  "/dashboard/competitor": "Competitors",
  "/dashboard/goals": "Goals",
  "/dashboard/attribution": "Attribution",
  "/dashboard/billing": "Billing",
  "/dashboard/integrations": "Integrations",
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
            <Route path="agent" element={<AIAgent />} />
            <Route path="optimizer" element={<Optimizer onCountChange={setOptimizerCount} />} />
            <Route path="competitor" element={<Competitor />} />
            <Route path="attribution" element={<Attribution />} />
            <Route path="billing" element={<Billing />} />
            <Route path="integrations" element={<Integrations />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
