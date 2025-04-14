import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { useUser } from '../../components/context/UserContext';
import { useNavigate } from 'react-router-dom';

export function ProfilePage() {
  const { user } = useUser();
  const navigator = useNavigate();
  const [edit, setEdit] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>({});
  const [loading, setLoading] = useState(true);

  // Fetch profile data from backend
  const fetchProfile = async (userId: string, role: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/profile?userId=${userId}&role=${role}`);
      const data = await res.json();

      if (res.ok && data.profile) {
        setProfile(data.profile);
      } else {
        console.warn('Profile not found from backend, falling back to context.');
        // Fallback to context-based default
        if (role === 'Admin') {
          setProfile({
            Name: user.User_name || '',
          });
        } else if (role === 'Influencer') {
          setProfile({
            Name: user.User_name || '',
            Category: user.Category || '',
            Reach: user.Reach || '',
          });
        } else if (role === 'Sponsor') {
          setProfile({
            Company_name: user.Company_name || '',
            Category: user.Category || '',
          });
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      alert('Failed to load profile from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      const role = user.Role;
      setUserType(role);
      fetchProfile(user.User_id, role);
    } else {
      navigator('/login');
    }
  }, [user]);

  const saveEdit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.User_id, // Corrected to user.User_id
          role: user.Role,
          profile,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Profile updated successfully:', data.message);
        setEdit(false);
      } else {
        console.error('Error updating profile:', data.message);
        alert('Failed to save changes. Please try again.');
      }
    } catch (error) {
      console.error('Request error:', error);
      alert('An error occurred while saving. Please check console.');
    }
  };

  if (!user || loading) {
    return <div className="p-6 text-center text-lg">Loading...</div>;
  }

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Profile Settings : {userType}</h1>

        <div className="bg-white shadow-sm rounded-lg">
          <div className="p-6 space-y-4">
            {userType === 'Admin' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={profile.Name}
                  onChange={(e) => setProfile({ ...profile, Name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  disabled={!edit}
                />
              </div>
            )}

            {userType === 'Influencer' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={profile.Name}
                    onChange={(e) => setProfile({ ...profile, Name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    disabled={!edit}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    value={profile.Category}
                    onChange={(e) => setProfile({ ...profile, Category: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    disabled={!edit}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Reach</label>
                  <input
                    type="text"
                    value={profile.Reach}
                    onChange={(e) => setProfile({ ...profile, Reach: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    disabled={!edit}
                  />
                </div>
              </>
            )}

            {userType === 'Sponsor' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    value={profile.Company_name}
                    onChange={(e) => setProfile({ ...profile, Company_name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    disabled={!edit}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    value={profile.Category}
                    onChange={(e) => setProfile({ ...profile, Category: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    disabled={!edit}
                  />
                </div>
              </>
            )}

            <div className="flex justify-center align-items-center w-full gap-2">
              <button
                type="button"
                className="mt-4 w-[30%] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={() => setEdit(!edit)}
              >
                {edit ? 'Cancel' : 'Edit'}
              </button>
              <button
                type="button"
                className="mt-4 w-[30%] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300"
                onClick={saveEdit}
                disabled={!edit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}