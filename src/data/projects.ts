export const projects = [
  {
    "slug": "novasync-graduation-hub",
    "seoTitle": "NovaSync Graduation Hub: Certificate Automation",
    "title": "NovaSync Graduation Hub",
    "subtitle": "Automated Graduation & Certificate System",
    "category": "Automation / Operational Web App",
    "image": "novasync",
    "description": "A self-service graduation system connecting student grades, eligibility checks, a student portal and automated certificate delivery.",
    "tools": [
      "Base44",
      "Google Apps Script",
      "Google Sheets",
      "Google Slides",
      "Gmail"
    ],
    "live": "https://nova-claim-path.base44.app/",
    "problem": "Manual certificate eligibility checks and individual distribution create repetitive administrative work. A learner needs a clear answer about eligibility and a reliable way to receive their certificate.",
    "contribution": "I connected the student-facing graduation experience with a grade-based eligibility workflow and certificate delivery.",
    "workflow": [
      "Grades entered",
      "Eligibility checked",
      "Qualified students synced",
      "Certificate claimed",
      "Certificate delivered"
    ],
    "logicTitle": "Eligibility is a business rule, not a manual judgement.",
    "logic": "Students must achieve at least 50% to qualify. Google Sheets holds the grades; Apps Script checks eligibility before a qualified student can claim a certificate through the Base44 portal. Google Slides supplies the certificate, and Gmail handles delivery.",
    "callout": "50%+",
    "calloutLabel": "Minimum qualifying grade",
    "outcome": "The system connects grades, eligibility, claiming and certificate delivery in a self-service path. The supplied recording demonstrates the journey; no student totals or time-saving metrics are claimed.",
    "evidence": [],
    "video": "graduation-demo",
    "videoNote": "A demonstration of the certificate claim journey and delivery confirmation. Private records and inbox details are obscured; this version has no audio.",
    "missing": ""
  },
  {
    "slug": "ai-mastery-class",
    "seoTitle": "AI Mastery Class: Enrollment Automation",
    "title": "AI Mastery Class",
    "subtitle": "Course Website & Automated Student Onboarding",
    "category": "Course Enrollment / Payment & Onboarding Automation",
    "image": "mastery",
    "description": "A course enrollment system connecting a custom website, Paystack payment verification, student records and personalized welcome emails.",
    "tools": [
      "Cloudflare Workers",
      "Cloudflare D1",
      "Paystack",
      "Google Apps Script",
      "Google Sheets",
      "Gmail"
    ],
    "live": "",
    "problem": "Enrollment needs more than a checkout button. A successful payment must become a trustworthy enrollment record, followed by clear information about what happens next.",
    "contribution": "I built a course enrollment experience and connected server-side payment verification to student records and personalized onboarding.",
    "workflow": [
      "Course website",
      "Paystack checkout",
      "Server-side verification",
      "Enrollment record",
      "Google Sheets onboarding",
      "Welcome email"
    ],
    "logicTitle": "Verify first. Then enroll and welcome.",
    "logic": "Cloudflare Workers verifies payment server-side before the enrollment record is created in D1. A signed Apps Script integration passes the verified information to the Google Sheets onboarding workflow. Duplicate-processing protections prevent the same payment event from creating repeated work. The signature acts as a check that the request came from the expected system; no keys or protected endpoints are displayed.",
    "callout": "Verified → enrolled",
    "calloutLabel": "A successful payment is checked before onboarding",
    "outcome": "The system links the customer-facing enrollment experience with verified records and a personalized welcome email. This is the newer Paystack-based AI Mastery Class, separate from the Base44/Selar NovaSync bootcamp.",
    "evidence": [
      {
        "id": "mastery-email",
        "title": "After payment: the welcome email",
        "caption": "Original supplied email, with the recipient greeting redacted and contact footer removed. It demonstrates the onboarding message, not a count of paying customers."
      }
    ],
    "video": "mastery-demo",
    "videoNote": "A tour of the course website, curriculum, pricing and enrollment form. The walkthrough shows the customer-facing experience, not backend payment execution.",
    "missing": ""
  },
  {
    "slug": "passport-potluck",
    "seoTitle": "Passport Potluck: Event Workflow Automation",
    "title": "The Passport Potluck",
    "subtitle": "Event Assignment & Payment Automation",
    "category": "Event Operations / Workflow Automation",
    "image": "passport-potluck",
    "description": "A self-service event system connecting destination assignments, availability rules, participant records and payment verification.",
    "tools": [
      "Google Apps Script",
      "Google Sheets",
      "Web App",
      "Workflow Automation"
    ],
    "live": "",
    "problem": "Destination assignments, availability and payment status can easily become disconnected when event administration is handled across messages and separate records.",
    "contribution": "I built the passport experience and the Apps Script rules that connect destination assignments and payment verification to the operational records in Google Sheets.",
    "workflow": [
      "Passport requested",
      "Availability checked",
      "Difficulty rules applied",
      "Destination assigned",
      "Payment verified",
      "Attendee record updated"
    ],
    "logicTitle": "A playful front end. Clear rules underneath.",
    "logic": "Destination assignments use predefined HARD, MEDIUM and EASY categories alongside availability rules. Google Sheets is the operational source. Payment verification checks for the matching attendee before updating both the payment and attendee status; an unmatched attendee is not marked verified.",
    "callout": "HARD / MEDIUM / EASY",
    "calloutLabel": "Rule-based destination categories",
    "outcome": "The system gives participants a self-service passport journey while keeping assignments and verification status connected to the event records. No payment provider or event attendance figures are inferred.",
    "evidence": [
      {
        "id": "passport-rules",
        "title": "Assignment logic",
        "caption": "Original Apps Script excerpt showing difficulty categorisation and updates to the destination sheet."
      },
      {
        "id": "passport-payment",
        "title": "Payment verification",
        "caption": "Original Apps Script excerpt: an attendee must be found before payment and attendee records are marked VERIFIED."
      }
    ],
    "video": "passport-demo",
    "videoNote": "A short walkthrough of the attendee-facing passport experience, showing the entry screen and destination assignment. Private form and payment scenes are omitted; this excerpt has no audio.",
    "missing": ""
  },
  {
    "slug": "travel-command-center",
    "seoTitle": "Executive Travel Planning & Coordination",
    "title": "Executive Travel Command Center",
    "subtitle": "32 days. 8 cities. One centralized system.",
    "category": "Executive Operations / Travel System",
    "image": "travel",
    "description": "A private travel operations hub organizing itineraries, accommodation, activities and essential resources for a 32-day, eight-city executive family trip.",
    "tools": [
      "Base44",
      "Travel Research",
      "Executive Operations",
      "Information Architecture",
      "Logistics Coordination"
    ],
    "live": "",
    "problem": "A complex international trip creates a large information burden: daily plans, accommodation, activities, documents and contingency resources must remain easy to find.",
    "contribution": "I organised travel research and logistics into a central Base44 hub, giving the trip a clear information structure and a practical reference point.",
    "workflow": [
      "Research destinations",
      "Organise itinerary",
      "Group essential resources",
      "Prepare checklists",
      "Coordinate the journey"
    ],
    "logicTitle": "Designed around the questions a traveller asks.",
    "logic": "The hub groups itinerary and map information with hotels, attractions, restaurants and photoshoots. Supporting areas cover weather guidance, budgets, packing, checklists, travel documents, travel tools and emergency information. This is information architecture and logistics coordination; it does not claim automated bookings, live reservation updates or real-time integrations.",
    "callout": "32 days / 8 cities",
    "calloutLabel": "Trip scope confirmed by the owner",
    "outcome": "A single organised reference brings the trip’s practical information together. The public case study focuses on structure and responsibilities, with dates, route details and sensitive travel materials withheld.",
    "evidence": [],
    "video": "",
    "videoNote": "",
    "missing": "Travel dates, route details and the private walkthrough are withheld for confidentiality."
  }
];
