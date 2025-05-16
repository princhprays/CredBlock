import { GraduationCap } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <GraduationCap className="h-8 w-8 text-brand-blue" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">Privacy Policy</h1>
            <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                CredBlock ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our blockchain-based credential verification platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">2.1 Personal Information</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Name and contact information</li>
                    <li>Academic credentials and certificates</li>
                    <li>Institution information</li>
                    <li>Digital signatures and public keys</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">2.2 Usage Information</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent</li>
                    <li>Verification history</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>To provide and maintain our credential verification service</li>
                <li>To verify the authenticity of academic credentials</li>
                <li>To improve and personalize user experience</li>
                <li>To communicate with you about our services</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Blockchain and Data Storage</h2>
              <p className="text-gray-700 mb-4">
                Our platform uses blockchain technology to store credential verification data. This means that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Data stored on the blockchain is immutable and permanent</li>
                <li>We use cryptographic techniques to protect sensitive information</li>
                <li>Only authorized parties can access and verify credentials</li>
                <li>We maintain a local copy of the blockchain for faster access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures to protect your data, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Encryption of sensitive data</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Secure data storage and transmission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Your Rights</h2>
              <p className="text-gray-700 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to data processing</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy, please contact us at:
                <br />
                <a href="mailto:privacy@credblock.com" className="text-brand-blue hover:underline">
                  privacy@credblock.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 