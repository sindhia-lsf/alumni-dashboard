import { Button } from "@/components/ui/button";
import { useAlumni } from "@/contexts/AlumniContext";
import { announcements, upcomingEvents } from "@/data/alumni";
import {
  ArrowRight,
  BookOpenText,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Megaphone,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();
  const { profile } = useAlumni();
  const firstName = profile.firstName || "Founder";

  return (
    <div className="mx-auto max-w-[1440px] animate-page-in space-y-7">
      <section className="grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
        <div className="relative overflow-hidden rounded-[28px] bg-[#243B6B] p-7 text-white shadow-[0_18px_50px_rgba(31,53,99,0.14)] sm:p-9 lg:p-10">
          <div className="absolute -right-14 -top-20 h-72 w-72 rounded-full border-[56px] border-[#DE3038]/90" />
          <div className="absolute bottom-0 right-24 h-24 w-24 rounded-t-full bg-[#FDE9A4]/90" />
          <div className="relative z-10 max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-3 py-1.5 text-xs font-semibold text-white/70"><span className="h-2 w-2 rounded-full bg-[#FDE9A4]" /> {profile.cohortCity} · Class of {profile.cohortYear}</div>
            <h1 className="font-display text-4xl leading-[1.02] tracking-[-0.03em] sm:text-5xl">Good morning, {firstName}.</h1>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-white/65">Here’s what’s happening across Lightship—and a few ways to keep moving {profile.companyName} forward.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => setLocation("/luminaries")} className="h-11 rounded-xl bg-[#FDE9A4] px-5 font-bold text-[#243B6B] hover:bg-[#FFEFB8]">Explore the community <ArrowRight className="ml-2 h-4 w-4" /></Button>
              <Button onClick={() => setLocation("/contact")} variant="outline" className="h-11 rounded-xl border-white/20 bg-white/[0.04] px-5 font-bold text-white hover:bg-white/10 hover:text-white">Book office hours</Button>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] bg-[#FDE9A4] p-7 text-[#243B6B] sm:p-8">
          <div className="flex items-center justify-between">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70"><TrendingUp className="h-5 w-5" /></div>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#243B6B]/50">Profile strength</span>
          </div>
          <p className="mt-7 font-display text-5xl">82<span className="text-2xl">%</span></p>
          <p className="mt-2 text-sm leading-6 text-[#243B6B]/70">A complete profile helps the right founders and opportunities find you.</p>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/60"><div className="h-full w-[82%] rounded-full bg-[#DE3038]" /></div>
          <button onClick={() => setLocation("/profile")} className="mt-6 flex items-center gap-2 text-sm font-bold hover:gap-3">Complete your profile <ArrowRight className="h-4 w-4 transition-all" /></button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div>
            <SectionTitle eyebrow="From Lightship" title="Announcements" icon={Megaphone} />
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {announcements.map(item => (
                <article key={item.id} className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(34,55,96,0.06)] transition-transform duration-200 hover:-translate-y-0.5">
                  <div className={`absolute inset-y-0 left-0 w-1 ${item.accent === "red" ? "bg-[#DE3038]" : "bg-[#F3D25B]"}`} />
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#F4F2EC] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#59657A]">{item.tag}</span>
                    <span className="text-xs font-semibold text-[#9297A0]">{item.date}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold leading-snug text-[#243B6B]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6D7481]">{item.body}</p>
                  <button onClick={() => setLocation("/updates")} className="mt-5 flex items-center gap-2 text-xs font-bold text-[#DE3038]">View details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></button>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(34,55,96,0.06)] sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <SectionTitle eyebrow="Your business" title={profile.companyName} icon={Building2} compact />
              <Button onClick={() => setLocation("/profile")} variant="outline" className="h-9 rounded-lg border-[#243B6B]/12 bg-[#F9F8F4] text-xs font-bold text-[#243B6B]">Update details</Button>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Snapshot icon={CircleDollarSign} label="2025 revenue" value={profile.annualRevenue2025} />
              <Snapshot icon={UsersRound} label="Team size" value={`${profile.employeeCount} people`} />
              <Snapshot icon={TrendingUp} label="Company stage" value={profile.stage} />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(34,55,96,0.06)] sm:p-7">
            <div className="flex items-center justify-between">
              <SectionTitle eyebrow="Curated for you" title="Founder resources" icon={BookOpenText} compact />
              <button onClick={() => setLocation("/resources")} className="text-xs font-bold text-[#DE3038]">View library</button>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                ["01", "Investor readiness checklist", "Fundraising"],
                ["02", "A financial model you can use", "Finance"],
                ["03", "AI tools that save founders time", "Operations"],
              ].map(resource => (
                <button key={resource[0]} onClick={() => setLocation("/resources")} className="group rounded-xl border border-[#243B6B]/8 bg-[#F9F8F4] p-4 text-left transition-colors hover:border-[#243B6B]/18 hover:bg-[#FDE9A4]/25">
                  <div className="flex items-center justify-between"><span className="text-[10px] font-black tracking-wider text-[#DE3038]">{resource[0]}</span><ArrowRight className="h-4 w-4 text-[#8C929B] transition-transform group-hover:translate-x-1" /></div>
                  <p className="mt-7 text-sm font-bold leading-5 text-[#243B6B]">{resource[1]}</p><p className="mt-2 text-xs text-[#858B94]">{resource[2]} · 10 min</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(34,55,96,0.06)]">
            <SectionTitle eyebrow="On the calendar" title="Coming up" icon={CalendarDays} compact />
            <div className="mt-5 divide-y divide-[#243B6B]/8">
              {upcomingEvents.map(event => (
                <div key={event.title} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-[#F4F2EC] text-center"><div><p className="text-lg font-black leading-none text-[#243B6B]">{event.day}</p><p className="mt-1 text-[9px] font-black tracking-wider text-[#DE3038]">{event.month}</p></div></div>
                  <div className="min-w-0"><p className="text-sm font-bold leading-5 text-[#2A3954]">{event.title}</p><p className="mt-1 text-xs leading-5 text-[#888E98]">{event.meta}</p></div>
                </div>
              ))}
            </div>
            <Button onClick={() => setLocation("/contact")} className="mt-6 h-10 w-full rounded-xl bg-[#243B6B] text-xs font-bold text-white hover:bg-[#1D315D]">Request time with us</Button>
          </div>

          <div className="rounded-2xl bg-[#DE3038] p-6 text-white shadow-[0_10px_30px_rgba(222,48,56,0.16)]">
            <CheckCircle2 className="h-7 w-7 text-[#FDE9A4]" />
            <h3 className="mt-5 font-display text-2xl">One clear next step.</h3>
            <p className="mt-2 text-sm leading-6 text-white/72">What is the single highest-leverage move you can make for your company this week?</p>
            <button onClick={() => setLocation("/contact")} className="mt-5 flex items-center gap-2 text-xs font-bold text-[#FDE9A4]">Talk it through with us <ArrowRight className="h-4 w-4" /></button>
          </div>
        </aside>
      </section>
    </div>
  );
}

function SectionTitle({ eyebrow, title, icon: Icon, compact = false }: { eyebrow: string; title: string; icon: typeof Megaphone; compact?: boolean }) {
  return <div className="flex items-center gap-3"><div className={`${compact ? "h-9 w-9 rounded-xl" : "h-10 w-10 rounded-2xl"} grid shrink-0 place-items-center bg-[#FDE9A4] text-[#243B6B]`}><Icon className="h-[18px] w-[18px]" /></div><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#969AA2]">{eyebrow}</p><h2 className={`${compact ? "text-lg" : "text-xl"} mt-0.5 font-bold tracking-[-0.015em] text-[#243B6B]`}>{title}</h2></div></div>;
}

function Snapshot({ icon: Icon, label, value }: { icon: typeof Building2; label: string; value: string }) {
  return <div className="flex items-center gap-3 rounded-xl bg-[#F7F5EF] p-4"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-[#DE3038]"><Icon className="h-[17px] w-[17px]" /></div><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-wider text-[#969BA5]">{label}</p><p className="mt-1 truncate text-sm font-bold text-[#2B3B57]">{value}</p></div></div>;
}
