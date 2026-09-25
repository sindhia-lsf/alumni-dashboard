import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourceCategory, resources } from "@/data/alumni";
import { ArrowUpRight, Bookmark, BookOpenText, Clock3, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

const tabs: Array<{ label: string; value: "All" | ResourceCategory }> = [
  { label: "All resources", value: "All" },
  { label: "Newsletters", value: "Newsletters" },
  { label: "Articles", value: "Articles" },
  { label: "Fundraising & investments", value: "Fundraising & Investments" },
];

export default function Resources() {
  const [, setLocation] = useLocation();
  const [category, setCategory] = useState<"All" | ResourceCategory>("All");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<number[]>([3]);
  const filtered = useMemo(() => resources.filter(item => (category === "All" || item.category === category) && `${item.title} ${item.description} ${item.type}`.toLowerCase().includes(query.toLowerCase())), [category, query]);

  const toggleSaved = (id: number) => {
    setSaved(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
    toast.success(saved.includes(id) ? "Removed from saved resources." : "Saved to your library.");
  };

  return (
    <div className="mx-auto max-w-[1280px] animate-page-in">
      <section className="relative overflow-hidden rounded-[28px] bg-[#243B6B] p-7 text-white sm:p-9">
        <div className="absolute -bottom-16 right-20 h-44 w-44 rounded-full bg-[#DE3038]" /><div className="absolute -right-12 -top-16 h-56 w-56 rounded-full border-[45px] border-[#FDE9A4]/80" />
        <div className="relative z-10 max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FDE9A4]">Knowledge hub</p><h1 className="mt-3 font-display text-4xl leading-tight tracking-tight sm:text-5xl">Resources for the<br />work ahead.</h1><p className="mt-4 max-w-lg text-sm leading-7 text-white/65">Practical frameworks, funding guidance, and Lightship updates for founders actively building.</p></div>
      </section>

      <div className="mt-6 rounded-2xl bg-white p-3 shadow-[0_8px_30px_rgba(34,55,96,0.06)] sm:p-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <Tabs value={category} onValueChange={value => setCategory(value as typeof category)}>
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0">
              {tabs.map(tab => <TabsTrigger key={tab.value} value={tab.value} className="rounded-xl px-4 py-2.5 text-xs font-bold data-[state=active]:bg-[#FDE9A4] data-[state=active]:text-[#243B6B]">{tab.label}</TabsTrigger>)}
            </TabsList>
          </Tabs>
          <div className="relative min-w-[260px]"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8D929A]" /><Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search the library" className="h-10 rounded-xl border-[#243B6B]/10 bg-[#F7F5EF] pl-9 text-sm shadow-none" /></div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between"><p className="text-sm font-bold text-[#243B6B]">{filtered.length} resources</p><p className="text-xs text-[#8C919A]">Updated weekly by the Lightship team</p></div>

      <section className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item, index) => (
          <article key={item.id} className={`group relative flex min-h-[300px] flex-col overflow-hidden rounded-2xl p-6 shadow-[0_8px_30px_rgba(34,55,96,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(34,55,96,0.1)] ${item.featured ? "bg-[#243B6B] text-white" : "bg-white text-[#243B6B]"}`}>
            {item.featured && <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full border-[30px] border-[#DE3038]/90" />}
            <div className="relative z-10 flex items-center justify-between">
              <Badge className={`border-0 text-[10px] font-bold uppercase tracking-[0.12em] ${item.featured ? "bg-[#FDE9A4] text-[#243B6B]" : "bg-[#F4F2EC] text-[#667085]"}`}>{item.type}</Badge>
              <button onClick={() => toggleSaved(item.id)} className={`grid h-9 w-9 place-items-center rounded-xl transition-colors ${item.featured ? "bg-white/10 text-white hover:bg-white/20" : "bg-[#F7F5EF] text-[#687183] hover:bg-[#FDE9A4] hover:text-[#243B6B]"}`} aria-label="Save resource"><Bookmark className={`h-4 w-4 ${saved.includes(item.id) ? "fill-current" : ""}`} /></button>
            </div>
            <div className="relative z-10 mt-auto pt-12">
              <p className={`text-[10px] font-bold uppercase tracking-[0.15em] ${item.featured ? "text-[#FDE9A4]" : "text-[#DE3038]"}`}>{item.category}</p>
              <h2 className="mt-3 text-xl font-bold leading-snug tracking-tight">{item.title}</h2>
              <p className={`mt-3 text-sm leading-6 ${item.featured ? "text-white/62" : "text-[#707784]"}`}>{item.description}</p>
              <div className={`mt-6 flex items-center justify-between border-t pt-4 ${item.featured ? "border-white/10" : "border-[#243B6B]/8"}`}><span className={`flex items-center gap-1.5 text-xs ${item.featured ? "text-white/50" : "text-[#8E939B]"}`}><Clock3 className="h-3.5 w-3.5" />{item.readTime}</span><a href={item.url} target="_blank" rel="noreferrer" className={`flex items-center gap-1.5 text-xs font-bold ${item.featured ? "text-[#FDE9A4]" : "text-[#243B6B]"}`}>Open <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a></div>
            </div>
          </article>
        ))}
      </section>

      {filtered.length === 0 && <div className="mt-5 rounded-2xl bg-white py-16 text-center"><BookOpenText className="mx-auto h-8 w-8 text-[#B1B4BA]" /><h3 className="mt-4 font-bold text-[#243B6B]">No resources found</h3><p className="mt-1 text-sm text-[#7D838D]">Try a different search or category.</p></div>}

      <section className="mt-7 flex flex-col items-start gap-5 rounded-2xl bg-[#FDE9A4] p-6 text-[#243B6B] sm:flex-row sm:items-center sm:justify-between sm:p-8"><div className="flex gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/70"><Sparkles className="h-5 w-5 text-[#DE3038]" /></div><div><h3 className="font-display text-2xl">Looking for something specific?</h3><p className="mt-1 text-sm text-[#243B6B]/65">Tell us what would make your next business decision easier.</p></div></div><Button onClick={() => setLocation("/contact")} className="rounded-xl bg-[#243B6B] px-5 font-bold text-white">Request a resource</Button></section>
    </div>
  );
}
