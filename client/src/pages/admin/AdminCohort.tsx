import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { founders } from "@/data/admin";
import { cn } from "@/lib/utils";
import { ArrowUpDown, BriefcaseBusiness, CircleDollarSign, Search, SlidersHorizontal, UserPlus, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation } from "wouter";

const cohorts = ["All cohorts", ...Array.from(new Set(founders.map(founder => founder.cohort)))] as const;
const industries = ["All industries", ...Array.from(new Set(founders.map(founder => founder.industry)))] as const;
const fundraisingOptions = ["All fundraising", "Actively raising", "Preparing to raise", "Exploring options", "Recently closed", "Not fundraising"] as const;

type SortOption = "Founder A–Z" | "Company A–Z" | "Newest cohort" | "Profile completion";

export default function AdminCohort() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const [cohort, setCohort] = useState<(typeof cohorts)[number]>("All cohorts");
  const [industry, setIndustry] = useState<(typeof industries)[number]>("All industries");
  const [fundraising, setFundraising] = useState<(typeof fundraisingOptions)[number]>("All fundraising");
  const [sort, setSort] = useState<SortOption>("Newest cohort");

  const visible = useMemo(() => founders.filter(founder => {
    const haystack = `${founder.firstName} ${founder.lastName} ${founder.company} ${founder.email}`.toLowerCase();
    return haystack.includes(query.toLowerCase())
      && (cohort === "All cohorts" || founder.cohort === cohort)
      && (industry === "All industries" || founder.industry === industry)
      && (fundraising === "All fundraising" || founder.fundraisingStatus === fundraising);
  }).sort((a, b) => {
    if (sort === "Founder A–Z") return `${a.lastName}${a.firstName}`.localeCompare(`${b.lastName}${b.firstName}`);
    if (sort === "Company A–Z") return a.company.localeCompare(b.company);
    if (sort === "Profile completion") return b.profileCompletion - a.profileCompletion;
    return b.cohortYear - a.cohortYear;
  }), [cohort, fundraising, industry, query, sort]);

  const resetFilters = () => {
    setQuery("");
    setCohort("All cohorts");
    setIndustry("All industries");
    setFundraising("All fundraising");
    setSort("Newest cohort");
  };

  const selectClass = "h-11 rounded-xl border border-[#243B6B]/10 bg-[#FBFAF7] px-3 text-xs font-bold text-[#4C5668] outline-none focus:border-[#243B6B]/30";

  return (
    <div className="mx-auto max-w-[1480px] animate-page-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#DE3038]">Alumni intelligence</p><h1 className="mt-2 font-display text-4xl tracking-tight text-[#243B6B] sm:text-5xl">Cohort directory</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[#737A86]">Search and segment the alumni network, then open a complete founder and company record.</p></div>
        <Button variant="outline" onClick={() => window.print()} className="rounded-xl border-[#243B6B]/12 bg-white text-xs font-bold text-[#243B6B]">Export current view</Button>
      </div>

      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total founders", value: founders.length, icon: UsersRound },
          { label: "2026 cohort members", value: founders.filter(founder => founder.cohortYear === 2026).length, icon: UserPlus },
          { label: "Actively fundraising", value: founders.filter(founder => ["Actively raising", "Preparing to raise"].includes(founder.fundraisingStatus)).length, icon: CircleDollarSign },
          { label: "Companies hiring", value: founders.filter(founder => founder.expectedEmployeesToHire > 0).length, icon: BriefcaseBusiness },
        ].map(metric => <article key={metric.label} className="rounded-2xl bg-white p-5 shadow-[0_8px_28px_rgba(34,55,96,0.05)]"><metric.icon className="h-5 w-5 text-[#DE3038]" /><p className="mt-4 font-display text-4xl text-[#243B6B]">{metric.value}</p><p className="mt-1 text-xs font-bold text-[#737A86]">{metric.label}</p></article>)}
      </section>

      <section className="mt-5 rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(34,55,96,0.055)]">
        <div className="grid gap-3 xl:grid-cols-[minmax(260px,1fr)_repeat(4,auto)_auto]">
          <div className="relative"><Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#969BA4]" /><Input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search founder, company, or email" className="h-11 rounded-xl border-[#243B6B]/10 bg-[#FBFAF7] pl-10" /></div>
          <select value={cohort} onChange={event => setCohort(event.target.value as (typeof cohorts)[number])} className={selectClass} aria-label="Filter by cohort">{cohorts.map(option => <option key={option}>{option}</option>)}</select>
          <select value={industry} onChange={event => setIndustry(event.target.value as (typeof industries)[number])} className={selectClass} aria-label="Filter by industry">{industries.map(option => <option key={option}>{option}</option>)}</select>
          <select value={fundraising} onChange={event => setFundraising(event.target.value as (typeof fundraisingOptions)[number])} className={selectClass} aria-label="Filter by fundraising status">{fundraisingOptions.map(option => <option key={option}>{option}</option>)}</select>
          <label className="relative"><ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A9099]" /><select value={sort} onChange={event => setSort(event.target.value as SortOption)} className={cn(selectClass, "pl-9")} aria-label="Sort founders"><option>Founder A–Z</option><option>Company A–Z</option><option>Newest cohort</option><option>Profile completion</option></select></label>
          <Button onClick={resetFilters} variant="ghost" className="h-11 rounded-xl text-xs font-bold text-[#6E7682]"><SlidersHorizontal className="mr-2 h-4 w-4" /> Reset</Button>
        </div>
        <p className="mt-3 px-1 text-[11px] font-semibold text-[#92979F]">Showing {visible.length} of {founders.length} founders</p>
      </section>

      <section className="mt-5 overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(34,55,96,0.055)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1250px] text-left">
            <thead className="bg-[#FBFAF7] text-[10px] font-bold uppercase tracking-[0.11em] text-[#858B95]"><tr><th className="px-5 py-4">Founder & company</th><th className="px-4 py-4">Cohort</th><th className="px-4 py-4">Industry</th><th className="px-4 py-4">Stage</th><th className="px-4 py-4">Employees</th><th className="px-4 py-4">2025 revenue</th><th className="px-4 py-4">2026 projected</th><th className="px-4 py-4">Fundraising</th><th className="px-4 py-4">Profile</th><th className="sticky right-0 bg-[#FBFAF7] px-5 py-4 text-right shadow-[-8px_0_14px_rgba(34,55,96,0.035)]">Action</th></tr></thead>
            <tbody className="divide-y divide-[#243B6B]/8">
              {visible.map(founder => <tr key={founder.id} className="group transition-colors hover:bg-[#FBFAF7]">
                <td className="px-5 py-4"><div className="flex items-center gap-3"><Avatar className="h-10 w-10"><AvatarFallback className="bg-[#FDE9A4] text-[10px] font-bold text-[#243B6B]">{founder.firstName[0]}{founder.lastName[0]}</AvatarFallback></Avatar><div><p className="text-sm font-bold text-[#243B6B]">{founder.firstName} {founder.lastName}</p><p className="mt-0.5 text-xs text-[#858B95]">{founder.company}</p></div></div></td>
                <td className="px-4 py-4 text-xs font-semibold text-[#5F6877]">{founder.cohort}</td>
                <td className="px-4 py-4"><Badge className="border-0 bg-[#EEF2F8] text-[9px] font-bold text-[#243B6B]">{founder.industry}</Badge></td>
                <td className="px-4 py-4 text-xs text-[#5F6877]">{founder.stage}</td>
                <td className="px-4 py-4 text-xs font-bold text-[#34415A]">{founder.employeeCount}</td>
                <td className="px-4 py-4 text-xs font-bold text-[#34415A]">{founder.annualRevenue2025}</td>
                <td className="px-4 py-4 text-xs font-bold text-[#34415A]">{founder.projectedRevenue2026}</td>
                <td className="px-4 py-4 text-xs text-[#5F6877]">{founder.fundraisingStatus}</td>
                <td className="px-4 py-4"><div className="flex items-center gap-2"><div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#E9E7E1]"><div className="h-full rounded-full bg-[#DE3038]" style={{ width: `${founder.profileCompletion}%` }} /></div><span className="text-[10px] font-bold text-[#6A7280]">{founder.profileCompletion}%</span></div></td>
                <td className="sticky right-0 bg-white px-5 py-4 text-right shadow-[-8px_0_14px_rgba(34,55,96,0.035)] transition-colors group-hover:bg-[#FBFAF7]"><Button onClick={() => setLocation(`/admin/cohort/${founder.id}`)} variant="ghost" className="h-9 rounded-xl px-3 text-xs font-bold text-[#DE3038]">View profile</Button></td>
              </tr>)}
            </tbody>
          </table>
        </div>
        {visible.length === 0 && <div className="py-16 text-center"><UsersRound className="mx-auto h-8 w-8 text-[#A1A6AD]" /><p className="mt-3 text-sm font-bold text-[#243B6B]">No founders match these filters</p><button onClick={resetFilters} className="mt-2 text-xs font-bold text-[#DE3038]">Clear all filters</button></div>}
      </section>
    </div>
  );
}
