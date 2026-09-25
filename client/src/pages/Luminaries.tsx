import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { luminaries } from "@/data/alumni";
import { ArrowUpRight, Linkedin, MapPin, Search, SlidersHorizontal, Sparkles, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation } from "wouter";

const industries = ["All industries", ...Array.from(new Set(luminaries.map(item => item.industry)))];

export default function Luminaries() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("All industries");
  const results = useMemo(() => luminaries.filter(person => (industry === "All industries" || person.industry === industry) && `${person.name} ${person.company} ${person.title} ${person.location}`.toLowerCase().includes(query.toLowerCase())), [query, industry]);

  return (
    <div className="mx-auto max-w-[1320px] animate-page-in">
      <section className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="relative overflow-hidden rounded-[28px] bg-[#243B6B] p-7 text-white sm:p-9">
          <div className="absolute -right-16 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border-[46px] border-[#DE3038]/90" />
          <div className="relative z-10 max-w-xl"><div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FDE9A4] text-[#243B6B]"><Sparkles className="h-5 w-5" /></div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FDE9A4]">The alumni network</p><h1 className="mt-3 font-display text-4xl leading-tight tracking-tight sm:text-5xl">Meet the luminaries.</h1><p className="mt-4 text-sm leading-7 text-white/65">Discover founders building across Ohio and beyond. Find a peer, start a conversation, and build together.</p></div>
        </div>
        <div className="flex flex-col justify-between rounded-[28px] bg-[#FDE9A4] p-7 text-[#243B6B]"><div><UsersRound className="h-7 w-7 text-[#DE3038]" /><p className="mt-6 font-display text-5xl">450<span className="text-2xl">+</span></p><p className="mt-1 text-sm font-bold">Bootcamp graduates</p></div><p className="mt-8 text-xs leading-5 text-[#243B6B]/60">A growing community of entrepreneurs creating companies, jobs, and long-term impact.</p></div>
      </section>

      <section className="mt-6 flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(34,55,96,0.06)] md:flex-row md:items-center">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8F949D]" /><Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by founder, company, or city" className="h-11 rounded-xl border-[#243B6B]/10 bg-[#F7F5EF] pl-10 shadow-none" /></div>
        <div className="flex items-center gap-2"><SlidersHorizontal className="hidden h-4 w-4 text-[#7C8491] md:block" /><select value={industry} onChange={e => setIndustry(e.target.value)} className="h-11 w-full rounded-xl border border-[#243B6B]/10 bg-[#F7F5EF] px-4 text-sm font-semibold text-[#3E4B62] outline-none md:w-56">{industries.map(item => <option key={item}>{item}</option>)}</select></div>
      </section>

      <div className="mt-6 flex items-center justify-between"><p className="text-sm font-bold text-[#243B6B]">{results.length} alumni</p><p className="text-xs text-[#8B9099]">Showing community profiles</p></div>
      <section className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {results.map(person => (
          <article key={person.id} className="group overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(34,55,96,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(34,55,96,0.1)]">
            <div className="relative h-24 bg-[#243B6B]"><div className="absolute inset-0 opacity-15 [background-image:radial-gradient(#FDE9A4_1px,transparent_1px)] [background-size:18px_18px]" /><span className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/70">{person.cohort}</span></div>
            <div className="relative px-6 pb-6">
              <Avatar className="-mt-10 h-20 w-20 border-4 border-white shadow-sm"><AvatarFallback className="text-lg font-black text-[#243B6B]" style={{ backgroundColor: person.accent }}>{person.initials}</AvatarFallback></Avatar>
              <div className="mt-4"><h2 className="text-lg font-bold text-[#243B6B]">{person.name}</h2><p className="mt-1 text-sm font-semibold text-[#DE3038]">{person.title}</p><p className="mt-1 text-sm text-[#606978]">{person.company}</p></div>
              <div className="mt-5 flex items-center justify-between border-t border-[#243B6B]/8 pt-4"><div><p className="text-[10px] font-bold uppercase tracking-wider text-[#9A9EA6]">{person.industry}</p><p className="mt-1 flex items-center gap-1 text-xs text-[#747C89]"><MapPin className="h-3 w-3" />{person.location}</p></div><a href={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(person.name)}`} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-xl bg-[#EEF2F8] text-[#2E477D] transition-colors hover:bg-[#2E477D] hover:text-white" aria-label={`Find ${person.name} on LinkedIn`}><Linkedin className="h-[18px] w-[18px]" /></a></div>
            </div>
          </article>
        ))}
      </section>

      {results.length === 0 && <div className="mt-5 rounded-2xl bg-white py-16 text-center"><UsersRound className="mx-auto h-8 w-8 text-[#B0B4BC]" /><h3 className="mt-4 font-bold text-[#243B6B]">No alumni found</h3><p className="mt-1 text-sm text-[#808691]">Try adjusting your search or industry filter.</p></div>}

      <section className="mt-7 flex flex-col items-start gap-5 rounded-2xl border border-[#243B6B]/8 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#DE3038]">Need an introduction?</p><h3 className="mt-2 font-display text-2xl text-[#243B6B]">We can help make the connection.</h3><p className="mt-1 text-sm text-[#737B88]">Share who you’d like to meet and what you hope to discuss.</p></div><Button onClick={() => setLocation("/contact")} className="rounded-xl bg-[#243B6B] px-5 font-bold text-white">Request an introduction <ArrowUpRight className="ml-2 h-4 w-4" /></Button></section>
    </div>
  );
}
