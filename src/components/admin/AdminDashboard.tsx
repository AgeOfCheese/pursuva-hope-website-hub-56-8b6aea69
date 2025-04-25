import { useState, useEffect } from 'react';
import { db } from '@/firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Assignment } from '@/types/firebase.ts';
import AdminLayout from '@/components/admin/AdminLayout';
import AssignmentForm from '@/components/admin/AssignmentForm';

export default function AdminDashboardPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [groups, setGroups] = useState<string[]>(['Math101', 'Science202', 'English303']); // Replace with your groups

  useEffect(() => {
    const q = query(collection(db, 'assignments'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const assignmentsData: Assignment[] = [];
      snapshot.forEach((doc) => {
        assignmentsData.push({ id: doc.id, ...doc.data() } as Assignment);
      });
      setAssignments(assignmentsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Create Assignment</h2>
          <AssignmentForm groups={groups} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Current Assignments</h2>
          {assignments.length === 0 ? (
            <p>No assignments created yet</p>
          ) : (
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="border-b pb-4">
                  <h3 className="font-bold">{assignment.title}</h3>
                  <p className="text-gray-600">{assignment.description}</p>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>Due: {new Date(assignment.dueDate).toLocaleString()}</span>
                    <div className="flex gap-2">
                      {assignment.groups.map(group => (
                        <span key={group} className="bg-gray-100 px-2 py-1 rounded">
                          {group}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}