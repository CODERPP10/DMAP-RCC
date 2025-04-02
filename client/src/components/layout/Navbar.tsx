import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Building } from "lucide-react";

const Navbar = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/services", label: "Services" },
    { path: "/projects", label: "Projects" },
    { path: "/blog", label: "Blog" },
  ];

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-[var(--primary-800)] flex items-center">
              <span className="text-[var(--secondary-600)] mr-1">
                <Building className="inline-block" />
              </span>
              DMAP Construction
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`font-medium ${
                  location === link.path
                    ? "text-[var(--primary-800)] border-b-2 border-[var(--primary-800)]"
                    : "text-gray-600 hover:text-[var(--primary-800)] transition"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/contact" 
              className="ml-4 bg-[var(--secondary-600)] hover:bg-[var(--secondary-700)] text-white py-2 px-4 rounded-md font-medium transition"
            >
              Contact Us
            </Link>
          </div>
          
          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-600 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block py-2 font-medium border-b border-gray-200 ${
                  location === link.path
                    ? "text-[var(--primary-800)]"
                    : "text-gray-600 hover:text-[var(--primary-800)]"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block mt-2 bg-[var(--secondary-600)] text-white py-2 px-4 rounded-md font-medium text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
