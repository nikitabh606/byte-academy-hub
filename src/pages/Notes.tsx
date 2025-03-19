
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Edit, Search, Trash2, Plus, Filter, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { NoteModal, NoteFormValues } from "@/components/NoteModal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Note type definition
interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export default function Notes() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [extractedTags, setExtractedTags] = useState<Set<string>>(new Set());
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Fetch notes from Supabase
  const fetchNotes = async (): Promise<Note[]> => {
    if (!user) return [];
    
    let query = supabase
      .from('notes')
      .select('*')
      .order('updated_at', { ascending: false });
    
    const { data, error } = await query;
    
    if (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
    
    return data || [];
  };

  // React Query for notes
  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
    enabled: !!user,
  });

  // Extract tags from note content
  useEffect(() => {
    const tags = new Set<string>();
    notes.forEach(note => {
      const matches = note.content?.match(/#[a-zA-Z0-9-_]+/g) || [];
      matches.forEach(tag => {
        tags.add(tag.substring(1).toLowerCase());
      });
    });
    setExtractedTags(tags);
  }, [notes]);

  // Create note mutation
  const createNoteMutation = useMutation({
    mutationFn: async (noteData: NoteFormValues) => {
      if (!user) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from('notes')
        .insert([
          {
            title: noteData.title,
            content: noteData.content,
            user_id: user.id,
          }
        ])
        .select();
        
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success("Note created successfully");
    },
    onError: (error) => {
      console.error("Error creating note:", error);
      toast.error("Failed to create note");
    }
  });

  // Update note mutation
  const updateNoteMutation = useMutation({
    mutationFn: async (noteData: NoteFormValues & { id: string }) => {
      if (!user) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from('notes')
        .update({
          title: noteData.title,
          content: noteData.content,
          updated_at: new Date().toISOString(),
        })
        .eq('id', noteData.id)
        .select();
        
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success("Note updated successfully");
    },
    onError: (error) => {
      console.error("Error updating note:", error);
      toast.error("Failed to update note");
    }
  });

  // Delete note mutation
  const deleteNoteMutation = useMutation({
    mutationFn: async (noteId: string) => {
      if (!user) throw new Error("User not authenticated");
      
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId);
        
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success("Note deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  });

  // Handle create note
  const handleCreateNote = async (data: NoteFormValues) => {
    await createNoteMutation.mutateAsync(data);
    setIsCreateModalOpen(false);
  };

  // Handle edit note
  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setIsEditModalOpen(true);
  };

  // Handle update note
  const handleUpdateNote = async (data: NoteFormValues) => {
    if (!selectedNote) return;
    await updateNoteMutation.mutateAsync({
      id: selectedNote.id,
      ...data
    });
    setIsEditModalOpen(false);
    setSelectedNote(null);
  };

  // Handle delete dialog
  const handleDeleteClick = (note: Note) => {
    setSelectedNote(note);
    setIsDeleteDialogOpen(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!selectedNote) return;
    await deleteNoteMutation.mutateAsync(selectedNote.id);
    setIsDeleteDialogOpen(false);
    setSelectedNote(null);
  };

  // Handle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  // Filter notes based on search term and selected tags
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedTags.length === 0) return matchesSearch;
    
    const noteTags = (note.content?.match(/#[a-zA-Z0-9-_]+/g) || [])
      .map(tag => tag.substring(1).toLowerCase());
    
    const matchesTags = selectedTags.every(tag => noteTags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  // Extract preview of content (without hashtags)
  const getContentPreview = (content: string) => {
    return content.replace(/#[a-zA-Z0-9-_]+/g, '').trim();
  };

  // Extract tags from content
  const extractTagsFromContent = (content: string) => {
    const matches = content.match(/#[a-zA-Z0-9-_]+/g) || [];
    return matches.map(tag => tag.substring(1).toLowerCase());
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      
      <main className="pt-20 pb-16 sm:pl-64">
        <div className="container px-4 md:px-8 mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Saved Notes</h1>
              <p className="text-muted-foreground mt-2">
                Access and manage your personal notes and study materials
              </p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> New Note
            </Button>
          </div>

          <div className="mb-6 space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search your notes..." 
                  className="pl-10" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" 
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>

            {extractedTags.size > 0 && (
              <div className="flex flex-wrap gap-2">
                {Array.from(extractedTags).map(tag => (
                  <Badge 
                    key={tag} 
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    #{tag}
                  </Badge>
                ))}
                {selectedTags.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 text-xs" 
                    onClick={() => setSelectedTags([])}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="opacity-70 animate-pulse">
                  <CardHeader className="pb-2">
                    <div className="h-6 w-3/4 bg-muted rounded"></div>
                    <div className="h-4 w-1/4 bg-muted rounded mt-2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 w-full bg-muted rounded mb-2"></div>
                    <div className="h-4 w-full bg-muted rounded mb-2"></div>
                    <div className="h-4 w-2/3 bg-muted rounded"></div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-6 w-1/3 bg-muted rounded"></div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredNotes.map((note) => (
                <Card key={note.id} className="transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-medium">{note.title}</CardTitle>
                    </div>
                    <CardDescription className="text-xs">
                      {format(new Date(note.updated_at), 'MMM d, yyyy')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm line-clamp-3">{getContentPreview(note.content)}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <div className="flex flex-wrap gap-1">
                      {extractTagsFromContent(note.content).slice(0, 2).map((tag) => (
                        <span key={tag} className="inline-block bg-accent text-accent-foreground px-2 py-0.5 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                      {extractTagsFromContent(note.content).length > 2 && (
                        <span className="inline-block bg-accent text-accent-foreground px-2 py-0.5 rounded text-xs">
                          +{extractTagsFromContent(note.content).length - 2}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleEditNote(note)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteClick(note)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No notes found</h3>
              <p className="text-muted-foreground mt-2">
                {searchTerm || selectedTags.length > 0 
                  ? "Try adjusting your search or filters" 
                  : "Create your first note to get started"}
              </p>
              <Button 
                className="mt-4" 
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Create Note
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Create Note Modal */}
      <NoteModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSave={handleCreateNote}
        mode="create"
      />

      {/* Edit Note Modal */}
      {selectedNote && (
        <NoteModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSave={handleUpdateNote}
          note={{
            id: selectedNote.id,
            title: selectedNote.title,
            content: selectedNote.content,
          }}
          mode="edit"
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Note"
        description="Are you sure you want to delete this note? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}
