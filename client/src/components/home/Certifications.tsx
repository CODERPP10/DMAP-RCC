const Certifications = () => {
  const certifications = [
    { id: "cert3", name: "MSME Registered", icon: "fas fa-building" },
    { id: "cert1", name: "GST Compliant", icon: "fas fa-certificate" },
    { id: "cert2", name: "EPF Compliant", icon: "fas fa-hard-hat" },
    { id: "cert5", name: "ESIC Licensed", icon: "fas fa-cogs" },
    { id: "cert4", name: "Safety Focused", icon: "fas fa-check-circle" },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[var(--primary-800)]">Our Certifications & Compliance</h2>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {certifications.map((cert) => ( 
            <div 
              key={cert.id}
              className="certification-logo w-32 h-20 bg-white rounded-md shadow-sm flex items-center justify-center p-3"
            >
              <div className="text-gray-400 text-center">
                <i className={`${cert.icon} text-2xl mb-1`}></i>
                <p className="text-xs">{cert.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
