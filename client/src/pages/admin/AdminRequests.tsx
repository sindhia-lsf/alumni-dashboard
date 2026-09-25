import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdmin, type AdminRequest } from "@/contexts/AdminContext";
import { cn } from "@/lib/utils";
import { CalendarClock, Check, Clock3, Filter, Mail, MessageSquareText, Phone, Search, Video } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const statuses = ["All", "New", "Viewed", "Scheduled", "Closed"] as const;

const statusStyle: Record<string, string> = {
  New: "bg-[#FBE8E9] text-[#B2252D]",
  Viewed: "bg-[#EEF2F8] text-[#243B6B]",
  Scheduled: "bg-[#E7F2EF] text-[#2E655B]",
  Closed: "bg-[#EFEFEF] text-[#6F747B]",
};

export default function AdminRequests() {
  const { admin, requests, markRequestViewed, scheduleRequest } = useAdmin();
  const [filter, setFilter] = useState<(typeof statuses)[number]>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<AdminRequest | null>(null);
  const [scheduleAt, setScheduleAt] = useState("2026-10-05T13:00");

  const visible = useMemo(() => requests.filter(request => {
    const matchesFilter = filter === "All" || request.status === filter;
    const haystack = `${request.founderName} ${request.company} ${request.topic}`.toLowerCase();
    return matchesFilter && haystack.includes(query.toLowerCase());
  }), [filter, query, requests]);

  const markViewed = (request: AdminRequest) => {
    markRequestViewed(request.id);
    toast.success(`Marked viewed by ${admin.name}.`, { description: `${request.founderName} · ${request.topic}` });
  };

  const confirmSchedule = () => {
    if (!selected || !scheduleAt) return;
    const formatted = new Date(scheduleAt).toLocaleString([], { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
    scheduleRequest(selected.id, formatted);
    toast.success(`Scheduled by ${admin.name}.`, { description: `${selected.founderName} · ${formatted}` });
    setSelected(null);
  };

  return (
    <div className="mx-auto max-w-[1260px] animate-page-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#DE3038]">Founder support</p><h1 className="mt-2 font-display text-4xl tracking-tight text-[#243B6B] sm:text-5xl">Meeting requests</h1><p className="mt-3 text-sm text-[#737A86]">Review, acknowledge, and schedule every 1:1 request from the alumni network.</p></div>
        <div className="rounded-2xl bg-[#FDE9A4] px-5 py-3 text-[#243B6B]"><p className="text-[10px] font-bold uppercase tracking-[0.14em]">New requests</p><p className="mt-1 font-display text-3xl">{requests.filter(request => request.status === "New").length}</p></div>
      </div>

      <section className="mt-7 rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(34,55,96,0.055)]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm"><Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#969BA4]" /><Input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search founder, company, or topic" className="h-11 rounded-xl border-[#243B6B]/10 bg-[#FBFAF7] pl-10" /></div>
          <div className="flex flex-wrap items-center gap-1"><Filter className="mr-2 h-4 w-4 text-[#8A9099]" />{statuses.map(status => <button key={status} onClick={() => setFilter(status)} className={cn("rounded-xl px-3.5 py-2.5 text-xs font-bold transition-colors", filter === status ? "bg-[#243B6B] text-white" : "text-[#747B87] hover:bg-[#F4F2EC] hover:text-[#243B6B]")}>{status}</button>)}</div>
        </div>
      </section>

      <section className="mt-5 space-y-4">
        {visible.map(request => (
          <article key={request.id} className="rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(34,55,96,0.05)] sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
              <Avatar className="h-12 w-12"><AvatarFallback className="bg-[#FDE9A4] text-xs font-bold text-[#243B6B]">{request.founderName.split(" ").map(part => part[0]).join("")}</AvatarFallback></Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2"><h2 className="text-lg font-bold text-[#243B6B]">{request.founderName}</h2><Badge className={cn("border-0 text-[9px] font-bold uppercase tracking-[0.1em]", statusStyle[request.status])}>{request.status}</Badge></div>
                <p className="mt-1 text-xs font-semibold text-[#747C88]">{request.company} · {request.topic}</p>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-[#666F7D]">{request.message}</p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#8A9099]">
                  <span className="flex items-center gap-1.5">{request.format === "Video call" ? <Video className="h-3.5 w-3.5" /> : request.format === "Phone call" ? <Phone className="h-3.5 w-3.5" /> : <Mail className="h-3.5 w-3.5" />}{request.format}</span>
                  <span className="flex items-center gap-1.5"><CalendarClock className="h-3.5 w-3.5" /> Preferred: {request.preferredDate}</span>
                  <span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> Submitted {request.submittedAt}</span>
                </div>
                {request.followUpAt && <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#E7F2EF] px-3 py-2 text-xs font-bold text-[#2E655B]"><CalendarClock className="h-4 w-4" /> Scheduled for {request.followUpAt}</div>}
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#A0A4AA]">Last action by {request.lastActionBy} · {request.lastActionAt}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                {request.status === "New" && <Button onClick={() => markViewed(request)} variant="outline" className="h-10 rounded-xl border-[#243B6B]/10 bg-white text-xs font-bold text-[#243B6B]"><Check className="mr-2 h-4 w-4" /> Mark viewed</Button>}
                {request.status !== "Scheduled" && request.status !== "Closed" && <Button onClick={() => setSelected(request)} className="h-10 rounded-xl bg-[#243B6B] text-xs font-bold text-white"><CalendarClock className="mr-2 h-4 w-4" /> Schedule</Button>}
              </div>
            </div>
          </article>
        ))}
        {visible.length === 0 && <div className="rounded-2xl border border-dashed border-[#243B6B]/15 bg-white py-16 text-center"><MessageSquareText className="mx-auto h-8 w-8 text-[#A0A5AD]" /><p className="mt-3 text-sm font-bold text-[#243B6B]">No matching requests</p><p className="mt-1 text-xs text-[#8D929A]">Try another search or status filter.</p></div>}
      </section>

      <Dialog open={Boolean(selected)} onOpenChange={open => !open && setSelected(null)}>
        <DialogContent className="rounded-3xl border-0 sm:max-w-md">
          <DialogHeader><DialogTitle className="font-display text-3xl text-[#243B6B]">Schedule founder meeting</DialogTitle><DialogDescription>Choose the follow-up time for {selected?.founderName}. This action will be attributed to {admin.name}.</DialogDescription></DialogHeader>
          <div className="py-3"><Label htmlFor="schedule-at" className="text-xs font-bold text-[#34415A]">Meeting date and time</Label><Input id="schedule-at" type="datetime-local" value={scheduleAt} onChange={event => setScheduleAt(event.target.value)} className="mt-2 h-11 rounded-xl border-[#243B6B]/12" /></div>
          <DialogFooter><Button variant="outline" onClick={() => setSelected(null)} className="rounded-xl">Cancel</Button><Button onClick={confirmSchedule} className="rounded-xl bg-[#243B6B] text-white">Schedule meeting</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
