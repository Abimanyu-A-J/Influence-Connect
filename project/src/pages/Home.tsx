import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { Users, DollarSign, TrendingUp } from 'lucide-react';

export function Home() {
  return (
    <Layout>
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              Connect Brands with Influencers
            </h1>
            <p className="mt-6 text-xl max-w-2xl mx-auto">
              The easiest way to find and manage influencer marketing campaigns
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                to="/register"
                className="bg-white text-indigo-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100"
              >
                Get Started
              </Link>
              <Link
                to="/browse-campaigns"
                className="border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10"
              >
                Browse Campaigns
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          <div className="text-center">
            <Users className="w-12 h-12 text-indigo-600 mx-auto" />
            <h3 className="mt-4 text-xl font-semibold">For Influencers</h3>
            <p className="mt-2 text-gray-600">
              Find brands that match your niche and audience
            </p>
          </div>
          <div className="text-center">
            <DollarSign className="w-12 h-12 text-indigo-600 mx-auto" />
            <h3 className="mt-4 text-xl font-semibold">For Sponsors</h3>
            <p className="mt-2 text-gray-600">
              Connect with influencers who can promote your brand
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}