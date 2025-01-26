export interface Campaign {
  id: string;
  title: string;
  description: string;
  budget: number;
  requirements: string[];
  deadline: string;
  status: 'active' | 'closed';
  sponsorId: string;
}

export interface Profile {
  id: string;
  type: 'influencer' | 'sponsor' | 'admin';
  name: string;
  bio: string;
  socialLinks: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
  followers?: number;
  industry?: string;
}

export interface Application {
  id: string;
  campaignId: string;
  influencerId: string;
  status: 'pending' | 'accepted' | 'rejected';
  proposal: string;
  createdAt: string;
}