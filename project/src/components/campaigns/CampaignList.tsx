import React from 'react';
import { CampaignCard } from './CampaignCard';
import { Campaign } from '@/types';

interface CampaignListProps {
  campaigns: Campaign[];
  onApply: (campaignId: string) => void;
}

export function CampaignList({ campaigns, onApply }: CampaignListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          campaign={campaign}
          onApply={() => onApply(campaign.id)}
        />
      ))}
    </div>
  );
}