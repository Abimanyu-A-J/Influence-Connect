import React from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { CampaignList } from '../../components/campaigns/CampaignList';

export function BrowseCampaignsPage() {
  // Database: Get available campaigns
  const fetchCampaigns = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/campaign"); // Correct URL
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const campaigns = await response.json(); // Parse JSON response
      console.log("Campaigns:", campaigns);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };
  const campaigns = []; // Replace with actual campaigns from database

  return (
    <DashboardLayout userType="influencer">
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Browse Campaigns</h1>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <input
            type="text"
            placeholder="Search campaigns..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <CampaignList 
          campaigns={campaigns}
          onApply={(campaignId) => {
            // Database: Handle campaign application
            console.log('Apply to campaign:', campaignId);
          }}
        />
      </div>
    </DashboardLayout>
  );
}