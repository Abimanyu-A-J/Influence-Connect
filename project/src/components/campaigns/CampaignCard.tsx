import React from 'react';
import { Calendar, DollarSign, Users } from 'lucide-react';
import { Campaign } from '@/types';

interface CampaignCardProps {
  campaign: Campaign;
  onApply?: () => void;
  showApplyButton?: boolean;
}

export function CampaignCard({ campaign, onApply, showApplyButton = true }: CampaignCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-900">{campaign.title}</h3>
      <p className="mt-2 text-gray-600">{campaign.description}</p>
      
      <div className="mt-4 flex items-center gap-4">
        <div className="flex items-center text-gray-500">
          <DollarSign className="w-4 h-4 mr-1" />
          <span>${campaign.budget}</span>
        </div>
        <div className="flex items-center text-gray-500">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{new Date(campaign.deadline).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-900">Requirements:</h4>
        <ul className="mt-2 space-y-1">
          {campaign.requirements.map((req, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              {req}
            </li>
          ))}
        </ul>
      </div>

      {showApplyButton && (
        <button
          onClick={onApply}
          className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Apply Now
        </button>
      )}
    </div>
  );
}