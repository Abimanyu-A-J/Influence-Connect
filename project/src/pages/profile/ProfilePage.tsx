import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { useUser } from '../../components/context/UserContext';
import { useNavigate } from 'react-router-dom';

export function ProfilePage() {
  const { user } = useUser(); // Destructure to get the user directly
  const navigator = useNavigate();
  const [userType, setUserType] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>({
    Name: '',
    Role: '',
    socialLinks: {},
  });

  useEffect(() => {
    if (user) {
      console.log(user);
      setProfile({
        Name: user.User_name,
        Role: user.Role
      });
    } else {
      navigator('/login');
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>; // Show a loading state while waiting for user context
  }

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Profile Settings {userType}</h1>

        <div className="bg-white shadow-sm rounded-lg">
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name {}</label>
              <input
                type="text"
                value={profile.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium">Social Links</h3>
            </div>

            <button
              type="button"
              className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}