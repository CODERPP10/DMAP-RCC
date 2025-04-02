import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-[var(--dark)] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DMAP Construction</h3>
            <p className="text-gray-400 mb-4">
              Specialized retrofitting and reconstruction for government buildings and structures.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-facebook-f"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition">Services</Link></li>
              <li><Link href="/projects" className="text-gray-400 hover:text-white transition">Projects</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-gray-400 hover:text-white transition">Structural Retrofitting</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition">Seismic Upgrades</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition">Energy Efficiency</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition">ADA Compliance</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition">Building Security</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-[var(--secondary-600)] mt-1 mr-2"><i className="fas fa-map-marker-alt"></i></span>
                <span className="text-gray-400">123 Construction Avenue, Suite 400, Metropolis, CA 90001</span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--secondary-600)] mt-1 mr-2"><i className="fas fa-envelope"></i></span>
                <span className="text-gray-400">projects@dmapconstruction.com</span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--secondary-600)] mt-1 mr-2"><i className="fas fa-phone-alt"></i></span>
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} DMAP Construction. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
