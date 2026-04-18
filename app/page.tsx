import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MarqueeStrip from "@/components/MarqueeStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <About />
      <Services />
      <MarqueeStrip />
      <Gallery />
      <Contact />
      <Footer />
    </>
  );
}
