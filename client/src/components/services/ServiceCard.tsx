import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  benefits: string[];
}

interface ServiceCardProps {
  service: Service;
  isExpanded: boolean;
  onExpand: () => void;
}

const ServiceCard = ({ service, isExpanded, onExpand }: ServiceCardProps) => {
  return (
    <div 
      id={service.id}
      className="service-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
    >
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        <img 
          src={service.imageUrl} 
          alt={service.title} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[var(--primary-800)] mb-3">{service.title}</h3>
        <p className="text-gray-600 mb-4">{service.shortDescription}</p>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-600 mb-4">{service.fullDescription}</p>
                
                {service.benefits.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-[var(--primary-700)] mb-2">Key Benefits:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="text-gray-600">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={onExpand}
          className="mt-4 flex items-center text-[var(--secondary-600)] font-medium transition-colors hover:text-[var(--secondary-700)]"
        >
          {isExpanded ? (
            <>
              <span>Show Less</span>
              <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              <span>Learn More</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
