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
    "contribution": "I independently designed and built the Graduation Hub, connecting grade-based eligibility checks, certificate generation and self-service certificate access.",
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
    "outcome": "Students used the hub during a real graduation cohort. Automated certificate generation and self-service access eliminated the need to prepare and distribute certificates individually and avoided the need to hire an external graphic designer for certificate preparation.",
    "evidence": [],
    "video": "graduation-demo",
    "videoNote": "A demonstration of the certificate claim journey and delivery confirmation. Private records and inbox details are obscured; this version has no audio.",
    "missing": "",
    "status": "Independent implementation · Used during a real graduation cohort",
    "outcomeNote": "Estimated time saving: approximately five hours per week. This was a rough estimate made after implementation, not a measured result.",
    "history": "",
    "intro": "A self-service graduation system connecting student grades, eligibility checks, a student portal and automated certificate delivery.",
    "relatedLabel": "Explore enrollment and onboarding automation",
    "relatedHref": "/ai-mastery-class/"
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
    "contribution": "I independently built the original enrollment workflow used for Cohorts 1 and 2, then rebuilt the system with improved architecture for payment verification, student records and automated onboarding.",
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
    "outcome": "The newer system has processed real student registrations and connects verified payment information with student records and automated onboarding. The recorded walkthrough shows the customer-facing experience, while the redacted welcome email illustrates onboarding.",
    "evidence": [
      {
        "id": "mastery-email",
        "title": "After payment: the welcome email",
        "caption": "Original supplied email, with the recipient greeting redacted and contact footer removed. It demonstrates the onboarding message, not a count of paying customers."
      }
    ],
    "video": "mastery-demo",
    "videoNote": "A tour of the course website, curriculum, pricing and enrollment form. The walkthrough shows the customer-facing experience, not backend payment execution.",
    "missing": "",
    "status": "Independent implementation · Real registrations processed · Prepared for Cohort 3",
    "history": "The earlier workflow used Base44, Selar notifications, Google Apps Script and Google Sheets. The newer architecture uses a custom website, Paystack verification and Cloudflare-backed enrollment records. Cohorts 1 and 2 used the earlier workflow; the rebuilt architecture is a subsequent version. It has processed real student registrations and is prepared to support Cohort 3.",
    "outcomeNote": "",
    "intro": "A course enrollment system connecting a custom website, Paystack payment verification, student records and personalized welcome emails.",
    "relatedLabel": "Explore grade-based certificate automation",
    "relatedHref": "/novasync-graduation-hub/"
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
    "contribution": "I independently designed and built the registration and passport experience, destination-assignment logic and Google Sheets integration.",
    "workflow": [
      "Passport requested",
      "Availability checked",
      "Difficulty rules applied",
      "Destination assigned",
      "Payment records checked",
      "Attendee record updated"
    ],
    "logicTitle": "A playful front end. Clear rules underneath.",
    "logic": "Destination assignments use predefined HARD, MEDIUM and EASY categories alongside availability rules. Google Sheets holds the operational records. Payment information is checked against those records, including a matching attendee, before payment and attendee status are updated. This is a record check, not direct payment-gateway verification.",
    "callout": "HARD / MEDIUM / EASY",
    "calloutLabel": "Rule-based destination categories",
    "outcome": "Successful participant registrations have been recorded for the event scheduled for November 21, 2026. The system connects registration, destination assignments and Google Sheets records; these are pre-event results, not a claim that the event has taken place.",
    "evidence": [
      {
        "id": "passport-rules",
        "title": "Assignment logic",
        "caption": "Original Apps Script excerpt showing difficulty categorisation and updates to the destination sheet."
      },
      {
        "id": "passport-payment",
        "title": "Payment record checks",
        "caption": "Original Apps Script excerpt: an attendee must be found before payment and attendee records are marked VERIFIED."
      }
    ],
    "video": "passport-demo",
    "videoNote": "A short walkthrough of the attendee-facing passport experience, showing the entry screen and destination assignment. Private form and payment scenes are omitted; this excerpt has no audio.",
    "missing": "",
    "status": "Independent implementation · Registrations recorded for the event scheduled for November 21, 2026",
    "intro": "A self-service event system connecting registration, destination assignments and participant records, with payment information checked against Google Sheets records.",
    "outcomeNote": "",
    "history": "",
    "relatedLabel": "See another rule-based workflow: Graduation Hub",
    "relatedHref": "/novasync-graduation-hub/"
  },
  {
    "slug": "travel-command-center",
    "seoTitle": "Executive Travel Planning & Coordination",
    "title": "Executive Travel Command Center",
    "subtitle": "32 days. Eight destinations. One centralized system.",
    "category": "Executive Operations / Travel System",
    "image": "travel",
    "description": "A private travel operations hub organizing itineraries, accommodation, activities and essential resources for a 32-day, eight-destination executive family trip.",
    "tools": [
      "Base44",
      "Travel Research",
      "Executive Operations",
      "Information Architecture",
      "Logistics Coordination"
    ],
    "live": "",
    "problem": "A complex international trip creates a large information burden: daily plans, accommodation, activities, documents and contingency resources must remain easy to find.",
    "contribution": "I independently researched, planned and coordinated the trip, bringing the practical travel information together in an interactive hub for the executive.",
    "workflow": [
      "Research destinations",
      "Organise itinerary",
      "Group essential resources",
      "Prepare checklists",
      "Coordinate the journey"
    ],
    "logicTitle": "Designed around the questions a traveller asks.",
    "logic": "The executive used the hub during the trip to access hotel booking codes, arrival-card links, attractions, dinner recommendations and itinerary information. It provided an organized reference for the journey; it was not an automated booking or reservation system.",
    "callout": "32 days / 8 destinations",
    "calloutLabel": "Project scope",
    "outcome": "The executive actively used the interactive hub during the trip to find practical information in one place. The 32 days and eight destinations describe the scope of the project, not a measured financial return or efficiency improvement.",
    "evidence": [],
    "video": "",
    "videoNote": "",
    "missing": "Travel dates, route details and the private walkthrough are withheld for confidentiality.",
    "status": "Independent executive project · Hub used during the trip",
    "intro": "A private travel operations hub organizing itineraries, accommodation, activities and essential resources for a real 32-day trip across eight destinations.",
    "outcomeNote": "",
    "history": "",
    "relatedLabel": "View executive assistance and operations work samples",
    "relatedHref": "/executive-operations/"
  }
];
