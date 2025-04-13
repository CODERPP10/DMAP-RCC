import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import ServiceCard from "@/components/services/ServiceCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

/**
 * Services page component
 * Displays all available services with expandable cards
 */
const Services = () => {
  // State to track which service card is expanded
  const [expandedService, setExpandedService] = useState<number | null>(null);

  // Fetch services from API
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/services'],
    refetchOnWindowFocus: false
  });

  // Handle service card expansion toggle
  const handleServiceExpand = (id: number) => {
    if (expandedService === id) {
      setExpandedService(null);
    } else {
      setExpandedService(id);
    }
  };

  // Format services for the ServiceCard component
  const formatServicesForUI = (serviceData: any) => {
    return serviceData.map((service: any) => ({
      id: service.id,
      title: service.title,
      shortDescription: service.shortDescription || `Professional ${service.title.toLowerCase()} services`,
      fullDescription: service.fullDescription || `Our ${service.title.toLowerCase()} services are delivered with the highest standards of quality and safety.`,
      imageUrl: service.imageUrl || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3",
      benefits: service.benefits || ["Quality assurance", "Expert technical team", "Cost-effective solutions"]
    }));
  };

  return (
    <>
      <Helmet>
        <title>Services - DMAP Retrofit Construction Company</title>
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

          {/* Loading state */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-6">
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-24 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-2" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {error && (
            <Alert variant="destructive" className="mb-8">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                There was a problem loading the services. Please try again later.
              </AlertDescription>
            </Alert>
          )}

          {/* Loaded state */}
          {data && data.data && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {formatServicesForUI(data.data).map((service: any) => (
                <ServiceCard 
                  key={service.id}
                  service={service}
                  isExpanded={expandedService === service.id}
                  onExpand={() => handleServiceExpand(service.id)}
                />
              ))}
            </div>
          )}

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
