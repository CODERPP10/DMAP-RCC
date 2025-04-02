import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[500px] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
          zIndex: 0
        }}
      />
      <div className="absolute inset-0 bg-black opacity-50 z-[1]"></div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-6 text-center text-white relative z-[2]">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Government Building Retrofit Specialists</h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Professional retrofitting and reconstruction solutions with technical precision and compliance expertise
        </p>
        <div className="space-x-4">
          <Link 
            href="/about" 
            className="bg-[var(--secondary-600)] hover:bg-[var(--secondary-700)] text-white py-3 px-6 rounded-md font-medium transition inline-block"
          >
            Learn More
          </Link>
          <a 
            href="/brochure.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-transparent border-2 border-white hover:bg-white hover:text-[var(--primary-800)] text-white py-3 px-6 rounded-md font-medium transition inline-block"
          >
            Download Brochure
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
