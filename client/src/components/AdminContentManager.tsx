import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAdmin, type ContentStatus } from "@/contexts/AdminContext";
import { cn } from "@/lib/utils";
import { Archive, CalendarClock, Clock3, Filter, Link2, Megaphone, Plus, Search, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const statuses = ["All", "Draft", "Scheduled", "Published", "Archived"] as const;
const statusStyle: Record<string, string> = {
  Draft: "bg-[#EEF2F8] text-[#243B6B]",
  Scheduled: "bg-[#FDE9A4]/75 text-[#72590C]",
  Published: "bg-[#E7F2EF] text-[#2E655B]",
  Archived: "bg-[#EFEFEF] text-[#6F747B]",
};

type ManagerType = "announcement" | "resource";

export default function AdminContentManager({ type }: { type: ManagerType }) {
  const { admin, announcements, resources, createAnnouncement, archiveAnnouncement, createResource, archiveResource } = useAdmin();
  const isAnnouncement = type === "announcement";
  const items = isAnnouncement ? announcements : resources;
  const [filter, setFilter] = useState<(typeof statuses)[number]>("All");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("All alumni");
  const [category, setCategory] = useState("Articles");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Exclude<ContentStatus, "Archived">>("Draft");
  const [publishAt, setPublishAt] = useState("2026-10-02T09:00");

  const visible = useMemo(() => items.filter(item => {
    const matchesFilter = filter === "All" || item.status === filter;
    const searchable = `${item.title} ${isAnnouncement ? "summary" in item ? item.summary : "" : "description" in item ? item.description : ""}`.toLowerCase();
    return matchesFilter && searchable.includes(query.toLowerCase());
  }), [filter, isAnnouncement, items, query]);

  const reset = () => {
    setTitle("");
    setBody("");
    setAudience("All alumni");
    setCategory("Articles");
    setUrl("");
    setStatus("Draft");
    setPublishAt("2026-10-02T09:00");
  };

  const save = () => {
    if (!title.trim() || !body.trim()) {
      toast.error(`Add a title and ${isAnnouncement ? "message" : "description"}.`);
      return;
    }
    if (status === "Scheduled" && !publishAt) {
      toast.error("Choose a publishing date and time.");
      return;
    }
    const scheduledTime = status === "Scheduled" ? new Date(publishAt).toLocaleString([], { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }) : status === "Published" ? "Published now" : "Not scheduled";
    if (isAnnouncement) {
      createAnnouncement({ title: title.trim(), summary: body.trim(), audience, status, publishAt: scheduledTime });
    } else {
      createResource({ title: title.trim(), description: body.trim(), category, url: url.trim(), status, publishAt: scheduledTime });
    }
    toast.success(`${isAnnouncement ? "Announcement" : "Resource"} ${status === "Scheduled" ? "scheduled" : status.toLowerCase()} by ${admin.name}.`);
    setOpen(false);
    reset();
  };

  const archive = (id: number, itemTitle: string) => {
    if (isAnnouncement) archiveAnnouncement(id);
    else archiveResource(id);
    toast.success(`Archived by ${admin.name}.`, { description: itemTitle });
  };

  return (
    <div className="mx-auto max-w-[1260px] animate-page-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#DE3038]">Publishing</p><h1 className="mt-2 font-display text-4xl tracking-tight text-[#243B6B] sm:text-5xl">{isAnnouncement ? "Announcements" : "Resources"}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[#737A86]">{isAnnouncement ? "Create timely Lightship updates, schedule delivery, and phase out notices when they are no longer relevant." : "Publish newsletters, articles, and practical founder resources now or on a future schedule."}</p></div>
        <Button onClick={() => setOpen(true)} className="h-11 rounded-xl bg-[#DE3038] px-5 text-xs font-bold text-white hover:bg-[#C92730]"><Plus className="mr-2 h-4 w-4" /> New {isAnnouncement ? "announcement" : "resource"}</Button>
      </div>

      <section className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {(["Draft", "Scheduled", "Published", "Archived"] as ContentStatus[]).map(itemStatus => <div key={itemStatus} className="rounded-2xl bg-white p-5 shadow-[0_8px_28px_rgba(34,55,96,0.05)]"><p className="text-xs font-bold text-[#737A86]">{itemStatus}</p><p className="mt-2 font-display text-4xl text-[#243B6B]">{items.filter(item => item.status === itemStatus).length}</p></div>)}
      </section>

      <section className="mt-5 rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(34,55,96,0.055)]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm"><Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#969BA4]" /><Input value={query} onChange={event => setQuery(event.target.value)} placeholder={`Search ${isAnnouncement ? "announcements" : "resources"}`} className="h-11 rounded-xl border-[#243B6B]/10 bg-[#FBFAF7] pl-10" /></div>
          <div className="flex flex-wrap items-center gap-1"><Filter className="mr-2 h-4 w-4 text-[#8A9099]" />{statuses.map(itemStatus => <button key={itemStatus} onClick={() => setFilter(itemStatus)} className={cn("rounded-xl px-3 py-2.5 text-xs font-bold transition-colors", filter === itemStatus ? "bg-[#243B6B] text-white" : "text-[#747B87] hover:bg-[#F4F2EC] hover:text-[#243B6B]")}>{itemStatus}</button>)}</div>
        </div>
      </section>

      <section className="mt-5 overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(34,55,96,0.055)]">
        <div className="hidden grid-cols-[minmax(260px,1.4fr)_150px_190px_190px_110px] gap-4 border-b border-[#243B6B]/8 bg-[#FBFAF7] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8B9098] lg:grid"><span>Content</span><span>Status</span><span>Publish time</span><span>Attribution</span><span className="text-right">Actions</span></div>
        <div className="divide-y divide-[#243B6B]/8">
          {visible.map(item => {
            const detail = "summary" in item ? item.summary : item.description;
            const metadata = "audience" in item ? item.audience : item.category;
            return (
              <article key={item.id} className="grid gap-4 px-5 py-5 lg:grid-cols-[minmax(260px,1.4fr)_150px_190px_190px_110px] lg:items-center lg:px-6">
                <div className="min-w-0"><div className="flex items-center gap-2"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#EEF2F8] text-[#243B6B]">{isAnnouncement ? <Megaphone className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}</div><div className="min-w-0"><h2 className="truncate text-sm font-bold text-[#243B6B]">{item.title}</h2><p className="mt-1 text-xs font-semibold text-[#888E97]">{metadata}</p></div></div><p className="mt-3 line-clamp-2 text-xs leading-5 text-[#747C88]">{detail}</p></div>
                <div><Badge className={cn("border-0 text-[9px] font-bold uppercase tracking-[0.1em]", statusStyle[item.status])}>{item.status}</Badge></div>
                <p className="flex items-center gap-2 text-xs text-[#6F7784]"><CalendarClock className="h-3.5 w-3.5 text-[#9A9FA7]" /> {item.publishAt}</p>
                <div><p className="flex items-center gap-1.5 text-xs font-bold text-[#4B566A]"><ShieldCheck className="h-3.5 w-3.5 text-[#DE3038]" /> {item.updatedBy}</p><p className="mt-1 flex items-center gap-1.5 text-[10px] text-[#9A9EA5]"><Clock3 className="h-3 w-3" /> {item.updatedAt}</p></div>
                <div className="flex justify-end">{item.status !== "Archived" && <Button onClick={() => archive(item.id, item.title)} variant="ghost" className="h-9 rounded-xl px-3 text-xs font-bold text-[#8A4B50] hover:bg-[#FBE8E9] hover:text-[#B2252D]"><Archive className="mr-1.5 h-3.5 w-3.5" /> Archive</Button>}</div>
              </article>
            );
          })}
          {visible.length === 0 && <div className="py-16 text-center"><p className="text-sm font-bold text-[#243B6B]">No matching content</p><p className="mt-1 text-xs text-[#8E939B]">Try another search or status filter.</p></div>}
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl border-0 sm:max-w-xl">
          <DialogHeader><DialogTitle className="font-display text-3xl text-[#243B6B]">New {isAnnouncement ? "announcement" : "resource"}</DialogTitle><DialogDescription>Create the content and choose when it should appear for alumni. This action will be attributed to {admin.name}.</DialogDescription></DialogHeader>
          <div className="grid gap-5 py-3">
            <div className="space-y-2"><Label htmlFor="content-title" className="text-xs font-bold text-[#34415A]">Title</Label><Input id="content-title" value={title} onChange={event => setTitle(event.target.value)} className="h-11 rounded-xl border-[#243B6B]/12" /></div>
            <div className="space-y-2"><Label htmlFor="content-body" className="text-xs font-bold text-[#34415A]">{isAnnouncement ? "Message" : "Description"}</Label><Textarea id="content-body" value={body} onChange={event => setBody(event.target.value)} className="min-h-28 rounded-xl border-[#243B6B]/12" /></div>
            {isAnnouncement ? <div className="space-y-2"><Label className="text-xs font-bold text-[#34415A]">Audience</Label><Select value={audience} onValueChange={setAudience}><SelectTrigger className="h-11 rounded-xl border-[#243B6B]/12"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="All alumni">All alumni</SelectItem><SelectItem value="2026 cohorts">2026 cohorts</SelectItem><SelectItem value="Cincinnati cohorts">Cincinnati cohorts</SelectItem><SelectItem value="Fundraising founders">Fundraising founders</SelectItem></SelectContent></Select></div> : <><div className="space-y-2"><Label className="text-xs font-bold text-[#34415A]">Category</Label><Select value={category} onValueChange={setCategory}><SelectTrigger className="h-11 rounded-xl border-[#243B6B]/12"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Newsletters">Newsletters</SelectItem><SelectItem value="Articles">Articles</SelectItem><SelectItem value="Fundraising & Investments">Fundraising & Investments</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label htmlFor="resource-url" className="text-xs font-bold text-[#34415A]">Resource URL</Label><Input id="resource-url" value={url} onChange={event => setUrl(event.target.value)} placeholder="https://" className="h-11 rounded-xl border-[#243B6B]/12" /></div></>}
            <div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label className="text-xs font-bold text-[#34415A]">Publishing status</Label><Select value={status} onValueChange={value => setStatus(value as Exclude<ContentStatus, "Archived">)}><SelectTrigger className="h-11 rounded-xl border-[#243B6B]/12"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Draft">Save as draft</SelectItem><SelectItem value="Scheduled">Schedule</SelectItem><SelectItem value="Published">Publish now</SelectItem></SelectContent></Select></div>{status === "Scheduled" && <div className="space-y-2"><Label htmlFor="publish-at" className="text-xs font-bold text-[#34415A]">Publish date and time</Label><Input id="publish-at" type="datetime-local" value={publishAt} onChange={event => setPublishAt(event.target.value)} className="h-11 rounded-xl border-[#243B6B]/12" /></div>}</div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setOpen(false)} className="rounded-xl">Cancel</Button><Button onClick={save} className="rounded-xl bg-[#243B6B] text-white">{status === "Scheduled" ? "Schedule" : status === "Published" ? "Publish now" : "Save draft"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
