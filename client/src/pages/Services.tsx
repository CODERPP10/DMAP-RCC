import { useState } from "react";
import { Helmet } from "react-helmet";
import { services } from "@/data/services";
import ServiceCard from "@/components/services/ServiceCard";

const Services = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const handleServiceExpand = (id: string) => {
    if (expandedService === id) {
      setExpandedService(null);
    } else {
      setExpandedService(id);
    }
  };

  return (
    <>
      <Helmet>
        <title>Services - DMAP Construction</title>
        <meta name="description" content="Our specialized retrofitting and reconstruction services for government buildings" />
      </Helmet>

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[var(--primary-800)] mb-4">Our Services</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive retrofitting and reconstruction solutions tailored for government buildings and facilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <ServiceCard 
                key={service.id}
                service={service}
                isExpanded={expandedService === service.id}
                onExpand={() => handleServiceExpand(service.id)}
              />
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-16">
            <h2 className="text-3xl font-bold text-[var(--primary-800)] mb-6 text-center">Our Service Approach</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="text-[var(--secondary-600)] text-4xl mb-4 text-center">
                  <i className="fas fa-clipboard-check"></i>
                </div>
                <h3 className="text-xl font-semibold text-[var(--primary-800)] mb-3 text-center">Assessment</h3>
                <p className="text-gray-600">
                  Every project begins with a thorough assessment of the existing structure, identifying areas 
                  that require retrofitting, improvement, or reconstruction. Our technical team evaluates 
                  structural integrity, compliance issues, and performance metrics.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="text-[var(--secondary-600)] text-4xl mb-4 text-center">
                  <i className="fas fa-drafting-compass"></i>
                </div>
                <h3 className="text-xl font-semibold text-[var(--primary-800)] mb-3 text-center">Design & Planning</h3>
                <p className="text-gray-600">
                  Based on the assessment findings, we develop detailed retrofit designs and implementation plans. 
                  Our solutions prioritize structural safety, energy efficiency, and regulatory compliance while 
                  considering budget constraints and operational needs.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="text-[var(--secondary-600)] text-4xl mb-4 text-center">
                  <i className="fas fa-hard-hat"></i>
                </div>
                <h3 className="text-xl font-semibold text-[var(--primary-800)] mb-3 text-center">Implementation</h3>
                <p className="text-gray-600">
                  Our experienced team executes the retrofitting work with precision and attention to detail. 
                  We manage all aspects of the project, from securing permits to coordinating specialized contractors, 
                  ensuring minimal disruption to building operations.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[var(--primary-800)] rounded-lg shadow-md p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl font-bold mb-4">Need a specialized service?</h2>
                <p className="opacity-90 mb-4">
                  We understand that government retrofitting projects often have unique requirements. Contact us to 
                  discuss your specific needs and how we can provide tailored solutions.
                </p>
              </div>
              <div>
                <a 
                  href="/contact" 
                  className="bg-white text-[var(--primary-800)] hover:bg-gray-100 py-3 px-6 rounded-md font-semibold transition inline-block"
                >
                  Request a Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
