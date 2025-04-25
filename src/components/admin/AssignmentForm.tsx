import { useState } from 'react';
import { db } from '@/firebaseConfig';
import { collection, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { Assignment } from '@/types/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface AssignmentFormProps {
  groups: string[];
  onSuccess?: () => void;
}

export default function AssignmentForm({ groups, onSuccess }: AssignmentFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !dueDate || selectedGroups.length === 0) {
      toast({
        title: 'Error',
        description: 'Please fill all fields and select at least one group',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const assignment: Omit<Assignment, 'id'> = {
        title,
        description,
        dueDate,
        groups: selectedGroups,
        createdAt: serverTimestamp(), // This is now properly typed
      };

      await addDoc(collection(db, 'assignments'), assignment);

      toast({
        title: 'Success',
        description: 'Assignment created successfully',
      });

      setTitle('');
      setDescription('');
      setDueDate('');
      setSelectedGroups([]);

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error creating assignment:', error);
      toast({
        title: 'Error',
        description: 'Failed to create assignment',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... rest of the component remains the same ...
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields remain the same */}
    </form>
  );
}