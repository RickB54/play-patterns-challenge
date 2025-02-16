
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RulesDialogProps {
  children: React.ReactNode;
}

export const RulesDialog = ({ children }: RulesDialogProps) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const rules = {
    1: (
      <>
        <h3 className="font-bold mb-4">Game Setup:</h3>
        <ul className="space-y-2 text-sm">
          <li>• Play Game: Hit the "Play Game" button to initialize the game.</li>
          <li>• Practice a Table: To practice a table without going into game mode, press "Practice a Table" on the home screen.</li>
          <li>• Set Number of Rounds: Choose how many rounds you would like to play. You can change your mind later if you wish.</li>
          <li>• Set Players: Choose the Number of Players participating from the drop down menu. Then input the Player Names.</li>
          <li>• Select Level of Difficulty: Choose one of the pool table pictures that you would like to start with according to the level of difficulty from one of the predetermined table setups. Select your desired skill level, ranging from Easy to Expert.</li>
        </ul>
      </>
    ),
    2: (
      <>
        <h3 className="font-bold mb-4">Flow of the Game:</h3>
        <ul className="space-y-2 text-sm">
          <li>• Enter Scores: After each player's turn, input their score. Each ball legally pocketed (except 8-ball) is 1 point. The 8-Ball is 2 points.</li>
          <li>• The Player's turn ends as soon as they miss their first shot.</li>
          <li>• Select Table: From the pull-down menu, choose a Skill Level to begin each round: (Select between Easy, Intermediate, Advanced, and Expert table setup modes.) After all players complete their turns, this button selects the next random pool table setup and automatically updates the number of rounds.</li>
          <li>• Objective: The goal is to accumulate the highest score by pocketing balls successfully. In the event of a tie, players with the highest matching scores will play a tiebreaker round.</li>
          <li>• End Game: This ends the game and sends you to the Winner's Circle. Press Leave Game or go back into the game by pressing Continue Playing.</li>
        </ul>
      </>
    ),
    3: (
      <>
        <h3 className="font-bold mb-4">Settings & Features:</h3>
        <ul className="space-y-2 text-sm">
          <li>• Fullscreen Mode: Toggle fullscreen view for a more immersive gaming experience.</li>
          <li>• Shot Clock: Enable a timer to add pressure and keep the game moving.</li>
          <li>• Progression Tracker: Monitor your improvement and gaming statistics over time.</li>
          <li>• View Awards: See earned achievements and special recognitions.</li>
          <li>• Journal: Keep notes about your games and track your learning progress.</li>
          <li>• Rules of the Game: Access this comprehensive guide to game rules and features.</li>
          <li>• Start New Round: Begin a fresh round while keeping the current game session.</li>
          <li>• End Game: Conclude the current game and view final results in the Winner's Circle.</li>
        </ul>
      </>
    ),
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rules of the Game</DialogTitle>
          </DialogHeader>
          <div className="mt-4">{rules[page as keyof typeof rules]}</div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="btn-secondary"
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(3, p + 1))}
              className="btn-primary"
              disabled={page === 3}
            >
              Next
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
