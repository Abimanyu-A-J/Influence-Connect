import React from 'react';
import { Navbar } from './Navbar';
import { useUser } from '../context/UserContext'

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar auth={user}/>
      {children}
    </div>
  );
}