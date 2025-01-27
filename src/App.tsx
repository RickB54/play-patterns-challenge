import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import Game from "@/pages/Game";
import Score from "@/pages/Score";
import Settings from "@/pages/Settings";
import Setup from "@/pages/Setup";
import SkillLevels from "@/pages/SkillLevels";
import WinnersCircle from "@/pages/WinnersCircle";
import Index from "@/pages/Index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/score" element={<Score />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/skill-levels" element={<SkillLevels />} />
        <Route path="/winners-circle" element={<WinnersCircle />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;