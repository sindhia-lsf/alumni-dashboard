import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/contexts/AdminContext";
import { founders } from "@/data/admin";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BellRing,
  BookOpenText,
  CalendarClock,
  Check,
  ClipboardList,
  Clock3,
  Megaphone,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";

export default function AdminHome() {
  const [, setLocation] = useLocation();
  const { admin, announcements, resources, requests, activity, markRequestViewed } = useAdmin();
  const newRequests = requests.filter(request => request.status === "New");
  const scheduledAnnouncements = announcements.filter(item => item.status === "Scheduled");
  const scheduledResources = resources.filter(item => item.status === "Scheduled");
  const newFounderIds = [1, 2, 5, 8, 10];
  const newFounders = founders.filter(founder => newFounderIds.includes(founder.id));

  const metrics = [
    { label: "New founders this week", value: newFounders.length, note: "+2 from last week", icon: UserPlus, color: "bg-[#EAF3F0] text-[#2E6F63]" },
    { label: "New meeting requests", value: newRequests.length, note: `${requests.filter(request => request.status === "Scheduled").length} already scheduled`, icon: ClipboardList, color: "bg-[#FBE8E9] text-[#B2252D]" },
    { label: "Announcements scheduled", value: scheduledAnnouncements.length, note: "Next: Sep 28", icon: Megaphone, color: "bg-[#EEF2F8] text-[#243B6B]" },
    { label: "Resources scheduled", value: scheduledResources.length, note: "Next: Oct 2", icon: BookOpenText, color: "bg-[#FDE9A4]/70 text-[#745B0E]" },
  ];

  const acknowledge = (id: number, founderName: string) => {
    markRequestViewed(id);
    toast.success(`Request marked viewed by ${admin.name}.`, { description: `${founderName}'s request is now in progress.` });
  };

  return (
    <div className="mx-auto max-w-[1320px] animate-page-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#DE3038]">Team overview</p>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-[#243B6B] sm:text-5xl">Good morning, Morgan.</h1>
          <p className="mt-3 text-sm text-[#737A86]">Here’s what needs the Lightship team’s attention today.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setLocation("/admin/announcements")} variant="outline" className="rounded-xl border-[#243B6B]/12 bg-white text-xs font-bold text-[#243B6B]"><Megaphone className="mr-2 h-4 w-4" /> New announcement</Button>
          <Button onClick={() => setLocation("/admin/resources")} className="rounded-xl bg-[#243B6B] text-xs font-bold text-white"><BookOpenText className="mr-2 h-4 w-4" /> Add resource</Button>
        </div>
      </div>

      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(metric => (
          <article key={metric.label} className="rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(34,55,96,0.055)]">
            <div className="flex items-start justify-between gap-3"><div className={cn("grid h-11 w-11 place-items-center rounded-xl", metric.color)}><metric.icon className="h-5 w-5" /></div><span className="rounded-full bg-[#F4F2EC] px-2.5 py-1 text-[10px] font-bold text-[#777E88]">Live</span></div>
            <p className="mt-5 font-display text-4xl text-[#243B6B]">{metric.value}</p>
            <p className="mt-1 text-sm font-bold text-[#34415A]">{metric.label}</p>
            <p className="mt-2 text-xs text-[#90959D]">{metric.note}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(34,55,96,0.055)] sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#DE3038]">Needs attention</p><h2 className="mt-2 text-xl font-bold text-[#243B6B]">New founder requests</h2></div>
            <Button onClick={() => setLocation("/admin/requests")} variant="ghost" className="text-xs font-bold text-[#243B6B]">View all <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
          <div className="mt-5 space-y-3">
            {newRequests.slice(0, 3).map(request => (
              <article key={request.id} className="rounded-2xl border border-[#243B6B]/8 bg-[#FBFAF7] p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Avatar className="h-11 w-11"><AvatarFallback className="bg-[#FDE9A4] text-xs font-bold text-[#243B6B]">{request.founderName.split(" ").map(part => part[0]).join("")}</AvatarFallback></Avatar>
                  <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="font-bold text-[#243B6B]">{request.founderName}</p><Badge className="border-0 bg-[#FBE8E9] text-[9px] font-bold uppercase text-[#B2252D]">New</Badge></div><p className="mt-1 text-xs text-[#747C88]">{request.company} · {request.topic}</p><p className="mt-2 line-clamp-1 text-xs text-[#969AA2]">{request.message}</p></div>
                  <div className="flex shrink-0 gap-2"><Button onClick={() => acknowledge(request.id, request.founderName)} variant="outline" className="h-9 rounded-xl border-[#243B6B]/10 bg-white px-3 text-xs font-bold text-[#243B6B]"><Check className="mr-1.5 h-3.5 w-3.5" /> Mark viewed</Button><Button onClick={() => setLocation("/admin/requests")} className="h-9 rounded-xl bg-[#243B6B] px-3 text-xs font-bold text-white">Schedule</Button></div>
                </div>
              </article>
            ))}
            {newRequests.length === 0 && <div className="rounded-2xl border border-dashed border-[#243B6B]/15 py-10 text-center"><Check className="mx-auto h-7 w-7 text-[#5F8B82]" /><p className="mt-3 text-sm font-bold text-[#243B6B]">All caught up</p><p className="mt-1 text-xs text-[#8B919A]">There are no new meeting requests.</p></div>}
          </div>
        </div>

        <div className="rounded-2xl bg-[#243B6B] p-6 text-white shadow-[0_10px_34px_rgba(34,55,96,0.16)]">
          <div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#FDE9A4]">Publishing queue</p><h2 className="mt-2 font-display text-3xl">Scheduled next</h2></div><CalendarClock className="h-6 w-6 text-[#FDE9A4]" /></div>
          <div className="mt-6 space-y-3">
            {[...scheduledAnnouncements.map(item => ({ ...item, kind: "Announcement", icon: Megaphone })), ...scheduledResources.map(item => ({ ...item, kind: "Resource", icon: BookOpenText }))].slice(0, 4).map(item => (
              <article key={`${item.kind}-${item.id}`} className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                <div className="flex gap-3"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#FDE9A4] text-[#243B6B]"><item.icon className="h-4 w-4" /></div><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.13em] text-white/45">{item.kind}</p><p className="mt-1 truncate text-sm font-bold">{item.title}</p><p className="mt-2 flex items-center gap-1.5 text-[11px] text-white/55"><Clock3 className="h-3 w-3" /> {item.publishAt}</p></div></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl bg-[#FDE9A4] p-6 text-[#243B6B]">
          <Sparkles className="h-6 w-6 text-[#DE3038]" /><h2 className="mt-4 font-display text-3xl">{newFounders.length} founders joined this week.</h2><p className="mt-2 text-sm leading-6 text-[#243B6B]/65">Review profile completeness and welcome the newest members into the network.</p>
          <div className="mt-5 flex -space-x-2">{newFounders.map(founder => <Avatar key={founder.id} className="h-9 w-9 border-2 border-[#FDE9A4]"><AvatarFallback className="bg-white text-[10px] font-bold text-[#243B6B]">{founder.firstName[0]}{founder.lastName[0]}</AvatarFallback></Avatar>)}</div>
          <Button onClick={() => setLocation("/admin/cohort")} className="mt-5 h-10 rounded-xl bg-[#243B6B] px-4 text-xs font-bold text-white">Review cohort <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(34,55,96,0.055)]">
          <div className="flex items-center gap-2"><BellRing className="h-5 w-5 text-[#DE3038]" /><h2 className="text-lg font-bold text-[#243B6B]">Recent admin activity</h2></div>
          <div className="mt-5 divide-y divide-[#243B6B]/8">{activity.slice(0, 5).map(entry => <div key={entry.id} className="flex gap-3 py-3 first:pt-0"><div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#DE3038]" /><div className="min-w-0 flex-1"><p className="text-sm text-[#39465D]"><span className="font-bold">{entry.actor}</span> {entry.action.toLowerCase()}</p><p className="mt-1 truncate text-xs text-[#858B95]">{entry.detail}</p></div><span className="shrink-0 text-[10px] text-[#A0A4AA]">{entry.timestamp}</span></div>)}</div>
        </div>
      </section>
    </div>
  );
}
