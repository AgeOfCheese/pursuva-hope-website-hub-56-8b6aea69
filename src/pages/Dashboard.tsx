import React from 'react';
import { useAuth } from "@/context/AuthContext"; // Use your Auth context hook

const DashboardPage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
        Dashboard
      </h1>
      {currentUser && ( // Check if currentUser exists before accessing email
        <p className="text-lg mb-10 text-gray-700">
          Welcome back, {currentUser.displayName || currentUser.email}!
        </p>
      )}

      {/* Placeholder Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Assignments Section (Placeholder) */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-pursuva-blue">Assignments</h2>
          <p className="text-gray-600 mb-4">
            Upcoming assignments will be displayed here.
          </p>
          {/* --- Google Classroom Integration Placeholder --- */}
          <div className="border-t pt-4 mt-4">
            <p className="text-sm text-gray-500">
              (Google Classroom integration coming soon)
            </p>
            {/* In a real implementation, you would fetch and display assignments here */}
            <ul>
              {/* Example list item */}
              {/* <li className="py-1">Math Homework - Due Apr 16</li> */}
            </ul>
          </div>
          {/* --- End Placeholder --- */}
        </div>

        {/* Meeting Timings Section (Placeholder) */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-pursuva-purple">Meetings & Tutoring</h2>
          <p className="text-gray-600 mb-4">
            Your scheduled sessions and meeting links will appear here.
          </p>
           {/* --- Google Calendar/Meet Integration Placeholder --- */}
           <div className="border-t pt-4 mt-4">
             <p className="text-sm text-gray-500">
               (Calendar integration coming soon)
             </p>
             {/* Fetch and display meeting info here */}
             <ul>
              {/* Example list item */}
              {/* <li className="py-1">Python Tutoring with Dr. Alex - Apr 15, 3:00 PM PDT <a href="#" className="text-blue-600 hover:underline ml-2">Join Meet</a></li> */}
            </ul>
           </div>
           {/* --- End Placeholder --- */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;