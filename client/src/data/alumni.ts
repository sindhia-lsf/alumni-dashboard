export type ResourceCategory = "Newsletters" | "Articles" | "Fundraising & Investments";

export type ResourceItem = {
  id: number;
  category: ResourceCategory;
  title: string;
  description: string;
  type: string;
  readTime: string;
  featured?: boolean;
  url: string;
};

export type Luminary = {
  id: number;
  name: string;
  title: string;
  company: string;
  industry: string;
  location: string;
  cohort: string;
  initials: string;
  accent: string;
};

export const announcements = [
  {
    id: 1,
    tag: "Community",
    title: "Save the date: Lightship Alumni Summit",
    body: "Join founders from across the network for an afternoon of practical sessions, peer introductions, and founder stories.",
    date: "October 18",
    accent: "red",
  },
  {
    id: 2,
    tag: "Opportunity",
    title: "JobsOhio Small Business Grant",
    body: "Eligible Ohio founders may explore non-dilutive support of up to $50,000 for growth investments.",
    date: "Applications open",
    accent: "yellow",
  },
];

export const resources: ResourceItem[] = [
  {
    id: 1,
    category: "Newsletters",
    title: "The Founder Dispatch — September",
    description: "Fresh opportunities, community wins, and practical tools selected for founders actively building.",
    type: "Newsletter",
    readTime: "6 min read",
    featured: true,
    url: "https://www.lightship.foundation/blog/",
  },
  {
    id: 2,
    category: "Newsletters",
    title: "The Founder Dispatch — August",
    description: "A roundup of funding opportunities, upcoming programs, and alumni milestones.",
    type: "Newsletter",
    readTime: "5 min read",
    url: "https://www.lightship.foundation/blog/",
  },
  {
    id: 3,
    category: "Articles",
    title: "Turn customer insight into a sharper offer",
    description: "A practical framework for validating demand and positioning your company more clearly.",
    type: "Playbook",
    readTime: "8 min read",
    featured: true,
    url: "https://www.lightship.foundation/bootcamp/",
  },
  {
    id: 4,
    category: "Articles",
    title: "Build a financial model you can actually use",
    description: "Focus your model on the decisions that matter: runway, hiring, pricing, and growth scenarios.",
    type: "Guide",
    readTime: "12 min read",
    url: "https://www.lightship.foundation/bootcamp/",
  },
  {
    id: 5,
    category: "Articles",
    title: "The founder's operating cadence",
    description: "Create a lightweight weekly rhythm that keeps priorities, metrics, and your team aligned.",
    type: "Template",
    readTime: "7 min read",
    url: "https://www.lightship.foundation/blog/",
  },
  {
    id: 6,
    category: "Fundraising & Investments",
    title: "Investor readiness checklist",
    description: "Know what to prepare before outreach—from your data room and narrative to traction proof points.",
    type: "Checklist",
    readTime: "10 min read",
    featured: true,
    url: "https://www.lightship.foundation/bootcamp/",
  },
  {
    id: 7,
    category: "Fundraising & Investments",
    title: "Build a pitch that gets attention",
    description: "Communicate your value, traction, and story so investors understand why your company wins.",
    type: "Workshop recap",
    readTime: "14 min read",
    url: "https://www.lightship.foundation/bootcamp/",
  },
  {
    id: 8,
    category: "Fundraising & Investments",
    title: "Non-dilutive capital resource map",
    description: "A starter guide to grants and founder-friendly programs that can fund your next growth milestone.",
    type: "Resource list",
    readTime: "9 min read",
    url: "https://www.jobsohio.com/incentives-programs/support-for-small-businesses/jobsohio-small-business-grant",
  },
];

