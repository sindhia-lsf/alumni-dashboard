import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { lightshipUpdates } from "@/data/alumni";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BellRing,
  CalendarDays,
  Check,
  CircleDollarSign,
  Megaphone,
  Pin,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

const filters = ["All", "Announcement", "Opportunity", "Event", "Action required", "Community"] as const;

const categoryStyles: Record<string, string> = {
  Announcement: "bg-[#EEF2F8] text-[#243B6B]",
  Opportunity: "bg-[#FDE9A4]/70 text-[#6A5410]",
  Event: "bg-[#E7F2EF] text-[#2E655B]",
  "Action required": "bg-[#FBE8E9] text-[#B2252D]",
  Community: "bg-[#F0EAF8] text-[#685181]",
};

const categoryIcons: Record<string, typeof BellRing> = {
  Announcement: Megaphone,
  Opportunity: CircleDollarSign,
  Event: CalendarDays,
  "Action required": UserRoundCheck,
  Community: Sparkles,
};

export default function Updates() {
  const [, setLocation] = useLocation();
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [readIds, setReadIds] = useState<number[]>(lightshipUpdates.filter(update => !update.unread).map(update => update.id));
  const visibleUpdates = useMemo(() => lightshipUpdates.filter(update => activeFilter === "All" || update.category === activeFilter), [activeFilter]);
  const unreadCount = lightshipUpdates.filter(update => !readIds.includes(update.id)).length;

  const markAllRead = () => {
    setReadIds(lightshipUpdates.map(update => update.id));
    toast.success("All updates marked as read.");
  };

  const openUpdate = (id: number, category: string) => {
    setReadIds(current => current.includes(id) ? current : [...current, id]);
    if (category === "Action required") setLocation("/profile");
    else if (category === "Event") setLocation("/contact");
    else toast.success("Update marked as read.");
  };

  return (
    <div className="mx-auto max-w-[1220px] animate-page-in">
      <section className="relative overflow-hidden rounded-[28px] bg-[#243B6B] p-7 text-white sm:p-9">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[52px] border-[#DE3038]/90" />
        <div className="absolute bottom-0 right-36 h-20 w-20 rounded-t-full bg-[#FDE9A4]/90" />
        <div className="relative z-10 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#FDE9A4] text-[#243B6B]"><BellRing className="h-6 w-6" /></div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FDE9A4]">From Lightship</p>
            <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight sm:text-5xl">Updates that keep<br />you connected.</h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/65">Announcements, program news, events, and actions from the Lightship team—all in one place.</p>
          </div>
          <div className="w-full rounded-2xl border border-white/10 bg-white/[0.07] p-5 sm:w-56">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">Unread updates</p>
            <div className="mt-3 flex items-end justify-between"><p className="font-display text-5xl text-[#FDE9A4]">{unreadCount}</p><span className="mb-1 text-xs text-white/50">of {lightshipUpdates.length}</span></div>
            <button onClick={markAllRead} disabled={unreadCount === 0} className="mt-4 flex items-center gap-2 text-xs font-bold text-white disabled:text-white/30"><Check className="h-4 w-4" /> Mark all as read</button>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl bg-white p-3 shadow-[0_8px_30px_rgba(34,55,96,0.06)]">
        <div className="flex flex-wrap gap-1">
          {filters.map(filter => (
            <button key={filter} onClick={() => setActiveFilter(filter)} className={cn("rounded-xl px-4 py-2.5 text-xs font-bold transition-colors", activeFilter === filter ? "bg-[#FDE9A4] text-[#243B6B]" : "text-[#737B88] hover:bg-[#F4F2EC] hover:text-[#243B6B]")}>{filter}</button>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-[1fr_300px]">
        <div className="space-y-3">
          {visibleUpdates.map(update => {
            const isRead = readIds.includes(update.id);
            const Icon = categoryIcons[update.category] ?? BellRing;
            return (
              <article key={update.id} className={cn("group relative rounded-2xl bg-white p-5 shadow-[0_7px_26px_rgba(34,55,96,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_13px_34px_rgba(34,55,96,0.09)] sm:p-6", !isRead && "border-l-4 border-l-[#DE3038]")}> 
                <div className="flex gap-4">
                  <div className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl", categoryStyles[update.category])}><Icon className="h-5 w-5" /></div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={cn("border-0 text-[9px] font-bold uppercase tracking-[0.12em]", categoryStyles[update.category])}>{update.category}</Badge>
                      {update.pinned && <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#8A8F98]"><Pin className="h-3 w-3" /> Pinned</span>}
                      {!isRead && <span className="h-2 w-2 rounded-full bg-[#DE3038]" aria-label="Unread" />}
                    </div>
                    <h2 className="mt-3 text-lg font-bold leading-snug text-[#243B6B]">{update.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-[#727A87]">{update.summary}</p>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#243B6B]/8 pt-4">
                      <span className="text-xs font-medium text-[#979BA3]">{update.date}</span>
                      <button onClick={() => openUpdate(update.id, update.category)} className="flex items-center gap-2 text-xs font-bold text-[#DE3038]">{update.action}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl bg-[#FDE9A4] p-6 text-[#243B6B]">
            <Megaphone className="h-6 w-6 text-[#DE3038]" />
            <h3 className="mt-5 font-display text-2xl">Updates are for timely news.</h3>
            <p className="mt-2 text-sm leading-6 text-[#243B6B]/65">Looking for guides, newsletters, and founder playbooks instead?</p>
            <Button onClick={() => setLocation("/resources")} className="mt-5 h-10 rounded-xl bg-[#243B6B] px-4 text-xs font-bold text-white">Browse resources</Button>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(34,55,96,0.05)]">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#DE3038]">Notification preferences</p>
            <h3 className="mt-2 text-base font-bold text-[#243B6B]">Stay in the loop</h3>
            <p className="mt-2 text-xs leading-5 text-[#7D838D]">You’re receiving important updates by email and in your dashboard.</p>
            <button onClick={() => toast.info("Notification preferences will be available in account settings.")} className="mt-4 text-xs font-bold text-[#243B6B]">Manage preferences</button>
          </div>
        </aside>
      </section>
    </div>
  );
}
