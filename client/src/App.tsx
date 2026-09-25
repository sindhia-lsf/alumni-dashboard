import DashboardLayout from "@/components/DashboardLayout";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AlumniProvider } from "@/contexts/AlumniContext";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Luminaries from "@/pages/Luminaries";
import NotFound from "@/pages/NotFound";
import Onboarding from "@/pages/Onboarding";
import Profile from "@/pages/Profile";
import Resources from "@/pages/Resources";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function DashboardPage({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/home"><DashboardPage><Home /></DashboardPage></Route>
      <Route path="/profile"><DashboardPage><Profile /></DashboardPage></Route>
      <Route path="/resources"><DashboardPage><Resources /></DashboardPage></Route>
      <Route path="/luminaries"><DashboardPage><Luminaries /></DashboardPage></Route>
      <Route path="/contact"><DashboardPage><Contact /></DashboardPage></Route>
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
            <Toaster position="top-right" richColors />
            <Router />
          </AlumniProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
