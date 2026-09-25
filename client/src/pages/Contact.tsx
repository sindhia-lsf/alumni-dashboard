import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAlumni } from "@/contexts/AlumniContext";
import { ArrowRight, CalendarCheck, Check, Clock3, Mail, MessageCircleQuestion, UsersRound, Video } from "lucide-react";
import { FormEvent, useState } from "react";

export default function Contact() {
  const { profile } = useAlumni();
  const [submitted, setSubmitted] = useState(false);
  const [topic, setTopic] = useState("Growth strategy");
  const [format, setFormat] = useState("Video call");
  const [time, setTime] = useState("Afternoon (12–4 PM ET)");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return <div className="mx-auto flex min-h-[calc(100vh-144px)] max-w-2xl animate-page-in items-center justify-center"><div className="w-full rounded-[28px] bg-white p-8 text-center shadow-[0_16px_50px_rgba(34,55,96,0.09)] sm:p-12"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#FDE9A4] text-[#243B6B]"><Check className="h-7 w-7" /></div><p className="mt-7 text-xs font-bold uppercase tracking-[0.17em] text-[#DE3038]">Request received</p><h1 className="mt-3 font-display text-4xl text-[#243B6B]">We’re on it, {profile.firstName}.</h1><p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#737B87]">The Lightship team will review your {topic.toLowerCase()} request and follow up at <strong className="text-[#35435D]">{profile.email}</strong> within two business days.</p><div className="mx-auto mt-7 max-w-sm rounded-2xl bg-[#F7F5EF] p-5 text-left"><div className="flex items-center justify-between"><span className="text-xs font-bold text-[#34425B]">Request reference</span><span className="rounded-md bg-white px-2 py-1 font-mono text-[11px] text-[#DE3038]">LS-2048</span></div><div className="mt-3 flex items-center gap-2 text-xs text-[#747C88]"><Clock3 className="h-3.5 w-3.5" /> Typical response: 1–2 business days</div></div><Button onClick={() => setSubmitted(false)} variant="outline" className="mt-8 rounded-xl border-[#243B6B]/15 bg-white px-6 font-bold text-[#243B6B]">Submit another request</Button></div></div>;
  }

  return (
    <div className="mx-auto max-w-[1180px] animate-page-in">
      <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden rounded-[28px] bg-[#243B6B] p-7 text-white sm:p-9">
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full border-[52px] border-[#DE3038]/90" />
          <div className="relative z-10 max-w-xl"><div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-[#FDE9A4] text-[#243B6B]"><MessageCircleQuestion className="h-6 w-6" /></div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FDE9A4]">Speak with us</p><h1 className="mt-3 font-display text-4xl leading-tight tracking-tight sm:text-5xl">You don’t have to solve it alone.</h1><p className="mt-4 max-w-lg text-sm leading-7 text-white/65">Bring us the messy question, the big decision, or the idea you need to pressure-test. We’ll connect you with the right support.</p></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <SupportCard icon={Video} title="1:1 office hours" body="Book focused time with a Lightship operator or subject-matter expert." accent="yellow" />
          <SupportCard icon={UsersRound} title="Warm introductions" body="Request a connection to an alumnus, partner, mentor, or ecosystem resource." accent="white" />
          <SupportCard icon={Mail} title="General support" body="Have another question? Send it our way and we’ll route it to the right person." accent="white" />
        </div>
      </section>

      <section className="mt-6 rounded-[24px] bg-white p-6 shadow-[0_10px_36px_rgba(34,55,96,0.07)] sm:p-8 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#DE3038]">Request support</p><h2 className="mt-3 font-display text-3xl text-[#243B6B]">How can we help?</h2><p className="mt-3 text-sm leading-6 text-[#777E8A]">Give us enough context to make your first conversation productive.</p><div className="mt-7 rounded-2xl bg-[#F7F5EF] p-4"><p className="text-xs font-bold text-[#34425C]">Submitting as</p><p className="mt-2 text-sm font-bold text-[#243B6B]">{profile.firstName} {profile.lastName}</p><p className="mt-1 text-xs text-[#818791]">{profile.companyName}</p></div></div>
          <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
            <SelectField label="What would you like help with?" value={topic} onChange={setTopic} options={["Growth strategy", "Fundraising", "Financial modeling", "Marketing & sales", "Hiring & team", "Legal & operations", "Warm introduction", "Something else"]} />
            <SelectField label="Preferred format" value={format} onChange={setFormat} options={["Video call", "Phone call", "Email response"]} />
            <Field label="Preferred date" type="date" />
            <SelectField label="Preferred time" value={time} onChange={setTime} options={["Morning (9 AM–12 PM ET)", "Afternoon (12–4 PM ET)", "Late afternoon (4–6 PM ET)"]} />
            <div className="space-y-2 sm:col-span-2"><Label htmlFor="question" className="text-xs font-bold text-[#34425B]">What’s on your mind?</Label><Textarea id="question" required className="min-h-36 rounded-xl border-[#243B6B]/12 bg-[#FBFAF7] p-4 shadow-none" placeholder="Share the decision, challenge, or opportunity you’d like to work through..." /><p className="text-[11px] text-[#979BA2]">Please avoid sharing confidential or sensitive information.</p></div>
            <div className="sm:col-span-2 flex flex-col gap-4 border-t border-[#243B6B]/8 pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="flex items-center gap-2 text-xs text-[#777F8C]"><CalendarCheck className="h-4 w-4 text-[#DE3038]" /> We’ll confirm the right team member and time by email.</p><Button type="submit" className="h-11 rounded-xl bg-[#DE3038] px-6 font-bold text-white hover:bg-[#C92831]">Send request <ArrowRight className="ml-2 h-4 w-4" /></Button></div>
          </form>
        </div>
      </section>
    </div>
  );
}

function SupportCard({ icon: Icon, title, body, accent }: { icon: typeof Video; title: string; body: string; accent: "yellow" | "white" }) { return <div className={`flex gap-4 rounded-2xl p-5 ${accent === "yellow" ? "bg-[#FDE9A4]" : "bg-white shadow-[0_8px_28px_rgba(34,55,96,0.05)]"}`}><div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${accent === "yellow" ? "bg-white/70 text-[#DE3038]" : "bg-[#F4F2EC] text-[#243B6B]"}`}><Icon className="h-[18px] w-[18px]" /></div><div><h3 className="text-sm font-bold text-[#243B6B]">{title}</h3><p className="mt-1 text-xs leading-5 text-[#727A88]">{body}</p></div></div>; }
function Field({ label, type = "text" }: { label: string; type?: string }) { return <div className="space-y-2"><Label className="text-xs font-bold text-[#34425B]">{label}</Label><Input required type={type} className="h-11 rounded-xl border-[#243B6B]/12 bg-[#FBFAF7] px-4 shadow-none" /></div>; }
function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) { return <div className="space-y-2"><Label className="text-xs font-bold text-[#34425B]">{label}</Label><select value={value} onChange={e => onChange(e.target.value)} className="h-11 w-full rounded-xl border border-[#243B6B]/12 bg-[#FBFAF7] px-4 text-sm text-[#33425B] outline-none focus:ring-2 focus:ring-[#243B6B]/20">{options.map(option => <option key={option} value={option}>{option}</option>)}</select></div>; }
