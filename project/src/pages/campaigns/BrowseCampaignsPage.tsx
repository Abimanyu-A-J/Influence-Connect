import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { CampaignList } from "../../components/campaigns/CampaignList";
import { FilterBox } from "../../components/campaigns/FilterBox";

interface Campaign {
  _id: string;
  Name: string;
  Company_name: string;
  Budget: number;
  Start_date: string;
}

export function BrowseCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const fetchAllCampaigns = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/campaign");
      if (!response.ok) {
        alert(response.status);
        return;
      }
      const fetched = await response.json();
      setCampaigns(fetched);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  const fetchCampaigns = async (filters: { attribute: string; sort: string; value?: string }) => {
    try {
      const response = await fetch("http://localhost:5000/api/campaign/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const fetchedCampaigns = await response.json();
      setCampaigns(fetchedCampaigns);
      console.log("Filtered Campaigns:", fetchedCampaigns);
    } catch (error) {
      console.error("Error fetching filtered campaigns:", error);
    }
  };

  const [filters, setFilters] = useState({
    attribute: "Budget", // Use exact field name
    sort: "0", // Ascending sort by default
    value: "",
  });

  const handleFilterChange = (newFilters: { attribute: string; sort: string; value?: string }) => {
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

          {/* Search Box (you can enhance this later) */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <input
              type="text"
              placeholder="Search campaigns..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Campaign List */}
          <div className="bg-gray-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2 rounded-lg">
            {campaigns.map((campaign: Campaign) => (
              <div key={campaign._id} className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold">{campaign.Name}</h3>
                <p className="text-sm text-gray-500">{campaign.Company_name}</p>
                <p className="text-sm">Budget: ${campaign.Budget}</p>
                <p className="text-xs text-gray-400">
                  Posted: {new Date(campaign.Start_date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Box */}
        <div className="w-72">
          <FilterBox onFilterChange={handleFilterChange} />
        </div>
      </div>
    </DashboardLayout>
  );
}
