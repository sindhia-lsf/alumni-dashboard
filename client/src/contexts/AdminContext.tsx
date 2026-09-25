import { createContext, useContext, useMemo, useState } from "react";

export type ContentStatus = "Draft" | "Scheduled" | "Published" | "Archived";
export type RequestStatus = "New" | "Viewed" | "Scheduled" | "Closed";

export type AdminAnnouncement = {
  id: number;
  title: string;
  summary: string;
  audience: string;
  status: ContentStatus;
  publishAt: string;
  createdBy: string;
  updatedBy: string;
  updatedAt: string;
};

export type AdminResource = {
  id: number;
  title: string;
  description: string;
  category: string;
  url: string;
  status: ContentStatus;
  publishAt: string;
  createdBy: string;
  updatedBy: string;
  updatedAt: string;
};

export type AdminRequest = {
  id: number;
  founderName: string;
  company: string;
  topic: string;
  message: string;
  format: string;
  preferredDate: string;
  status: RequestStatus;
  submittedAt: string;
  followUpAt: string;
  lastActionBy: string;
  lastActionAt: string;
};

export type AdminActivity = {
  id: number;
  action: string;
  detail: string;
  actor: string;
  timestamp: string;
};

const adminUser = {
  name: "Morgan Lee",
  email: "morgan@lightship.foundation",
  initials: "ML",
  role: "Program Administrator",
};

const initialAnnouncements: AdminAnnouncement[] = [
  { id: 1, title: "Lightship Alumni Summit registration is open", summary: "Registration details and travel guidance for the annual alumni gathering.", audience: "All alumni", status: "Published", publishAt: "Sep 24, 2026 · 9:00 AM", createdBy: "Morgan Lee", updatedBy: "Morgan Lee", updatedAt: "Today · 9:00 AM" },
  { id: 2, title: "October office-hours calendar", summary: "New finance, growth, legal, and fundraising office-hour sessions.", audience: "All alumni", status: "Scheduled", publishAt: "Sep 28, 2026 · 10:00 AM", createdBy: "Morgan Lee", updatedBy: "Morgan Lee", updatedAt: "Today · 8:14 AM" },
  { id: 3, title: "Cincinnati founder showcase nominations", summary: "Nominate a founder to share their progress at the regional showcase.", audience: "Cincinnati cohorts", status: "Scheduled", publishAt: "Oct 1, 2026 · 11:30 AM", createdBy: "Dari Daniels", updatedBy: "Dari Daniels", updatedAt: "Yesterday · 4:22 PM" },
  { id: 4, title: "Complete your Q3 company update", summary: "A reminder to review current revenue, hiring, and fundraising metrics.", audience: "2024–2026 cohorts", status: "Draft", publishAt: "Not scheduled", createdBy: "Morgan Lee", updatedBy: "Morgan Lee", updatedAt: "Yesterday · 1:10 PM" },
  { id: 5, title: "September community digest", summary: "Founder milestones and program news from across the network.", audience: "All alumni", status: "Archived", publishAt: "Sep 3, 2026 · 9:00 AM", createdBy: "Kate deJesus", updatedBy: "Morgan Lee", updatedAt: "Sep 20 · 3:45 PM" },
];

const initialResources: AdminResource[] = [
  { id: 1, title: "Investor readiness checklist", description: "A practical pre-outreach checklist for founders preparing to raise.", category: "Fundraising & Investments", url: "https://www.lightship.foundation/bootcamp/", status: "Published", publishAt: "Sep 22, 2026 · 9:00 AM", createdBy: "Morgan Lee", updatedBy: "Morgan Lee", updatedAt: "Sep 22 · 9:00 AM" },
  { id: 2, title: "The Founder Dispatch — October", description: "The next monthly roundup of opportunities, events, and founder wins.", category: "Newsletters", url: "https://www.lightship.foundation/blog/", status: "Scheduled", publishAt: "Oct 2, 2026 · 8:30 AM", createdBy: "Kate deJesus", updatedBy: "Kate deJesus", updatedAt: "Today · 10:05 AM" },
  { id: 3, title: "Build a financial model you can use", description: "A decision-focused financial modeling guide for early-stage companies.", category: "Articles", url: "https://www.lightship.foundation/bootcamp/", status: "Published", publishAt: "Sep 12, 2026 · 12:00 PM", createdBy: "Morgan Lee", updatedBy: "Morgan Lee", updatedAt: "Sep 12 · 12:00 PM" },
  { id: 4, title: "2027 non-dilutive funding map", description: "An upcoming guide to national and Ohio-based grant opportunities.", category: "Fundraising & Investments", url: "", status: "Draft", publishAt: "Not scheduled", createdBy: "Morgan Lee", updatedBy: "Morgan Lee", updatedAt: "Yesterday · 2:40 PM" },
  { id: 5, title: "Customer discovery interview guide", description: "Questions and synthesis prompts for stronger customer conversations.", category: "Articles", url: "https://www.lightship.foundation/blog/", status: "Scheduled", publishAt: "Oct 7, 2026 · 9:00 AM", createdBy: "Morgan Lee", updatedBy: "Morgan Lee", updatedAt: "Sep 23 · 4:15 PM" },
];

