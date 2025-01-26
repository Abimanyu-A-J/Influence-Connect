import React from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';

export function ProfilePage() {
  // Database: Get user profile
  const userType = 'influencer'; // Replace with actual user type
  const profile = {
    name: '',
    bio: '',
    socialLinks: {},
  }; // Replace with actual profile data

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Profile Settings</h1>
        
        <div className="bg-white shadow-sm rounded-lg">
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={profile.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                value={profile.bio}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium">Social Links</h3>
              <div className="mt-2 space-y-2">
                {Object.entries(profile.socialLinks).map(([platform, url]) => (
                  <div key={platform}>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {platform}
                    </label>
                    <input
                      type="url"
                      value={url}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                ))}
              </div>
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