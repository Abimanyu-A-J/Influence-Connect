import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { ListItem } from './Listitem'; // Adjust the path as necessary

export function DashboardPage() {
  const userType = 'influencer'; // Replace with actual user type from auth
  const [applicationList, setApplicationList] = useState([]);
  const [campaignList, setCampaignList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust as needed
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {

    const fetchCampaigns = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/campaign');
        if (!response.ok) throw new Error('Failed to fetch campaigns');
        const data = await response.json();
        setCampaignList(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchCampaigns()]);
      setLoading(false);
    };

    fetchData();
  }, []);


  const totalApplications = campaignList.length;
  const totalCampaigns = campaignList.length;

  const currentApplications = campaignList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const currentCampaigns = campaignList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) return <DashboardLayout><h2 className='text-xl font-semibold text-gray-900'>Loading...</h2></DashboardLayout>;
  // if (error) return <DashboardLayout><h2 className='text-xl font-semibold text-gray-900'>Error: {error}</h2></DashboardLayout>;

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        {userType === 'influencer' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium">Active Applications</h2>
              <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                {currentApplications.map((application) => (
                  <ListItem key={application._id} item={application} type="application" />
                ))}
              </ul>
              <div className="flex justify-between mt-4">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalApplications / itemsPerPage)))} disabled={currentPage === Math.ceil(totalApplications / itemsPerPage)}>Next</button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium">Recent Campaigns</h2>
              <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                {currentCampaigns.map((campaign) => (
                  <ListItem key={campaign.C_id} item={campaign} type="campaign" />
                ))}
              </ul>
              <div className="flex justify-between mt-4">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalCampaigns / itemsPerPage)))} disabled={currentPage === Math.ceil(totalCampaigns / itemsPerPage)}>Next</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium">Active Campaigns</h2>
              <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                {currentCampaigns.map((campaign) => (
                  <ListItem key={campaign.C_id} item={campaign} type="campaign" />
                ))}
              </ul>
              <div className="flex justify-between mt-4">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalCampaigns / itemsPerPage)))} disabled={currentPage === Math.ceil(totalCampaigns / itemsPerPage)}>Next</button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium">Recent Applications</h2>
              <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                {currentApplications.map((application) => (
                  <ListItem key={application._id} item={application} type="application" />
                ))}
              </ul>
              <div className="flex justify-between mt-4">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalApplications / itemsPerPage)))} disabled={currentPage === Math.ceil(totalApplications / itemsPerPage)}>Next</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}