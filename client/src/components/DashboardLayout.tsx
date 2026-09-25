import { BrandMark } from "@/components/BrandMark";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAlumni } from "@/contexts/AlumniContext";
import { cn } from "@/lib/utils";
import {
  Bell,
  BookOpenText,
  ChevronRight,
  Home,
  LogOut,
  Menu,
  MessageCircleQuestion,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

const menuItems = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: UserRound, label: "Profile & company", path: "/profile" },
  { icon: BookOpenText, label: "Resources", path: "/resources" },
  { icon: Sparkles, label: "Luminaries", path: "/luminaries" },
  { icon: MessageCircleQuestion, label: "Speak with us", path: "/contact" },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const [location, setLocation] = useLocation();
  const { profile, logout } = useAlumni();

  const navigate = (path: string) => {
    setLocation(path);
    onNavigate?.();
  };

  const handleLogout = () => {
    logout();
    setLocation("/");
    onNavigate?.();
  };

  return (
    <div className="flex h-full flex-col bg-[#243B6B] text-white">
      <div className="px-6 pb-7 pt-7"><BrandMark inverse /></div>
      <nav className="flex-1 space-y-1 px-3" aria-label="Primary navigation">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Your workspace</p>
        {menuItems.map(item => {
          const active = location === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-all duration-200",
                active ? "bg-[#FDE9A4] text-[#243B6B] shadow-[0_8px_20px_rgba(10,25,55,0.18)]" : "text-white/72 hover:bg-white/8 hover:text-white",
              )}
            >
              <item.icon className="h-[18px] w-[18px] shrink-0" strokeWidth={active ? 2.4 : 1.8} />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="h-4 w-4" />}
            </button>
          );
        })}
      </nav>
      <div className="m-3 rounded-2xl bg-white/[0.07] p-3">
        <div className="mb-3 flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-white/15">
            <AvatarFallback className="bg-[#DE3038] text-xs font-bold text-white">
              {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{profile.firstName} {profile.lastName}</p>
            <p className="mt-0.5 truncate text-xs text-white/50">{profile.companyName}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold text-white/55 transition-colors hover:bg-white/10 hover:text-white">
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { profile } = useAlumni();
  const activeItem = menuItems.find(item => item.path === location);

  return (
    <div className="min-h-screen bg-[#F4F2EC] text-[#18243B]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] lg:block">
        <SidebarContent />
      </aside>

      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#223760]/[0.08] bg-[#F4F2EC]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-9">
          <div className="flex items-center gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-[#243B6B]/10 bg-white lg:hidden" aria-label="Open navigation">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[286px] border-0 p-0">
                <SheetTitle className="sr-only">Alumni dashboard navigation</SheetTitle>
                <SidebarContent onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
            <div className="lg:hidden"><BrandMark compact /></div>
            <div className="hidden lg:block">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6E7480]">Alumni dashboard</p>
              <p className="mt-1 text-sm font-bold text-[#243B6B]">{activeItem?.label ?? "Workspace"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="relative grid h-10 w-10 place-items-center rounded-xl bg-white text-[#243B6B] shadow-[0_4px_20px_rgba(31,47,82,0.06)] transition-transform active:scale-[0.97]" aria-label="Notifications">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-white bg-[#DE3038]" />
            </button>
            <button onClick={() => setLocation("/profile")} className="flex items-center gap-2 rounded-xl bg-white py-1.5 pl-1.5 pr-2.5 text-left shadow-[0_4px_20px_rgba(31,47,82,0.06)] transition-transform active:scale-[0.98]">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-[#FDE9A4] text-[11px] font-bold text-[#243B6B]">{profile.firstName.charAt(0)}{profile.lastName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="hidden max-w-[140px] truncate text-xs font-bold text-[#243B6B] sm:block">{profile.firstName} {profile.lastName}</span>
            </button>
          </div>
        </header>
        <main className="min-h-[calc(100vh-72px)] p-4 sm:p-6 lg:p-9">{children}</main>
      </div>
    </div>
  );
}
