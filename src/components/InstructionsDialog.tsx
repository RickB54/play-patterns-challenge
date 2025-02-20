
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface InstructionsDialogProps {
  children: React.ReactNode;
}

export const InstructionsDialog = ({ children }: InstructionsDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Instructions</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-left">
            <ul className="space-y-4">
              <li>• Choose either to Play a Game or Practice a Randomly Selected Table</li>
              <li>• Select your Skill Level to match your game</li>
              <li>• Play from a Random Pool Table Setup according to your skill level preference</li>
              <li>• Score points based on your performance of each round</li>
              <li>• Single and Multiplayer Modes</li>
              <li>• Track your progress with an integrated Score Keeper</li>
              <li>• View and manage player achievements in the Awards section:
                <ul className="pl-6 mt-2 space-y-2">
                  <li>- Add new awards using the "+" button</li>
                  <li>- Filter awards by player name and date</li>
                  <li>- Track special achievements like Perfect Games and Quick Victories</li>
                  <li>- View award details including description and date earned</li>
                </ul>
              </li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
