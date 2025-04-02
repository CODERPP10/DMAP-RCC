import { Link } from "wouter";
import { CheckCircle } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold text-[var(--primary-800)] mb-4">About DMAP Construction</h2>
            <p className="text-gray-600 mb-6">
              For the past 5 years, DMAP Construction has been providing specialized retrofitting and 
              reconstruction services for government buildings and infrastructure. Our team brings together 
              technical expertise, industry knowledge, and a commitment to excellence.
            </p>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[var(--primary-800)] mb-3">Our Approach</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="text-[var(--secondary-600)] mr-2 mt-1 flex-shrink-0" size={18} />
                  <span>Collaboration with experienced contractors and engineers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-[var(--secondary-600)] mr-2 mt-1 flex-shrink-0" size={18} />
                  <span>Rigorous quality control and compliance verification</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-[var(--secondary-600)] mr-2 mt-1 flex-shrink-0" size={18} />
                  <span>Transparent communication throughout the project lifecycle</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-[var(--secondary-600)] mr-2 mt-1 flex-shrink-0" size={18} />
                  <span>Commitment to safety standards and regulatory requirements</span>
                </li>
              </ul>
            </div>
            
            <Link 
              href="/contact" 
              className="bg-[var(--secondary-600)] hover:bg-[var(--secondary-700)] text-white py-3 px-6 rounded-md font-medium transition inline-block"
            >
              Get In Touch
            </Link>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="DMAP Construction Team" 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute -bottom-5 -left-5 bg-[var(--primary-800)] rounded-lg shadow-lg px-6 py-4 text-white">
                <p className="font-semibold">5+ Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
