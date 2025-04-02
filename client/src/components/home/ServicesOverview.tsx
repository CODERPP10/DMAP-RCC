import { Link } from "wouter";
import { services } from "@/data/services";

const ServicesOverview = () => {
  // Use only the first 3 services for the overview
  const featuredServices = services.slice(0, 3);

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--primary-800)] mb-2">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive reconstruction and retrofitting solutions for government buildings and structures
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service) => (
            <div 
              key={service.id}
              className="service-card bg-gray-50 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
            >
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img 
                  src={service.imageUrl} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[var(--primary-800)] mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.shortDescription}</p>
                <Link href={`/services#${service.id}`} className="text-[var(--secondary-600)] font-medium inline-flex items-center">
                  Learn More
                  <i className="fas fa-arrow-right ml-2 text-sm"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/services" 
            className="inline-block border-2 border-[var(--primary-800)] text-[var(--primary-800)] hover:bg-[var(--primary-800)] hover:text-white py-2 px-6 rounded-md font-medium transition"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
