
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Setup from "./pages/Setup";
import Game from "./pages/Game";
import Settings from "./pages/Settings";
import Score from "./pages/Score";
import WinnersCircle from "./pages/WinnersCircle";
import SkillLevels from "./pages/SkillLevels";
import ProgressionTracker from "./components/progression/ProgressionTracker";
import Awards from "./pages/Awards";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skill-levels" element={<SkillLevels />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/game" element={<Game />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/score" element={<Score />} />
            <Route path="/winners-circle" element={<WinnersCircle />} />
            <Route path="/progression" element={<ProgressionTracker />} />
            <Route path="/awards" element={<Awards />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
