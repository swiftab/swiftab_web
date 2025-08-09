import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
          <p className="mt-2 text-lg text-gray-600">SwiftTab Restaurant Reservation System</p>
          <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              By accessing and using SwiftTab ("the Service"), you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
            <p>
              SwiftTab is a restaurant reservation platform that connects diners with participating restaurants. These
              terms govern your use of our platform and services.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">2. Service Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>SwiftTab provides an online platform that allows users to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Search for restaurants by location, cuisine, and availability</li>
              <li>Make, modify, and cancel restaurant reservations</li>
              <li>View restaurant information, menus, and reviews</li>
              <li>Receive confirmation and reminder notifications</li>
              <li>Rate and review dining experiences</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">3. User Accounts and Registration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              To make reservations through SwiftTab, you must create an account and provide accurate, complete
              information. You are responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Ensuring your contact information is current and accurate</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">4. Reservation Policies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-lg font-semibold">Making Reservations</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Reservations are subject to restaurant availability and confirmation</li>
              <li>You must provide accurate party size and special requirements</li>
              <li>Reservations may require a credit card to hold the table</li>
              <li>Some restaurants may charge a booking fee or require a deposit</li>
            </ul>

            <Separator className="my-4" />

            <h3 className="text-lg font-semibold">Cancellation Policy</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cancellations must be made at least 2 hours before the reservation time</li>
              <li>Late cancellations or no-shows may result in charges as determined by the restaurant</li>
              <li>Repeated no-shows may result in account suspension</li>
              <li>Some restaurants may have stricter cancellation policies</li>
            </ul>

            <Separator className="my-4" />

            <h3 className="text-lg font-semibold">Modification Policy</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Reservation modifications are subject to availability</li>
              <li>Changes to party size, date, or time must be made through the platform</li>
              <li>Large party size increases may not be accommodated</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">5. User Conduct</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Make false or fraudulent reservations</li>
              <li>Use the service for any unlawful purpose</li>
              <li>Harass, abuse, or harm restaurant staff or other users</li>
              <li>Submit false reviews or ratings</li>
              <li>Attempt to circumvent any security measures</li>
              <li>Use automated systems to make multiple reservations</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">6. Payment and Fees</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              SwiftTab may charge service fees for certain reservations. Any applicable fees will be clearly displayed
              before you complete your reservation. You agree to pay all charges incurred through your account.
            </p>
            <p>
              Restaurants may require deposits or have minimum spending requirements. These policies are set by
              individual restaurants and will be communicated during the booking process.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">7. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>SwiftTab acts as an intermediary between diners and restaurants. We are not responsible for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The quality of food, service, or dining experience</li>
              <li>Restaurant closures, changes in hours, or menu modifications</li>
              <li>Food allergies, dietary restrictions, or health-related issues</li>
              <li>Lost or stolen personal property at restaurants</li>
              <li>Disputes between users and restaurants</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">8. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The SwiftTab platform, including its design, functionality, and content, is protected by copyright,
              trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative
              works without our express written permission.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">9. Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We reserve the right to terminate or suspend your account at any time for violations of these terms or for
              any other reason. Upon termination, your right to use the service will cease immediately.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">10. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon
              posting. Your continued use of the service constitutes acceptance of the modified terms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">11. Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>If you have any questions about these Terms of Service, please contact us at:</p>
            <div className="mt-4 space-y-1">
              <p>
                <strong>Email:</strong> legal@swiftab.com
              </p>
              <p>
                <strong>Phone:</strong> 1-800-SWIFTAB
              </p>
              <p>
                <strong>Address:</strong> SwiftTab Legal Department, 123 Restaurant Row, Food City, FC 12345
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
