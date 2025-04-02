import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - DMAP Construction</title>
        <meta name="description" content="Learn about DMAP Construction, our approach, and our team" />
      </Helmet>

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[var(--primary-800)] mb-4">About Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our story, our approach, and our commitment to excellence in government building retrofitting
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-[var(--primary-800)] mb-4">Company Overview</h2>
              <p className="text-gray-600 mb-6">
                For the past 5 years, DMAP Construction has been providing specialized retrofitting 
                and reconstruction services for government buildings and infrastructure throughout the region. 
                Our company was founded with a vision to deliver technically excellent construction services 
                with a focus on safety, compliance, and quality.
              </p>
              <p className="text-gray-600 mb-6">
                We operate as a small but highly effective team, bringing together the best technical contractors 
                and specialists for each project. Our management team focuses on ensuring seamless execution and 
                attention to detail, while our extended network of professionals delivers expert implementation.
              </p>
              <p className="text-gray-600 mb-6">
                Throughout our operation, we've successfully completed numerous government retrofitting projects, 
                building a reputation for technical excellence and reliable project delivery.
              </p>
            </div>
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

          <div className="bg-white rounded-lg shadow-md p-8 mb-16">
            <h2 className="text-3xl font-bold text-[var(--primary-800)] mb-6">Our Approach</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-[var(--primary-800)] mb-4">Collaboration</h3>
                <p className="text-gray-600 mb-4">
                  We believe in the power of collaboration with experienced professionals across various 
                  disciplines. By bringing together specialists in structural engineering, architecture, 
                  energy efficiency, and construction, we create comprehensive solutions for complex retrofitting 
                  challenges.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="text-[var(--secondary-600)] mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>Partnership with industry-leading engineers and specialists</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-[var(--secondary-600)] mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>Cross-functional approach to problem-solving</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[var(--primary-800)] mb-4">Quality & Compliance</h3>
                <p className="text-gray-600 mb-4">
                  Working on government buildings demands an unwavering commitment to quality, safety, 
                  and regulatory compliance. We maintain rigorous quality control processes and stay 
                  up-to-date with all relevant building codes and standards.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="text-[var(--secondary-600)] mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>Strict adherence to all applicable building codes and regulations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-[var(--secondary-600)] mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>Comprehensive quality assurance throughout the project lifecycle</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-[var(--primary-800)] mb-4">Our Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="bg-[var(--primary-800)] w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-4">1</div>
                  <h4 className="text-lg font-semibold mb-2">Assessment</h4>
                  <p className="text-gray-600">Thorough evaluation of existing structures and requirements</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="bg-[var(--primary-800)] w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-4">2</div>
                  <h4 className="text-lg font-semibold mb-2">Planning</h4>
                  <p className="text-gray-600">Detailed engineering and architectural planning with compliance focus</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="bg-[var(--primary-800)] w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-4">3</div>
                  <h4 className="text-lg font-semibold mb-2">Execution</h4>
                  <p className="text-gray-600">Precise implementation with ongoing quality control and verification</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-[var(--primary-800)] mb-6">Leadership Team</h2>
            <p className="text-gray-600 mb-8">
              Our leadership team brings together decades of combined experience in the construction and 
              retrofitting industry. With diverse backgrounds in engineering, project management, and government 
              contracting, our team provides the expertise needed to deliver complex retrofitting projects 
              successfully.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[var(--primary-800)] mb-2">Operations Director</h3>
                <p className="text-gray-600 mb-4">
                  Our Operations Director oversees project execution and ensures that all work is performed to 
                  the highest standards. With extensive experience in construction management and government 
                  contracting, they bring valuable leadership to every project.
                </p>
                <p className="text-gray-600">
                  <strong>Expertise:</strong> Project Management, Government Contracting, Construction Oversight
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[var(--primary-800)] mb-2">Technical Coordinator</h3>
                <p className="text-gray-600 mb-4">
                  Our Technical Coordinator is responsible for ensuring all projects meet the required technical 
                  specifications and building codes. They work closely with our network of engineers and 
                  contractors to implement compliant solutions.
                </p>
                <p className="text-gray-600">
                  <strong>Expertise:</strong> Structural Engineering, Compliance, Quality Assurance
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/contact" 
              className="bg-[var(--secondary-600)] hover:bg-[var(--secondary-700)] text-white py-3 px-8 rounded-md font-medium transition inline-block"
            >
              Get In Touch With Our Team
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
