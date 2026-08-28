import { certifications } from "@/data/certifications";

const Certifications = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[var(--primary-800)]">Our Certifications &amp; Compliance</h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="certification-logo w-36 h-24 bg-white rounded-md shadow-sm flex items-center justify-center p-3 hover:shadow-md transition-shadow"
            >
              <div className="text-center">
                <i className={`${cert.icon} text-2xl mb-1 text-gray-300`}></i>
                <p className="text-xs text-gray-600">{cert.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
