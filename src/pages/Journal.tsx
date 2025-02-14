
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useJournalStore } from "@/store/journalStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

const Journal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { entries, addEntry, deleteEntry, editEntry } = useJournalStore();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editingEntry, setEditingEntry] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      toast({
        title: "Required Fields",
        description: "Please fill in both title and content",
        variant: "destructive",
      });
      return;
    }

    if (editingEntry) {
      editEntry(editingEntry, {
        title: newTitle,
        content: newContent,
      });
      toast({
        title: "Entry Updated",
        description: "Your journal entry has been updated",
      });
    } else {
      addEntry({
        title: newTitle,
        content: newContent,
      });
      toast({
        title: "Entry Added",
        description: "Your journal entry has been saved",
      });
    }

    setNewTitle("");
    setNewContent("");
    setEditingEntry(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      deleteEntry(id);
      toast({
        title: "Entry Deleted",
        description: "Your journal entry has been removed",
      });
    }
  };

  const handleEdit = (entry: any) => {
    setEditingEntry(entry.id);
    setNewTitle(entry.title);
    setNewContent(entry.content);
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold">Journal</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Plus className="w-5 h-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingEntry ? "Edit Entry" : "New Entry"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <Textarea
                placeholder="Write your thoughts..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="min-h-[200px]"
              />
              <Button onClick={handleSubmit} className="w-full">
                {editingEntry ? "Update Entry" : "Save Entry"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-4">
          {entries.map((entry) => (
            <Card key={entry.id} className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{entry.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(entry.date), "PPp")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(entry)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(entry.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="whitespace-pre-wrap">{entry.content}</p>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Journal;
