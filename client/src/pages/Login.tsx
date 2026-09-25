import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAlumni } from "@/contexts/AlumniContext";
import { ArrowRight, Eye, EyeOff, LockKeyhole, UsersRound } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAlumni();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("alex@northstarworks.co");
  const [password, setPassword] = useState("founder123");

  const enterDashboard = (message: string) => {
    login();
    toast.success(message);
    setLocation("/home");
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Enter your email and password to continue.");
      return;
    }
    enterDashboard("Welcome back to the Lightship community.");
  };

  return (
    <main className="grid min-h-screen bg-[#F7F5EF] lg:grid-cols-[1.04fr_0.96fr]">
      <section className="relative flex min-h-[680px] flex-col px-6 py-7 sm:px-10 lg:px-16 xl:px-24">
        <BrandMark />
        <div className="mx-auto flex w-full max-w-[470px] flex-1 flex-col justify-center py-12 lg:py-16">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#DE3038]">Member access</p>
          <h1 className="font-display text-[44px] leading-[0.98] tracking-[-0.03em] text-[#203661] sm:text-5xl">Welcome back,<br />founder.</h1>
          <p className="mt-5 max-w-md text-[15px] leading-7 text-[#626A78]">Sign in to access your community, company resources, and the people helping you build what’s next.</p>

          <form onSubmit={submit} className="mt-9 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold text-[#29364E]">Email address</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="h-12 rounded-xl border-[#243B6B]/15 bg-white px-4 shadow-none focus-visible:ring-[#243B6B]/25" placeholder="you@company.com" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-bold text-[#29364E]">Password</Label>
                <button type="button" onClick={() => toast.info("Password recovery will be connected during authentication setup.")} className="text-xs font-bold text-[#2E477D] hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="h-12 rounded-xl border-[#243B6B]/15 bg-white px-4 pr-12 shadow-none focus-visible:ring-[#243B6B]/25" />
                <button type="button" onClick={() => setShowPassword(value => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#767D88] hover:text-[#243B6B]" aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" defaultChecked className="border-[#243B6B]/30 data-[state=checked]:bg-[#243B6B]" />
              <Label htmlFor="remember" className="text-xs font-medium text-[#646C79]">Keep me signed in</Label>
            </div>
            <Button type="submit" className="h-12 w-full rounded-xl bg-[#243B6B] text-sm font-bold text-white shadow-[0_10px_24px_rgba(36,59,107,0.2)] hover:bg-[#1C315D]">
              Sign in <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="my-6 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#969AA2]"><span className="h-px flex-1 bg-[#243B6B]/10" />or continue with<span className="h-px flex-1 bg-[#243B6B]/10" /></div>
          <Button type="button" variant="outline" onClick={() => enterDashboard("Google sign-in preview loaded.")} className="h-12 rounded-xl border-[#243B6B]/15 bg-white text-sm font-bold text-[#243B6B] hover:bg-[#FDE9A4]/35">
            <span className="mr-3 grid h-5 w-5 place-items-center rounded-full bg-white text-[13px] font-black text-[#4285F4] shadow-sm">G</span> Continue with Google
          </Button>
          <div className="mt-8 flex items-center gap-2 text-xs text-[#7B808A]"><LockKeyhole className="h-3.5 w-3.5" /> Your information is private and secure.</div>
        </div>
        <p className="text-[11px] text-[#989B9F]">© 2026 Lightship Foundation</p>
      </section>

      <section className="relative hidden overflow-hidden bg-[#243B6B] px-14 py-12 text-white lg:flex lg:flex-col">
        <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#FDE9A4_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -right-24 -top-20 h-80 w-80 rounded-full border-[70px] border-[#DE3038]/80" />
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="ml-auto rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70">Built for founders, by community.</div>
          <div className="max-w-[540px] py-12">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FDE9A4] text-[#243B6B]"><UsersRound className="h-7 w-7" /></div>
            <h2 className="font-display text-5xl leading-[1.02] tracking-[-0.035em] xl:text-6xl">Your next move starts with the right people.</h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/65">Reconnect with your cohort, find practical resources, and keep Lightship close as your company grows.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-7 backdrop-blur-sm">
            <p className="font-display text-2xl leading-snug text-[#FDE9A4]">“Community is the infrastructure founders build on.”</p>
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60">New to the network?</span>
              <Button onClick={() => setLocation("/onboarding")} className="rounded-xl bg-[#DE3038] px-5 font-bold text-white hover:bg-[#C9242E]">Create your profile <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </section>
      <div className="fixed bottom-5 right-5 lg:hidden">
        <Button onClick={() => setLocation("/onboarding")} className="rounded-full bg-[#DE3038] px-5 font-bold text-white shadow-xl">First time here?</Button>
      </div>
    </main>
  );
}
