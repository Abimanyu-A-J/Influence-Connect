import React from 'react';
import { Layout } from '../layout/Layout';
import { Sidebar } from '../layout/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'influencer' | 'sponsor';
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  return (
    <Layout>
      <div className="flex min-h-screen">
        <Sidebar userType={userType} />
        <main className="flex-1 p-8 bg-gray-50">{children}</main>
      </div>
    </Layout>
  );
}