import React, { useEffect } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { useUser } from '../../components/context/UserContext';
import { useNavigate } from 'react-router-dom';

export function DashboardPage() {
  // Database: Get user type and dashboard data
  const userType = 'influencer'; // Replace with actual user type from auth
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) {
      navigate("/login");
    }
  })

  if(!user) {
    return null
  }

  return (
    <DashboardLayout userType={user.Role.toLowerCase()} user={user}>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard {user && user.Role}</h1>
        
        {userType === 'influencer' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium">Active Applications</h2>
              {/* Database: Display active campaign applications */}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium">Recent Campaigns</h2>
              {/* Database: Display recent campaigns */}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium">Active Campaigns</h2>
              {/* Database: Display active campaigns */}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium">Recent Applications</h2>
              {/* Database: Display recent applications */}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}