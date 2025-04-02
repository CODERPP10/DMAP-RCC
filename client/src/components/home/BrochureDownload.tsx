const BrochureDownload = () => {
  return (
    <section id="brochure" className="py-12 bg-[var(--primary-800)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3 mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Download Our Technical Brochure</h2>
            <p className="text-white opacity-90 max-w-2xl">
              Get detailed information about our services, technical specifications, and project methodologies in our comprehensive brochure.
            </p>
          </div>
          <div>
            <a 
              href="/brochure.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-[var(--primary-800)] hover:bg-gray-100 py-3 px-6 rounded-md font-semibold transition inline-flex items-center"
            >
              <i className="fas fa-file-pdf mr-2"></i>
              Download PDF Brochure
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrochureDownload;
