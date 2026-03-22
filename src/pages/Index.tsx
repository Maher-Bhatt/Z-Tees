import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeTicker from "@/components/MarqueeTicker";
import Products from "@/components/Products";
import SizeChart from "@/components/SizeChart";
import HowToOrder from "@/components/HowToOrder";
import InstagramSection from "@/components/InstagramSection";
import WhyZTees from "@/components/WhyZTees";
import OrderCTA from "@/components/OrderCTA";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Index() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <Hero />
      <MarqueeTicker />
      <Products />
      <SizeChart />
      <HowToOrder />
      <InstagramSection />
      <WhyZTees />
      <OrderCTA />
      <Footer />
      <FloatingButtons />
    </div>
  );
}
