import { Helmet } from "react-helmet";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - DMAP Construction</title>
        <meta name="description" content="Get in touch with DMAP Construction for your government building retrofitting needs" />
      </Helmet>

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[var(--primary-800)] mb-4">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get in touch with our team for project inquiries or to discuss your building retrofitting needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <ContactForm />
            </div>

            <div className="flex flex-col justify-between">
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[var(--primary-800)] mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-[var(--secondary-600)] mt-1 mr-3"><i className="fas fa-map-marker-alt"></i></span>
                    <div>
                      <p className="font-medium">Our Office</p>
                      <p className="text-gray-600">201, 29 Rustom Building, Veer Nariman Road, Fort, Mumbai &ndash; 400023</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="text-[var(--secondary-600)] mt-1 mr-3"><i className="fas fa-envelope"></i></span>
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-gray-600">dmaprccmum@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="text-[var(--secondary-600)] mt-1 mr-3"><i className="fas fa-phone-alt"></i></span>
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-gray-600">+91 9136994232</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-200 h-64 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235.87414092539964!2d72.83290969624501!3d18.93200253514945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1dcb04b79c5%3A0x7eac716283cf984d!2sRustom%20Building%2C%20Veer%20Nariman%20Rd%2C%20Kala%20Ghoda%2C%20Fort%2C%20Mumbai%2C%20Maharashtra%20400001!5e0!3m2!1sen!2sin!4v1744634052984!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DMAP Construction Location"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[var(--primary-800)] mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-[var(--primary-800)] mb-2">What types of structures do you work with?</h3>
                <p className="text-gray-600">
                  Public and government buildings, residential and commercial complexes, institutional and
                  industrial projects, and infrastructure and utility structures.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-[var(--primary-800)] mb-2">How long does a typical retrofitting project take?</h3>
                <p className="text-gray-600">
                  Timelines vary with scope, complexity, and building size. Small to medium projects typically
                  take 3-6 months; larger comprehensive retrofits can take 6-12 months or more.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-[var(--primary-800)] mb-2">Do you handle permits and approvals?</h3>
                <p className="text-gray-600">
                  Yes. We manage documentation and coordinate with the relevant authorities to keep the work
                  compliant.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-[var(--primary-800)] mb-2">Can you work on occupied buildings?</h3>
                <p className="text-gray-600">
                  Yes. We plan phased execution and coordinate closely with facility management to keep the
                  building in use with minimal disruption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
