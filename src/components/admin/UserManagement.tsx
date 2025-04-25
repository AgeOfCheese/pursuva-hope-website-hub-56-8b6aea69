import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { UserDocument } from '@/types/firebase';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/useUser';

export default function UserManagement() {
  const [users, setUsers] = useState<UserDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersData: UserDocument[] = [];
        querySnapshot.forEach((doc) => {
          usersData.push({ uid: doc.id, ...doc.data() } as UserDocument);
        });
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast({
          title: 'Error',
          description: 'Failed to load users',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [toast]);

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4">Name</th>
              <th className="text-left py-2 px-4">Email</th>
              <th className="text-left py-2 px-4">Role</th>
              <th className="text-left py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserRow key={user.uid} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UserRow({ user }: { user: UserDocument }) {
  const { updateUserRole, loading } = useUser(user.uid);
  const { toast } = useToast();

  const handleRoleChange = async () => {
    const newRole = user.role === 'admin' ? 'student' : 'admin';
    const success = await updateUserRole(newRole);
    
    if (success) {
      toast({
        title: 'Success',
        description: `User role updated to ${newRole}`,
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to update user role',
        variant: 'destructive',
      });
    }
  };

  return (
    <tr key={user.uid} className="border-b">
      <td className="py-2 px-4">{user.displayName || '-'}</td>
      <td className="py-2 px-4">{user.email}</td>
      <td className="py-2 px-4">
        <span className={`px-2 py-1 rounded text-xs ${
          user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {user.role}
        </span>
      </td>
      <td className="py-2 px-4">
        <Button
          size="sm"
          variant={user.role === 'admin' ? 'destructive' : 'default'}
          onClick={handleRoleChange}
          disabled={loading}
        >
          {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
        </Button>
      </td>
    </tr>
  );
}