export const luminaries: Luminary[] = [
  { id: 1, name: "Maya Thompson", title: "Founder & CEO", company: "Cirrus Health", industry: "Health & Wellness", location: "Cincinnati, OH", cohort: "Cincinnati · 2024", initials: "MT", accent: "#F9D95B" },
  { id: 2, name: "Jordan Ellis", title: "Co-founder", company: "Northstar Labs", industry: "Technology", location: "Columbus, OH", cohort: "Columbus · 2025", initials: "JE", accent: "#E25252" },
  { id: 3, name: "Nia Carter", title: "Founder & Creative Director", company: "Common Thread", industry: "Consumer", location: "Cleveland, OH", cohort: "Cleveland · 2024", initials: "NC", accent: "#9BC8C2" },
  { id: 4, name: "Andre Williams", title: "CEO", company: "CivicGrid", industry: "Technology", location: "Dayton, OH", cohort: "Dayton · 2023", initials: "AW", accent: "#B7A4D8" },
  { id: 5, name: "Leah Brooks", title: "Founder", company: "Rooted Goods", industry: "Food & Beverage", location: "Toledo, OH", cohort: "Toledo · 2025", initials: "LB", accent: "#F2A870" },
  { id: 6, name: "Marcus Green", title: "Founder & COO", company: "ForgeWorks", industry: "Manufacturing", location: "Youngstown, OH", cohort: "Youngstown · 2024", initials: "MG", accent: "#8CB4DD" },
  { id: 7, name: "Aisha Patel", title: "Co-founder & CEO", company: "Morrow Finance", industry: "Financial Services", location: "Akron, OH", cohort: "Akron · 2025", initials: "AP", accent: "#E99DB0" },
  { id: 8, name: "Devon Price", title: "Founder", company: "Field Notes Studio", industry: "Professional Services", location: "Marietta, OH", cohort: "Marietta · 2026", initials: "DP", accent: "#AFCA7B" },
];

export const upcomingEvents = [
  { day: "02", month: "OCT", title: "Fundraising readiness office hours", meta: "Virtual · 1:00 PM ET", type: "Office hours" },
  { day: "18", month: "OCT", title: "Lightship Alumni Summit", meta: "Columbus, OH · 11:00 AM", type: "Community" },
  { day: "06", month: "NOV", title: "Financial modeling clinic", meta: "Virtual · 3:00 PM ET", type: "Workshop" },
];

export const lightshipUpdates = [
  {
    id: 1,
    category: "Announcement",
    title: "Lightship Alumni Summit registration is open",
    summary: "Reserve your seat for an afternoon of founder sessions, curated introductions, and community celebration in Columbus.",
    date: "September 24, 2026",
    action: "Reserve your seat",
    unread: true,
    pinned: true,
  },
  {
    id: 2,
    category: "Opportunity",
    title: "JobsOhio Small Business Grant office hours",
    summary: "Eligible Ohio founders can join a live Q&A about the non-dilutive funding program and application process.",
    date: "September 22, 2026",
    action: "View details",
    unread: true,
    pinned: false,
  },
  {
    id: 3,
    category: "Action required",
    title: "Update your 2026 company metrics",
    summary: "Help us understand alumni progress and tailor upcoming support by reviewing your revenue, hiring, and fundraising information.",
    date: "September 19, 2026",
    action: "Update metrics",
    unread: true,
    pinned: false,
  },
  {
    id: 4,
    category: "Event",
    title: "Founder financial modeling clinic",
    summary: "Bring your current model and work directly with operators on forecasting, runway, and decision-ready scenarios.",
    date: "September 15, 2026",
    action: "Add to calendar",
    unread: false,
    pinned: false,
  },
  {
    id: 5,
    category: "Community",
    title: "Welcome the newest Youngstown cohort",
    summary: "Meet the founders joining the network and discover where their companies are creating new momentum.",
    date: "September 10, 2026",
    action: "Meet the cohort",
    unread: false,
    pinned: false,
  },
  {
    id: 6,
    category: "Announcement",
    title: "New monthly alumni office-hours schedule",
    summary: "Fundraising, growth, finance, and operations sessions are now available on a recurring monthly cadence.",
    date: "September 4, 2026",
    action: "See the schedule",
    unread: false,
    pinned: false,
  },
];
