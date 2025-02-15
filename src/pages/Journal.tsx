
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Pencil, Trash2, Calendar as CalendarIcon } from "lucide-react";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Journal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { entries, addEntry, deleteEntry, editEntry } = useJournalStore();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editingEntry, setEditingEntry] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [mood, setMood] = useState<string>("neutral");
  const [dialogOpen, setDialogOpen] = useState(false);

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
        mood: mood,
      });
      toast({
        title: "Entry Updated",
        description: "Your journal entry has been updated",
      });
    } else {
      addEntry({
        title: newTitle,
        content: newContent,
        mood: mood,
      });
      toast({
        title: "Entry Added",
        description: "Your journal entry has been saved",
      });
    }

    setNewTitle("");
    setNewContent("");
    setMood("neutral");
    setEditingEntry(null);
    setDialogOpen(false);
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
    setMood(entry.mood || "neutral");
    setDialogOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setNewTitle("");
      setNewContent("");
      setMood("neutral");
      setEditingEntry(null);
    }
  };

  const filteredEntries = entries.filter((entry) => {
    if (!selectedDate) return true;
    const entryDate = new Date(entry.date);
    return (
      entryDate.getDate() === selectedDate.getDate() &&
      entryDate.getMonth() === selectedDate.getMonth() &&
      entryDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const calendarDates = entries.map((entry) => new Date(entry.date));

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold">Journal</h2>
        <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
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
              <Select value={mood} onValueChange={setMood}>
                <SelectTrigger>
                  <SelectValue placeholder="Select mood" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="happy">😊 Happy</SelectItem>
                  <SelectItem value="neutral">😐 Neutral</SelectItem>
                  <SelectItem value="sad">😢 Sad</SelectItem>
                  <SelectItem value="excited">🎉 Excited</SelectItem>
                  <SelectItem value="tired">😴 Tired</SelectItem>
                </SelectContent>
              </Select>
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

      <div className="mb-6 flex justify-between items-center">
        <div className="flex gap-4">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
          >
            List View
          </Button>
          <Button
            variant={viewMode === "calendar" ? "default" : "outline"}
            onClick={() => setViewMode("calendar")}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            Calendar View
          </Button>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarIcon className="w-4 h-4 mr-2" />
              {selectedDate ? format(selectedDate, "PPP") : "Filter by date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
              disabled={(date) =>
                !calendarDates.some(
                  (d) =>
                    d.getDate() === date.getDate() &&
                    d.getMonth() === date.getMonth() &&
                    d.getFullYear() === date.getFullYear()
                )
              }
            />
          </PopoverContent>
        </Popover>
      </div>

      {viewMode === "calendar" ? (
        <Card className="p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            disabled={(date) =>
              !calendarDates.some(
                (d) =>
                  d.getDate() === date.getDate() &&
                  d.getMonth() === date.getMonth() &&
                  d.getFullYear() === date.getFullYear()
              )
            }
          />
        </Card>
      ) : (
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <Card key={entry.id} className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{entry.title}</h3>
                      <span className="text-xl">
                        {entry.mood === "happy" && "😊"}
                        {entry.mood === "sad" && "😢"}
                        {entry.mood === "neutral" && "😐"}
                        {entry.mood === "excited" && "🎉"}
                        {entry.mood === "tired" && "😴"}
                      </span>
                    </div>
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
      )}
    </div>
  );
};

export default Journal;
