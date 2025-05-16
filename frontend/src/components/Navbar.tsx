import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { GraduationCap, Menu, X } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 mr-2 text-brand-blue" />
              <span className="font-bold text-xl text-brand-darkBlue">CredBlock</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-2">
              <Link to="/">
                <Button variant="ghost">Home</Button>
              </Link>
              <Link to="/issue">
                <Button variant="ghost">Issue Credentials</Button>
              </Link>
              <Link to="/verify">
                <Button variant="ghost">Verify Credentials</Button>
              </Link>
            </nav>
            
            <div className="flex items-center">
              <Link to="/dashboard" className="ml-4">
                <Button variant="outline">Dashboard</Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-50"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-white border-b border-gray-100 shadow-lg">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              <Link to="/" className="block" onClick={handleMobileNavClick}>
                <Button variant="ghost" className="w-full justify-start">Home</Button>
              </Link>
              <Link to="/issue" className="block" onClick={handleMobileNavClick}>
                <Button variant="ghost" className="w-full justify-start">Issue Credentials</Button>
              </Link>
              <Link to="/verify" className="block" onClick={handleMobileNavClick}>
                <Button variant="ghost" className="w-full justify-start">Verify Credentials</Button>
              </Link>
              <Link to="/dashboard" className="block" onClick={handleMobileNavClick}>
                <Button variant="outline" className="w-full justify-start">Dashboard</Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
