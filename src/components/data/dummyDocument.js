// dummyData.js
export const dummyDocuments = {
  PRIVACY: {
    id: 1,
    title: "Privacy Policy",
    content: `<h1><strong>Privacy Policy</strong></h1>
<p>This Privacy Policy describes how we collect, use, and protect your personal information when you use our services. We are committed to maintaining the privacy and security of your data in accordance with applicable data protection laws and regulations.</p>

<h3>Information We Collect</h3>
<p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include:</p>
<ul>
<li>Name and contact information including email address and phone number</li>
<li>Payment information and billing details</li>
<li>Account credentials and authentication data</li>
<li>Communication preferences and subscription settings</li>
<li>Usage data and interaction patterns with our services</li>
</ul>

<h3>How We Use Your Information</h3>
<p>We use the information we collect to provide you with better services and enhanced user experience. Specifically, we use your data to:</p>
<ul>
<li>Provide and maintain our services effectively</li>
<li>Process transactions and manage your account</li>
<li>Send you updates, notifications, and marketing communications</li>
<li>Improve our services and user experience through analytics</li>
<li>Provide customer support and respond to your inquiries</li>
<li>Comply with legal obligations and prevent fraudulent activities</li>
</ul>

<h3>Data Protection and Security</h3>
<p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is encrypted both in transit and at rest, and we regularly update our security protocols to ensure maximum protection.</p>

<h3>Your Rights and Choices</h3>
<p>You have the right to access, update, or delete your personal information at any time. You may also opt out of certain communications from us, request data portability, or restrict processing of your information. We will respond to your requests within the timeframes required by applicable law.</p>

<h3>Contact Information</h3>
<p>If you have any questions about this Privacy Policy or our data practices, please contact our privacy team at privacy@example.com or write to us at our business address.</p>`,
    type: "PRIVACY",
    wordCount: 285,
    lastUpdated: new Date().toISOString()
  },
  
  TERMS: {
    id: 2,
    title: "Terms of Service",
    content: `<h1><strong>Terms of Service</strong></h1>
<p>Welcome to our comprehensive service platform. By accessing and using our services, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions, as well as our Privacy Policy and other applicable policies.</p>

<h3>Acceptance of Terms</h3>
<p>By accessing and using this service, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the above terms, you are not authorized to use or access this service and should discontinue use immediately.</p>

<h3>Service Description</h3>
<p>Our platform provides users with access to a comprehensive suite of tools for managing business operations, facilitating communication, conducting data analysis, and streamlining workflow processes. We continuously update and improve our services to meet evolving user needs and industry standards.</p>

<h3>User Responsibilities and Obligations</h3>
<p>Users are responsible for maintaining the confidentiality of their account information and passwords. You agree to use the service in compliance with all applicable local, state, national, and international laws and regulations. Users must not engage in prohibited activities including but not limited to:</p>
<ul>
<li>Violating intellectual property rights of others</li>
<li>Transmitting malicious code or harmful content</li>
<li>Attempting to gain unauthorized access to system resources</li>
<li>Using the service for illegal or fraudulent purposes</li>
</ul>

<h3>Service Availability and Support</h3>
<p>We strive to maintain high service availability and reliability but cannot guarantee uninterrupted access due to factors beyond our control. Scheduled maintenance activities may occur with prior notice to users whenever possible.</p>

<h3>Limitation of Liability</h3>
<p>Our liability is limited to the maximum extent permitted by applicable law. We are not liable for indirect, incidental, consequential, or punitive damages arising from your use of our services.</p>

<p>Last updated: ${new Date().toLocaleDateString()}</p>`,
    type: "TERMS",
    wordCount: 312,
    lastUpdated: new Date().toISOString()
  }
};

// Helper function to simulate API delay
export const simulateApiDelay = (ms = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Simulate successful response
export const createSuccessResponse = (data) => ({
  status: 200,
  data: { document: data }
});

// Simulate error response
export const createErrorResponse = (message = "Something went wrong") => ({
  status: 500,
  message
});