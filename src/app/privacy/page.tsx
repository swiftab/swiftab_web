import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mt-2 text-lg text-gray-600">SwiftTab Restaurant Reservation System</p>
          <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">1. Introduction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              SwiftTab ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how
              we collect, use, disclose, and safeguard your information when you use our restaurant reservation platform
              and services.
            </p>
            <p>
              By using SwiftTab, you consent to the data practices described in this policy. If you do not agree with
              this policy, please do not use our services.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">2. Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <p>We collect personal information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, and phone number</li>
              <li>Account credentials (username and password)</li>
              <li>Payment information (credit card details, billing address)</li>
              <li>Dining preferences and dietary restrictions</li>
              <li>Special occasion information</li>
              <li>Profile photo (optional)</li>
            </ul>

            <Separator className="my-4" />

            <h3 className="text-lg font-semibold">Reservation Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Restaurant preferences and booking history</li>
              <li>Party size and seating preferences</li>
              <li>Special requests and notes</li>
              <li>Cancellation and modification history</li>
            </ul>

            <Separator className="my-4" />

            <h3 className="text-lg font-semibold">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, click patterns)</li>
              <li>Location data (with your permission)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">3. How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process and manage your restaurant reservations</li>
              <li>Send confirmation emails and reservation reminders</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Personalize your experience and recommend restaurants</li>
              <li>Process payments and prevent fraud</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our services and develop new features</li>
              <li>Comply with legal obligations</li>
              <li>Analyze usage patterns and service performance</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">4. Information Sharing and Disclosure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-lg font-semibold">With Restaurants</h3>
            <p>
              We share necessary reservation information with restaurants, including your name, contact information,
              party size, special requests, and dietary restrictions to fulfill your booking.
            </p>

            <Separator className="my-4" />

            <h3 className="text-lg font-semibold">With Service Providers</h3>
            <p>We may share information with third-party service providers who assist us with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payment processing</li>
              <li>Email and SMS communications</li>
              <li>Customer support</li>
              <li>Analytics and marketing</li>
              <li>Cloud hosting and data storage</li>
            </ul>

            <Separator className="my-4" />

            <h3 className="text-lg font-semibold">Legal Requirements</h3>
            <p>We may disclose your information when required by law or to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Comply with legal processes or government requests</li>
              <li>Protect our rights, property, or safety</li>
              <li>Prevent fraud or security threats</li>
              <li>Enforce our terms of service</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">5. Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We implement appropriate technical and organizational security measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication requirements</li>
              <li>Employee training on data protection</li>
              <li>Secure payment processing through certified providers</li>
            </ul>
            <p>
              However, no method of transmission over the internet or electronic storage is 100% secure. We cannot
              guarantee absolute security of your information.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">6. Cookies and Tracking Technologies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Remember your preferences and login information</li>
              <li>Analyze website traffic and user behavior</li>
              <li>Provide personalized content and advertisements</li>
              <li>Improve website functionality and performance</li>
            </ul>
            <p>
              You can control cookie settings through your browser preferences. However, disabling cookies may limit
              some functionality of our service.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">7. Your Privacy Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Access:</strong> Request a copy of your personal information
              </li>
              <li>
                <strong>Correction:</strong> Update or correct inaccurate information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal information
              </li>
              <li>
                <strong>Portability:</strong> Receive your data in a portable format
              </li>
              <li>
                <strong>Opt-out:</strong> Unsubscribe from marketing communications
              </li>
              <li>
                <strong>Restriction:</strong> Limit how we process your information
              </li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided below. We will respond to your
              request within the timeframe required by applicable law.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">8. Data Retention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We retain your personal information for as long as necessary to provide our services and fulfill the
              purposes outlined in this policy. Specific retention periods include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account information: Until account deletion or 3 years of inactivity</li>
              <li>Reservation history: 2 years after the reservation date</li>
              <li>Payment information: As required by payment processors and tax laws</li>
              <li>Marketing data: Until you opt-out or 2 years of inactivity</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">9. Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              SwiftTab is not intended for children under 13 years of age. We do not knowingly collect personal
              information from children under 13. If we become aware that we have collected personal information from a
              child under 13, we will take steps to delete such information.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">10. International Data Transfers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure
              appropriate safeguards are in place to protect your information in accordance with this privacy policy and
              applicable laws.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">11. Changes to This Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting
              the new policy on this page and updating the "Last updated" date. We encourage you to review this policy
              periodically.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">12. Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
            <div className="mt-4 space-y-1">
              <p>
                <strong>Email:</strong> privacy@swiftab.com
              </p>
              <p>
                <strong>Phone:</strong> 1-800-SWIFTAB
              </p>
              <p>
                <strong>Address:</strong> SwiftTab Privacy Officer, 123 Restaurant Row, Food City, FC 12345
              </p>
            </div>
            <p className="mt-4">
              <strong>Data Protection Officer:</strong> dpo@swiftab.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