const initialRequests: AdminRequest[] = [
  { id: 1, founderName: "Maya Thompson", company: "Cirrus Health", topic: "Fundraising", message: "I would like feedback on our seed-round milestones and investor narrative.", format: "Video call", preferredDate: "Oct 2, 2026", status: "New", submittedAt: "Today · 8:42 AM", followUpAt: "", lastActionBy: "Maya Thompson", lastActionAt: "Today · 8:42 AM" },
  { id: 2, founderName: "Andre Williams", company: "CivicGrid", topic: "Growth strategy", message: "We are evaluating two new municipal markets and need help prioritizing.", format: "Video call", preferredDate: "Oct 5, 2026", status: "New", submittedAt: "Yesterday · 4:18 PM", followUpAt: "", lastActionBy: "Andre Williams", lastActionAt: "Yesterday · 4:18 PM" },
  { id: 3, founderName: "Leah Brooks", company: "Rooted Goods", topic: "Warm introduction", message: "An introduction to a regional grocery buyer would be helpful.", format: "Email response", preferredDate: "Flexible", status: "Viewed", submittedAt: "Sep 23 · 11:05 AM", followUpAt: "", lastActionBy: "Morgan Lee", lastActionAt: "Sep 23 · 1:30 PM" },
  { id: 4, founderName: "Jordan Ellis", company: "Northstar Labs", topic: "Hiring & team", message: "I need guidance on structuring our first senior engineering hire.", format: "Video call", preferredDate: "Oct 8, 2026", status: "Scheduled", submittedAt: "Sep 22 · 3:16 PM", followUpAt: "Oct 8, 2026 · 2:00 PM", lastActionBy: "Morgan Lee", lastActionAt: "Sep 23 · 9:12 AM" },
  { id: 5, founderName: "Aisha Patel", company: "Morrow Finance", topic: "Legal & operations", message: "We need to pressure-test our compliance roadmap before launch.", format: "Phone call", preferredDate: "Oct 3, 2026", status: "New", submittedAt: "Sep 22 · 9:25 AM", followUpAt: "", lastActionBy: "Aisha Patel", lastActionAt: "Sep 22 · 9:25 AM" },
];

const initialActivity: AdminActivity[] = [
  { id: 1, action: "Scheduled announcement", detail: "October office-hours calendar", actor: "Morgan Lee", timestamp: "Today · 8:14 AM" },
  { id: 2, action: "Published resource", detail: "Investor readiness checklist", actor: "Morgan Lee", timestamp: "Sep 22 · 9:00 AM" },
  { id: 3, action: "Scheduled request", detail: "Jordan Ellis · Hiring & team", actor: "Morgan Lee", timestamp: "Sep 23 · 9:12 AM" },
  { id: 4, action: "Updated announcement", detail: "Cincinnati founder showcase nominations", actor: "Dari Daniels", timestamp: "Yesterday · 4:22 PM" },
];

type AnnouncementInput = Pick<AdminAnnouncement, "title" | "summary" | "audience" | "status" | "publishAt">;
type ResourceInput = Pick<AdminResource, "title" | "description" | "category" | "url" | "status" | "publishAt">;

type AdminContextValue = {
  admin: typeof adminUser;
  announcements: AdminAnnouncement[];
  resources: AdminResource[];
  requests: AdminRequest[];
  activity: AdminActivity[];
  createAnnouncement: (input: AnnouncementInput) => void;
  archiveAnnouncement: (id: number) => void;
  createResource: (input: ResourceInput) => void;
  archiveResource: (id: number) => void;
  markRequestViewed: (id: number) => void;
  scheduleRequest: (id: number, date: string) => void;
};

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [resources, setResources] = useState(initialResources);
  const [requests, setRequests] = useState(initialRequests);
  const [activity, setActivity] = useState(initialActivity);

  const log = (action: string, detail: string) => {
    setActivity(current => [{ id: Date.now(), action, detail, actor: adminUser.name, timestamp: "Just now" }, ...current]);
  };

  const value = useMemo<AdminContextValue>(() => ({
    admin: adminUser,
    announcements,
    resources,
    requests,
    activity,
    createAnnouncement: input => {
      setAnnouncements(current => [{ id: Date.now(), ...input, createdBy: adminUser.name, updatedBy: adminUser.name, updatedAt: "Just now" }, ...current]);
      log(input.status === "Scheduled" ? "Scheduled announcement" : "Created announcement", input.title);
    },
    archiveAnnouncement: id => {
      const item = announcements.find(announcement => announcement.id === id);
      setAnnouncements(current => current.map(announcement => announcement.id === id ? { ...announcement, status: "Archived", updatedBy: adminUser.name, updatedAt: "Just now" } : announcement));
      if (item) log("Archived announcement", item.title);
    },
    createResource: input => {
      setResources(current => [{ id: Date.now(), ...input, createdBy: adminUser.name, updatedBy: adminUser.name, updatedAt: "Just now" }, ...current]);
      log(input.status === "Scheduled" ? "Scheduled resource" : "Created resource", input.title);
    },
    archiveResource: id => {
      const item = resources.find(resource => resource.id === id);
      setResources(current => current.map(resource => resource.id === id ? { ...resource, status: "Archived", updatedBy: adminUser.name, updatedAt: "Just now" } : resource));
      if (item) log("Archived resource", item.title);
    },
    markRequestViewed: id => {
      const item = requests.find(request => request.id === id);
      setRequests(current => current.map(request => request.id === id ? { ...request, status: "Viewed", lastActionBy: adminUser.name, lastActionAt: "Just now" } : request));
      if (item) log("Marked request viewed", `${item.founderName} · ${item.topic}`);
    },
    scheduleRequest: (id, date) => {
      const item = requests.find(request => request.id === id);
      setRequests(current => current.map(request => request.id === id ? { ...request, status: "Scheduled", followUpAt: date, lastActionBy: adminUser.name, lastActionAt: "Just now" } : request));
      if (item) log("Scheduled request", `${item.founderName} · ${item.topic}`);
    },
  }), [activity, announcements, requests, resources]);

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
}
