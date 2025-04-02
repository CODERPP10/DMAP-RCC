import { Helmet } from "react-helmet";
import HeroSection from "@/components/home/HeroSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import AboutSection from "@/components/home/AboutSection";
import ProjectsShowcase from "@/components/home/ProjectsShowcase";
import Testimonials from "@/components/home/Testimonials";
import BlogSection from "@/components/home/BlogSection";
import BrochureDownload from "@/components/home/BrochureDownload";
import ContactSection from "@/components/home/ContactSection";
import Certifications from "@/components/home/Certifications";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>DMAP Construction - Government Building Retrofitting Specialists</title>
        <meta name="description" content="Professional retrofitting and reconstruction solutions with technical precision and compliance expertise" />
      </Helmet>
      
      <HeroSection />
      <ServicesOverview />
      <AboutSection />
      <ProjectsShowcase />
      <Testimonials />
      <BlogSection />
      <BrochureDownload />
      <ContactSection />
      <Certifications />
    </>
  );
};

export default Home;
