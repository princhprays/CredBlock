import { GraduationCap, X, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <GraduationCap className="h-6 w-6 mr-2 text-brand-blue" />
            <span className="font-bold text-lg text-brand-darkBlue">CredBlock</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-6 text-sm text-gray-500 mb-4 md:mb-0">
            <Link to="/privacy" className="hover:text-brand-blue">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-blue">Terms of Service</Link>
            <Link to="/contact" className="hover:text-brand-blue">Contact Us</Link>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://x.com/itsnotp5" className="text-gray-500 hover:text-brand-blue" aria-label="X">
              <X className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/paul-echon-708047364/" className="text-gray-500 hover:text-brand-blue" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="https://github.com/princhprays" className="text-gray-500 hover:text-brand-blue" aria-label="GitHub">
              <Github className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} CredBlock. All rights reserved.</p>
          <p className="mt-1">Secure Blockchain Credential Verification</p>
        </div>
      </div>
    </footer>
  );
}
