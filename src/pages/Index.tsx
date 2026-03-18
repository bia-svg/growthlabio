import { useState } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import IntegrationsBar from "@/components/IntegrationsBar";
import PlatformSection from "@/components/PlatformSection";
import AgentSection from "@/components/AgentSection";
import HowAndStats from "@/components/HowAndStats";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import DemoModal from "@/components/DemoModal";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <NavBar onOpenModal={openModal} />
      <HeroSection onOpenModal={openModal} />
      <IntegrationsBar />
      <PlatformSection />
      <AgentSection />
      <HowAndStats />
      <CTASection onOpenModal={openModal} />
      <Footer />
      <DemoModal open={modalOpen} onClose={closeModal} />
    </>
  );
};

export default Index;
