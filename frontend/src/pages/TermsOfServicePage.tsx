import { GraduationCap } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <GraduationCap className="h-8 w-8 text-brand-blue" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">Terms of Service</h1>
            <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing or using CredBlock's blockchain-based credential verification platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
              <p className="text-gray-700 mb-4">
                Permission is granted to temporarily use CredBlock for personal, non-commercial purposes, subject to the following restrictions:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>You must not modify or copy the materials</li>
                <li>You must not use the materials for any commercial purpose</li>
                <li>You must not attempt to reverse engineer any software contained on CredBlock</li>
                <li>You must not remove any copyright or other proprietary notations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">
                As a user of CredBlock, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the platform in compliance with all applicable laws</li>
                <li>Not engage in any fraudulent or malicious activities</li>
                <li>Respect the privacy and rights of other users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Credential Verification</h2>
              <p className="text-gray-700 mb-4">
                Our platform provides blockchain-based verification of academic credentials. By using this service, you acknowledge that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Only authorized institutions can issue credentials</li>
                <li>Verification results are based on blockchain records</li>
                <li>We cannot verify credentials not stored in our blockchain</li>
                <li>You are responsible for the accuracy of submitted credentials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                The CredBlock platform and its original content, features, and functionality are owned by CredBlock and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                In no event shall CredBlock be liable for any damages arising out of the use or inability to use our platform, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Loss of data or business interruption</li>
                <li>Errors in credential verification</li>
                <li>System failures or technical issues</li>
                <li>Unauthorized access to your information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. We will notify users of any changes by updating the "Last updated" date at the top of this page. Your continued use of the platform after such modifications constitutes your acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">8. Contact Information</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms of Service, please contact us at:
                <br />
                <a href="mailto:legal@credblock.com" className="text-brand-blue hover:underline">
                  legal@credblock.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 