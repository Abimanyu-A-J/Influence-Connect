import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { CampaignList } from '../../components/campaigns/CampaignList';
import { FilterBox } from '../../components/campaigns/FilterBox';

interface Campaign {
  id: string;
  title: string;
  company: string;
  budget: number;
  createdAt: string;
}

export function BrowseCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const fetchAllCampaigns = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/campaign");
      if(!response.ok) {
        alert(response.status);
      }
      const fetched = await response.json();
      setCampaigns(fetched);
    } catch(er) {
      console.log(er);
    }
  };

  const fetchCampaigns = async (filters: { budgetRange: string; sort: string; company: string }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/campaign/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attribute: 'budget', // Example attribute, adjust as needed
          value: filters.budgetRange,
          sort: filters.sort,
        }),
      }); // Fetch with filters
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const fetchedCampaigns = await response.json(); // Parse JSON response
      setCampaigns(fetchedCampaigns); // Store fetched campaigns in state
      console.log("Campaigns:", fetchedCampaigns);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };



  const [filters, setFilters] = useState({
    budgetRange: '',
    sort: 'latest',
    company: ''
  });

  const handleFilterChange = (newFilters: {
    budgetRange: string;
    sort: string;
    company: string;
  }) => {
    setFilters(newFilters);
    fetchCampaigns(newFilters);
  };

  useEffect(() => {
    fetchAllCampaigns();
  }, []);

  return (
    <DashboardLayout userType="influencer">
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          <h1 className="text-2xl font-semibold text-gray-900">Browse Campaigns</h1>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <input
              type="text"
              placeholder="Search campaigns..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign: Campaign) => (
              <div key={campaign.id} className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold">{campaign.Name}</h3>
                <p className="text-sm text-gray-500">{campaign.Company_name}</p>
                <p className="text-sm">Budget: ${campaign.Budget}</p>
                <p className="text-xs text-gray-400">
                  Posted: {new Date(campaign.Start_Date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-72">
          <FilterBox onFilterChange={handleFilterChange} />
        </div>
      </div>
    </DashboardLayout>
  );
}