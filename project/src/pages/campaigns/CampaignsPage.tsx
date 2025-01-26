import React from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { CampaignList } from '../../components/campaigns/CampaignList';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CampaignsPage() {
  // Database: Get user's campaigns
  const campaigns = []; // Replace with actual campaigns from database

  return (
    <DashboardLayout userType="sponsor">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">My Campaigns</h1>
          <Link
            to="/campaigns/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Campaign
          </Link>
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