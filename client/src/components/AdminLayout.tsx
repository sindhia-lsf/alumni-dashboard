import { BrandMark } from "@/components/BrandMark";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAdmin } from "@/contexts/AdminContext";
import { useAlumni } from "@/contexts/AlumniContext";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Bell,
  BookOpenText,
  ChevronRight,
  ClipboardList,
  Home,
  LogOut,
  Megaphone,
  Menu,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

const adminMenuItems = [
  { icon: Home, label: "Overview", path: "/admin" },
  { icon: ClipboardList, label: "Meeting requests", path: "/admin/requests" },
  { icon: Megaphone, label: "Announcements", path: "/admin/announcements" },
  { icon: BookOpenText, label: "Resources", path: "/admin/resources" },
  { icon: UsersRound, label: "Cohort", path: "/admin/cohort" },
];

function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const [location, setLocation] = useLocation();
  const { admin } = useAdmin();
  const { logout } = useAlumni();

  const navigate = (path: string) => {
    setLocation(path);
    onNavigate?.();
  };

  const handleLogout = () => {
    logout();
    window.sessionStorage.removeItem("lightship-access-mode");
    setLocation("/");
    onNavigate?.();
  };

  return (
    <div className="flex h-full flex-col bg-[#1D315B] text-white">
      <div className="px-6 pb-6 pt-7">
        <BrandMark inverse />
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#FDE9A4]/20 bg-[#FDE9A4]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#FDE9A4]">
          <ShieldCheck className="h-3.5 w-3.5" /> Team administration
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3" aria-label="Administration navigation">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Manage workspace</p>
        {adminMenuItems.map(item => {
          const active = item.path === "/admin" ? location === "/admin" : location.startsWith(item.path);
          return (
            <button key={item.path} onClick={() => navigate(item.path)} className={cn("group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-all duration-200", active ? "bg-[#FDE9A4] text-[#243B6B] shadow-[0_8px_20px_rgba(10,25,55,0.2)]" : "text-white/72 hover:bg-white/8 hover:text-white")}>
              <item.icon className="h-[18px] w-[18px] shrink-0" strokeWidth={active ? 2.4 : 1.8} />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="h-4 w-4" />}
            </button>
          );
        })}
      </nav>
      <div className="m-3 rounded-2xl bg-white/[0.07] p-3">
        <div className="mb-3 flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-white/15"><AvatarFallback className="bg-[#DE3038] text-xs font-bold text-white">{admin.initials}</AvatarFallback></Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{admin.name}</p>
            <p className="mt-0.5 truncate text-xs text-white/50">{admin.role}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold text-white/55 transition-colors hover:bg-white/10 hover:text-white"><LogOut className="h-4 w-4" /> Log out</button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { admin, requests } = useAdmin();
  const activeItem = adminMenuItems.find(item => item.path === "/admin" ? location === "/admin" : location.startsWith(item.path));
  const newRequests = requests.filter(request => request.status === "New").length;

  return (
    <div className="min-h-screen bg-[#F4F2EC] text-[#18243B]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[272px] lg:block"><AdminSidebar /></aside>
      <div className="lg:pl-[272px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#223760]/[0.08] bg-[#F4F2EC]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-9">
          <div className="flex items-center gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild><Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-[#243B6B]/10 bg-white lg:hidden" aria-label="Open administration navigation"><Menu className="h-5 w-5" /></Button></SheetTrigger>
              <SheetContent side="left" className="w-[292px] border-0 p-0"><SheetTitle className="sr-only">Lightship administration navigation</SheetTitle><AdminSidebar onNavigate={() => setOpen(false)} /></SheetContent>
            </Sheet>
            <div className="lg:hidden"><BrandMark compact /></div>
            <div className="hidden lg:block">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6E7480]"><BarChart3 className="h-3.5 w-3.5" /> Lightship administration</p>
              <p className="mt-1 text-sm font-bold text-[#243B6B]">{activeItem?.label ?? "Team workspace"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={() => setLocation("/admin/requests")} className="relative grid h-10 w-10 place-items-center rounded-xl bg-white text-[#243B6B] shadow-[0_4px_20px_rgba(31,47,82,0.06)] transition-transform active:scale-[0.97]" aria-label="Open new meeting requests">
              <Bell className="h-[18px] w-[18px]" />
              {newRequests > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full border-2 border-[#F4F2EC] bg-[#DE3038] px-1 text-[9px] font-bold text-white">{newRequests}</span>}
            </button>
            <div className="flex items-center gap-2 rounded-xl bg-white py-1.5 pl-1.5 pr-3 shadow-[0_4px_20px_rgba(31,47,82,0.06)]">
              <Avatar className="h-8 w-8"><AvatarFallback className="bg-[#FDE9A4] text-[11px] font-bold text-[#243B6B]">{admin.initials}</AvatarFallback></Avatar>
              <span className="hidden max-w-[150px] truncate text-xs font-bold text-[#243B6B] sm:block">{admin.name}</span>
            </div>
          </div>
        </header>
        <main className="min-h-[calc(100vh-72px)] p-4 sm:p-6 lg:p-9">{children}</main>
      </div>
    </div>
  );
}
