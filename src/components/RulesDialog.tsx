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
          <li>• Set Players: Choose the number of players participating. Input the number and press the "Set Players" button to confirm.</li>
          <li>• Select Level of Difficulty: From the dropdown menu, select your desired skill level, ranging from Easy to Expert.</li>
          <li>• Start Round: Press "Start Round" to begin. Place the balls on your pool table matching the displayed setup. Place the balls on the pool table in the exact intersecting diamond locations as specified in the pool table setup picture.</li>
        </ul>
      </>
    ),
    2: (
      <>
        <h3 className="font-bold mb-4">Flow of the Game:</h3>
        <ul className="space-y-2 text-sm">
          <li>• Objective: The goal is to accumulate the highest score by pocketing balls successfully. In the event of a tie, players with the highest matching scores will play a tiebreaker round.</li>
          <li>• Enter Scores: After each player's turn, input their score. Each ball legally pocketed (except 8-ball) is 1 point. The 8-Ball is 2 points.</li>
          <li>• The Player's turn ends at the first missed ball.</li>
          <li>• Next Round: After all players complete their turns, select another pool table setup.</li>
          <li>• End Game: This ends the game and sends you to the Winner's Circle. Press Leave Game or go back into the game by pressing Continue Playing.</li>
        </ul>
      </>
    ),
    3: (
      <>
        <h3 className="font-bold mb-4">Additional Options:</h3>
        <ul className="space-y-2 text-sm">
          <li>• Start New Round: Move to a new randomly selected pool table setup.</li>
          <li>• Settings: Adjust game settings or choose other options.</li>
          <li>• Rules: Review these rules anytime through settings.</li>
          <li>• Winner's Circle: View final scores and rankings of all players.</li>
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