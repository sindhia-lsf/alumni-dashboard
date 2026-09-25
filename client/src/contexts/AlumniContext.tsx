import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AlumniProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  location: string;
  linkedIn: string;
  instagram: string;
  twitter: string;
  otherSocial: string;
  gender: string;
  raceEthnicity: string;
  lgbtqia: string;
  householdIncome: string;
  bio: string;
  companyName: string;
  companyUrl: string;
  headquartersAddress: string;
  headquartersCity: string;
  headquartersState: string;
  title: string;
  industry: string;
  stage: string;
  foundedYear: string;
  employeeCount: string;
  annualRevenue2025: string;
  ytdRevenue2026: string;
  projectedRevenue2026: string;
  currentValuation: string;
  employeesHired2026: string;
  expectedEmployeesToHire: string;
  fundingRaised: string;
  fundraisingStatus: string;
  cohortCity: string;
  cohortYear: string;
  goals: string;
  supportAreas: string;
  otherCompanies: Array<{
    id: string;
    name: string;
    website: string;
  }>;
};

const defaultProfile: AlumniProfile = {
  firstName: "Alex",
  lastName: "Morgan",
  email: "alex@northstarworks.co",
  phone: "(513) 555-0198",
  age: "34",
  location: "Cincinnati, OH",
  linkedIn: "linkedin.com/in/alexmorgan",
  instagram: "instagram.com/alexbuilds",
  twitter: "x.com/alexbuilds",
  otherSocial: "",
  gender: "Prefer not to say",
  raceEthnicity: "Prefer not to say",
  lgbtqia: "Prefer not to say",
  householdIncome: "Prefer not to say",
  bio: "Building practical tools that help neighborhood businesses grow with confidence.",
  companyName: "Northstar Works",
  companyUrl: "northstarworks.co",
  headquartersAddress: "1238 Main Street",
  headquartersCity: "Cincinnati",
  headquartersState: "Ohio",
  title: "Founder & CEO",
  industry: "Technology",
  stage: "Early revenue",
  foundedYear: "2022",
  employeeCount: "6–10",
  annualRevenue2025: "$425,000",
  ytdRevenue2026: "$380,000",
  projectedRevenue2026: "$750,000",
  currentValuation: "$3,500,000",
  employeesHired2026: "4",
  expectedEmployeesToHire: "6",
  fundingRaised: "$150K",
  fundraisingStatus: "Preparing to raise",
  cohortCity: "Cincinnati",
  cohortYear: "2024",
  goals: "Grow recurring revenue and prepare for a seed round.",
  supportAreas: "Fundraising, customer acquisition, hiring",
  otherCompanies: [
    { id: "company-1", name: "Bridgeway Labs", website: "bridgewaylabs.com" },
  ],
};

type AlumniContextValue = {
  profile: AlumniProfile;
  signedIn: boolean;
  login: () => void;
  logout: () => void;
  updateProfile: (updates: Partial<AlumniProfile>) => void;
};

const AlumniContext = createContext<AlumniContextValue | null>(null);

function getSavedProfile() {
  if (typeof window === "undefined") return defaultProfile;
  try {
    const saved = window.localStorage.getItem("lightship-alumni-profile");
    if (!saved) return defaultProfile;
    const parsed = JSON.parse(saved);
    return {
      ...defaultProfile,
      ...parsed,
      annualRevenue2025: parsed.annualRevenue2025 ?? parsed.annualRevenue ?? defaultProfile.annualRevenue2025,
    };
  } catch {
    return defaultProfile;
  }
}

export function AlumniProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<AlumniProfile>(getSavedProfile);
  const [signedIn, setSignedIn] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("lightship-alumni-session") === "active";
  });

  useEffect(() => {
    window.localStorage.setItem("lightship-alumni-profile", JSON.stringify(profile));
  }, [profile]);

  const value = useMemo<AlumniContextValue>(
    () => ({
      profile,
      signedIn,
      login: () => {
        setSignedIn(true);
        window.localStorage.setItem("lightship-alumni-session", "active");
      },
      logout: () => {
        setSignedIn(false);
        window.localStorage.removeItem("lightship-alumni-session");
      },
      updateProfile: updates => setProfile(current => ({ ...current, ...updates })),
    }),
    [profile, signedIn],
  );

  return <AlumniContext.Provider value={value}>{children}</AlumniContext.Provider>;
}

export function useAlumni() {
  const context = useContext(AlumniContext);
  if (!context) throw new Error("useAlumni must be used within AlumniProvider");
  return context;
}
