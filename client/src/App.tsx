import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import NotFoundPage from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import AssessmentPage from "@/pages/assessment";
import GamesPage from "@/pages/games-page";
import MusicTherapyPage from "@/pages/music-therapy";
import MemoryMatchGame from "@/pages/games/memory-match";
import { ProtectedRoute } from "./lib/protected-route";
import OnboardingPage from "@/pages/onboarding-page";

function Router() {
  return (
    <Switch>
      <Route path="/" component={OnboardingPage} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/dashboard" component={HomePage} />
      <ProtectedRoute path="/assessment" component={AssessmentPage} />
      <ProtectedRoute path="/games" component={GamesPage} />
      <ProtectedRoute path="/games/memory-match" component={MemoryMatchGame} />
      <ProtectedRoute path="/music-therapy" component={MusicTherapyPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;