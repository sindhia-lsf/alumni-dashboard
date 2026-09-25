import AdminLayout from "@/components/AdminLayout";
import DashboardLayout from "@/components/DashboardLayout";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminProvider } from "@/contexts/AdminContext";
import { AlumniProvider } from "@/contexts/AlumniContext";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Luminaries from "@/pages/Luminaries";
import NotFound from "@/pages/NotFound";
import Onboarding from "@/pages/Onboarding";
import Profile from "@/pages/Profile";
import Resources from "@/pages/Resources";
import Updates from "@/pages/Updates";
import AdminAnnouncements from "@/pages/admin/AdminAnnouncements";
import AdminCohort from "@/pages/admin/AdminCohort";
import AdminFounderProfile from "@/pages/admin/AdminFounderProfile";
import AdminHome from "@/pages/admin/AdminHome";
import AdminRequests from "@/pages/admin/AdminRequests";
import AdminResources from "@/pages/admin/AdminResources";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function DashboardPage({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

function AdminPage({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/home"><DashboardPage><Home /></DashboardPage></Route>
      <Route path="/updates"><DashboardPage><Updates /></DashboardPage></Route>
      <Route path="/profile"><DashboardPage><Profile /></DashboardPage></Route>
      <Route path="/resources"><DashboardPage><Resources /></DashboardPage></Route>
      <Route path="/luminaries"><DashboardPage><Luminaries /></DashboardPage></Route>
      <Route path="/contact"><DashboardPage><Contact /></DashboardPage></Route>
      <Route path="/admin"><AdminPage><AdminHome /></AdminPage></Route>
      <Route path="/admin/requests"><AdminPage><AdminRequests /></AdminPage></Route>
      <Route path="/admin/announcements"><AdminPage><AdminAnnouncements /></AdminPage></Route>
      <Route path="/admin/resources"><AdminPage><AdminResources /></AdminPage></Route>
      <Route path="/admin/cohort/:id"><AdminPage><AdminFounderProfile /></AdminPage></Route>
      <Route path="/admin/cohort"><AdminPage><AdminCohort /></AdminPage></Route>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <AlumniProvider>
            <AdminProvider>
              <Toaster position="top-right" richColors />
              <Router />
            </AdminProvider>
          </AlumniProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
