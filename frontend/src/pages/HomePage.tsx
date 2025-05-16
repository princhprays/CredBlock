import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Shield, FileCheck, Download } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-darkBlue to-brand-blue/90 text-white py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Secure Academic Credentials with Blockchain Technology
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100">
              CertiChain provides tamper-proof verification of academic certificates
              using blockchain technology, ensuring trust and authenticity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/issue">
                <Button size="lg" className="bg-white text-brand-blue hover:bg-gray-100">
                  Issue Certificate
                </Button>
              </Link>
              <Link to="/verify">
                <Button size="lg" className="bg-white text-brand-blue hover:bg-gray-100">
                  Verify Certificate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center p-3 bg-brand-blue/10 rounded-full mb-4">
                <GraduationCap className="h-7 w-7 text-brand-blue" />
              </div>
              <h3 className="font-bold text-xl mb-3">Issue Credentials</h3>
              <p className="text-gray-600">
                Universities create digital certificates with secure digital signatures
                that can be verified independently.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center p-3 bg-brand-blue/10 rounded-full mb-4">
                <Shield className="h-7 w-7 text-brand-blue" />
              </div>
              <h3 className="font-bold text-xl mb-3">Blockchain Security</h3>
              <p className="text-gray-600">
                Certificate hashes are stored on the blockchain, making them
                tamper-proof and permanently verifiable.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center p-3 bg-brand-blue/10 rounded-full mb-4">
                <FileCheck className="h-7 w-7 text-brand-blue" />
              </div>
              <h3 className="font-bold text-xl mb-3">Instant Verification</h3>
              <p className="text-gray-600">
                Anyone can verify the authenticity of a credential using our
                simple verification tool.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-brand-blue to-brand-darkBlue rounded-2xl p-8 md:p-12 shadow-lg text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Download Blockchain Snapshot
                </h2>
                <p className="mb-6">
                  Get a local copy of our blockchain data for offline verification.
                  Perfect for credential checks without an internet connection.
                </p>
                <Link to="/dashboard">
                  <Button size="lg" className="bg-white text-brand-blue hover:bg-gray-100">
                    <Download className="mr-2 h-4 w-4" />
                    Get Blockchain Snapshot
                  </Button>
                </Link>
              </div>
              
              <div className="hidden md:block">
                <img 
                  src="https://placehold.co/600x400/e0f2fe/0284c7?text=Blockchain+Snapshot" 
                  alt="Blockchain Snapshot" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
