import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AlumniProfile, useAlumni } from "@/contexts/AlumniContext";
import {
  Building2,
  Camera,
  CheckCircle2,
  Globe2,
  Link2,
  LockKeyhole,
  MapPin,
  Pencil,
  Plus,
  Save,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const fieldClass = "h-11 rounded-xl border-[#243B6B]/12 bg-[#FBFAF7] px-4 shadow-none read-only:border-transparent read-only:bg-[#F4F2EC] read-only:text-[#4F596B] disabled:border-transparent disabled:bg-[#F4F2EC] disabled:text-[#4F596B] disabled:opacity-100";
const textareaClass = "min-h-28 rounded-xl border-[#243B6B]/12 bg-[#FBFAF7] p-4 shadow-none read-only:border-transparent read-only:bg-[#F4F2EC] read-only:text-[#4F596B]";

export default function Profile() {
  const { profile, updateProfile } = useAlumni();
  const [form, setForm] = useState<AlumniProfile>(profile);
  const [isEditing, setIsEditing] = useState(false);

  const update = (key: keyof Omit<AlumniProfile, "otherCompanies">, value: string) => {
    if (!isEditing) return;
    setForm(current => ({ ...current, [key]: value }));
  };

  const addCompany = () => {
    if (!isEditing) return;
    setForm(current => ({
      ...current,
      otherCompanies: [...current.otherCompanies, { id: `company-${Date.now()}`, name: "", website: "" }],
    }));
  };

  const updateCompany = (id: string, key: "name" | "website", value: string) => {
    if (!isEditing) return;
    setForm(current => ({
      ...current,
      otherCompanies: current.otherCompanies.map(company => company.id === id ? { ...company, [key]: value } : company),
    }));
  };

  const removeCompany = (id: string) => {
    if (!isEditing) return;
    setForm(current => ({ ...current, otherCompanies: current.otherCompanies.filter(company => company.id !== id) }));
  };

  const edit = () => {
    setForm(profile);
    setIsEditing(true);
  };

  const save = () => {
    updateProfile(form);
    setIsEditing(false);
    toast.success("Your profile has been updated.");
  };

  const cancel = () => {
    setForm(profile);
    setIsEditing(false);
    toast.info("Your unsaved changes were discarded.");
  };

  return (
    <div className="mx-auto max-w-[1180px] animate-page-in">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#DE3038]">Your information</p>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-[#243B6B]">Profile & company</h1>
          <p className="mt-2 text-sm text-[#747B87]">Keep your founder story and business details current.</p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing && (
            <Button onClick={cancel} variant="ghost" className="h-11 rounded-xl px-4 font-bold text-[#6B7380] hover:bg-white">
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
          )}
          <Button onClick={isEditing ? save : edit} className="h-11 rounded-xl bg-[#243B6B] px-5 font-bold text-white hover:bg-[#1D315D]">
            {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Pencil className="mr-2 h-4 w-4" />}
            {isEditing ? "Save changes" : "Edit profile"}
          </Button>
        </div>
      </div>

      <section className="relative overflow-hidden rounded-[26px] bg-[#243B6B] p-6 text-white sm:p-8">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_center,#FDE9A4_1px,transparent_1px)] bg-[length:18px_18px] opacity-15" />
        <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-white/15">
              <AvatarFallback className="bg-[#DE3038] text-2xl font-bold text-white">{form.firstName.charAt(0)}{form.lastName.charAt(0)}</AvatarFallback>
            </Avatar>
            <button
              disabled={!isEditing}
              onClick={() => toast.info("Photo upload will be connected to secure file storage.")}
              className="absolute -bottom-1 -right-1 grid h-9 w-9 place-items-center rounded-full border-4 border-[#243B6B] bg-[#FDE9A4] text-[#243B6B] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Update profile photo"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="font-display text-3xl">{form.firstName} {form.lastName}</h2>
            <p className="mt-1 text-sm font-semibold text-[#FDE9A4]">{form.title} at {form.companyName}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/60">
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {form.location}</span>
              <span className="flex items-center gap-1.5"><Link2 className="h-3.5 w-3.5" /> {form.companyUrl}</span>
            </div>
          </div>
          <div className="w-full rounded-2xl border border-white/10 bg-white/[0.06] p-4 sm:w-56">
            <div className="flex items-center justify-between text-xs font-bold"><span>Profile strength</span><span className="text-[#FDE9A4]">92%</span></div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[92%] rounded-full bg-[#FDE9A4]" /></div>
            <p className="mt-3 text-[11px] leading-4 text-white/50">Add a profile photo to complete your profile.</p>
          </div>
        </div>
      </section>

      <Tabs defaultValue="personal" className="mt-6">
        <TabsList className="h-auto w-full justify-start gap-1 rounded-2xl bg-white p-1.5 shadow-[0_6px_25px_rgba(34,55,96,0.05)] sm:w-auto">
          <TabsTrigger value="personal" className="flex-1 rounded-xl px-4 py-2.5 text-xs font-bold data-[state=active]:bg-[#FDE9A4] data-[state=active]:text-[#243B6B] sm:flex-none"><UserRound className="mr-2 h-4 w-4" />Personal</TabsTrigger>
          <TabsTrigger value="company" className="flex-1 rounded-xl px-4 py-2.5 text-xs font-bold data-[state=active]:bg-[#FDE9A4] data-[state=active]:text-[#243B6B] sm:flex-none"><Building2 className="mr-2 h-4 w-4" />Company</TabsTrigger>
          <TabsTrigger value="metrics" className="flex-1 rounded-xl px-4 py-2.5 text-xs font-bold data-[state=active]:bg-[#FDE9A4] data-[state=active]:text-[#243B6B] sm:flex-none"><CheckCircle2 className="mr-2 h-4 w-4" />Business metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <FormCard title="Personal details" description="Your professional profile is visible to members. Optional demographic information is private to Lightship staff.">
            <ProfileSection title="Contact & professional information" icon={UserRound}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="First name" value={form.firstName} onChange={v => update("firstName", v)} editing={isEditing} />
                <Field label="Last name" value={form.lastName} onChange={v => update("lastName", v)} editing={isEditing} />
                <Field label="Email address" type="email" value={form.email} onChange={v => update("email", v)} editing={isEditing} />
                <Field label="Phone number" value={form.phone} onChange={v => update("phone", v)} editing={isEditing} />
                <Field label="Location" value={form.location} onChange={v => update("location", v)} editing={isEditing} />
                <Field label="Age" type="number" value={form.age} onChange={v => update("age", v)} editing={isEditing} />
                <Field label="Current company" value={form.companyName} onChange={v => update("companyName", v)} editing={isEditing} />
                <Field label="Current title" value={form.title} onChange={v => update("title", v)} editing={isEditing} />
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-xs font-bold text-[#34415A]">Founder bio</Label>
                  <Textarea readOnly={!isEditing} value={form.bio} onChange={e => update("bio", e.target.value)} className={textareaClass} />
                </div>
              </div>
            </ProfileSection>

            <ProfileSection title="Social profiles" icon={Globe2} description="Add the channels where alumni can follow your work.">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="LinkedIn" value={form.linkedIn} onChange={v => update("linkedIn", v)} editing={isEditing} placeholder="linkedin.com/in/yourname" />
                <Field label="Instagram" value={form.instagram} onChange={v => update("instagram", v)} editing={isEditing} placeholder="instagram.com/yourhandle" />
                <Field label="X / Twitter" value={form.twitter} onChange={v => update("twitter", v)} editing={isEditing} placeholder="x.com/yourhandle" />
                <Field label="Other social or portfolio" value={form.otherSocial} onChange={v => update("otherSocial", v)} editing={isEditing} placeholder="Website, TikTok, YouTube, or another profile" />
              </div>
            </ProfileSection>

            <ProfileSection title="Optional demographics" icon={LockKeyhole} description="These answers help Lightship understand and serve the alumni community. They are not shown on your public member profile.">
              <div className="mb-5 flex gap-3 rounded-2xl bg-[#FDE9A4]/45 p-4 text-xs leading-5 text-[#4C5870]">
                <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-[#DE3038]" />
                Every question is optional. Choose “Prefer not to say” whenever that feels right.
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField label="Gender" value={form.gender} onChange={v => update("gender", v)} editing={isEditing} options={["Prefer not to say", "Woman", "Man", "Non-binary", "Genderqueer or gender non-conforming", "Self-describe"]} />
                <SelectField label="Race / ethnicity" value={form.raceEthnicity} onChange={v => update("raceEthnicity", v)} editing={isEditing} options={["Prefer not to say", "American Indian or Alaska Native", "Asian", "Black or African American", "Hispanic or Latino/a/x", "Middle Eastern or North African", "Native Hawaiian or Other Pacific Islander", "White", "Multiracial", "Self-describe"]} />
                <SelectField label="Do you identify as LGBTQIAP+?" value={form.lgbtqia} onChange={v => update("lgbtqia", v)} editing={isEditing} options={["Prefer not to say", "Yes", "No", "Questioning or unsure", "Self-describe"]} />
              </div>
            </ProfileSection>
          </FormCard>
        </TabsContent>

        <TabsContent value="company">
          <FormCard title="Company details" description="Keep this current so peers and partners understand what you’re building.">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Company name" value={form.companyName} onChange={v => update("companyName", v)} editing={isEditing} />
              <Field label="Website" value={form.companyUrl} onChange={v => update("companyUrl", v)} editing={isEditing} />
              <SelectField label="Industry" value={form.industry} onChange={v => update("industry", v)} editing={isEditing} options={["Technology", "Health & Wellness", "Consumer", "Food & Beverage", "Financial Services", "Professional Services", "Manufacturing", "Other"]} />
              <Field label="Headquarters address" value={form.headquartersAddress} onChange={v => update("headquartersAddress", v)} editing={isEditing} placeholder="Street address or workspace" />
              <Field label="Headquarters city" value={form.headquartersCity} onChange={v => update("headquartersCity", v)} editing={isEditing} />
              <Field label="Headquarters state" value={form.headquartersState} onChange={v => update("headquartersState", v)} editing={isEditing} />
              <Field label="Year founded" value={form.foundedYear} onChange={v => update("foundedYear", v)} editing={isEditing} />
              <SelectField label="Current number of employees" value={form.employeeCount} onChange={v => update("employeeCount", v)} editing={isEditing} options={["Just me", "2–5", "6–10", "11–25", "26–50", "51+"]} />
              <SelectField label="Company stage" value={form.stage} onChange={v => update("stage", v)} editing={isEditing} options={["Idea / pre-launch", "Pre-revenue", "Early revenue", "Growth", "Established"]} />
            </div>

            <section className="mt-8 border-t border-[#243B6B]/8 pt-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-[#2A3954]">Other companies founded</h4>
                  <p className="mt-1 text-xs leading-5 text-[#858B95]">Add basic details for other companies you founded previously or currently operate.</p>
                </div>
                {isEditing && (
                  <Button type="button" onClick={addCompany} variant="outline" className="h-9 rounded-xl border-[#243B6B]/12 bg-white px-4 text-xs font-bold text-[#243B6B]">
                    <Plus className="mr-2 h-4 w-4" /> Add company
                  </Button>
                )}
              </div>

              {form.otherCompanies.length > 0 ? (
                <div className="mt-5 space-y-3">
                  {form.otherCompanies.map((company, index) => (
                    <div key={company.id} className="grid gap-4 rounded-2xl border border-[#243B6B]/8 bg-[#FBFAF7] p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                      <Field label={`Company ${index + 1} name`} value={company.name} onChange={value => updateCompany(company.id, "name", value)} editing={isEditing} placeholder="Company name" />
                      <Field label="Website" value={company.website} onChange={value => updateCompany(company.id, "website", value)} editing={isEditing} placeholder="company.com" />
                      {isEditing && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeCompany(company.id)} className="h-11 w-11 rounded-xl text-[#A0474E] hover:bg-[#DE3038]/10 hover:text-[#DE3038]" aria-label={`Remove ${company.name || `company ${index + 1}`}`}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-dashed border-[#243B6B]/15 bg-[#FBFAF7] px-5 py-8 text-center">
                  <Building2 className="mx-auto h-6 w-6 text-[#A1A6AE]" />
                  <p className="mt-3 text-sm font-bold text-[#4B566A]">No additional companies added</p>
                  <p className="mt-1 text-xs text-[#8A9099]">Use Edit profile to add another company.</p>
                </div>
              )}
            </section>
          </FormCard>
        </TabsContent>

        <TabsContent value="metrics">
          <FormCard title="Business metrics" description="Lightship uses these private data points to understand alumni progress and provide relevant support.">
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField label="Annual revenue" value={form.annualRevenue} onChange={v => update("annualRevenue", v)} editing={isEditing} options={["Pre-revenue", "Under $100K", "$100K–$250K", "$250K–$500K", "$500K–$1M", "$1M+"]} />
              <Field label="Capital raised to date" value={form.fundingRaised} onChange={v => update("fundingRaised", v)} editing={isEditing} />
              <SelectField label="Fundraising status" value={form.fundraisingStatus} onChange={v => update("fundraisingStatus", v)} editing={isEditing} options={["Not fundraising", "Exploring options", "Preparing to raise", "Actively raising", "Recently closed"]} />
              <div className="space-y-2 sm:col-span-2">
                <Label className="text-xs font-bold text-[#34415A]">12-month goals</Label>
                <Textarea readOnly={!isEditing} value={form.goals} onChange={e => update("goals", e.target.value)} className={textareaClass} />
              </div>
            </div>
          </FormCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function FormCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(34,55,96,0.06)] sm:p-8">
      <div className="mb-7 border-b border-[#243B6B]/8 pb-5">
        <h3 className="text-lg font-bold text-[#243B6B]">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-[#7C828D]">{description}</p>
      </div>
      {children}
    </div>
  );
}

function ProfileSection({ title, description, icon: Icon, children }: { title: string; description?: string; icon: typeof UserRound; children: React.ReactNode }) {
  return (
    <section className="border-b border-[#243B6B]/8 pb-8 pt-1 last:border-0 last:pb-0 [&+section]:pt-8">
      <div className="mb-5 flex items-start gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#FDE9A4] text-[#243B6B]"><Icon className="h-4 w-4" /></div>
        <div><h4 className="text-sm font-bold text-[#2A3954]">{title}</h4>{description && <p className="mt-1 text-xs leading-5 text-[#858B95]">{description}</p>}</div>
      </div>
      {children}
    </section>
  );
}

function Field({ label, value, onChange, editing, type = "text", placeholder }: { label: string; value: string; onChange: (value: string) => void; editing: boolean; type?: string; placeholder?: string }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-bold text-[#34415A]">{label}</Label>
      <Input type={type} readOnly={!editing} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={fieldClass} />
    </div>
  );
}

function SelectField({ label, value, onChange, options, editing }: { label: string; value: string; onChange: (value: string) => void; options: string[]; editing: boolean }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-bold text-[#34415A]">{label}</Label>
      <select disabled={!editing} value={value} onChange={e => onChange(e.target.value)} className="h-11 w-full rounded-xl border border-[#243B6B]/12 bg-[#FBFAF7] px-4 text-sm outline-none focus:ring-2 focus:ring-[#243B6B]/20 disabled:border-transparent disabled:bg-[#F4F2EC] disabled:text-[#4F596B] disabled:opacity-100">
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  );
}
