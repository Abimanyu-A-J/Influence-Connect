import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Users, BadgePlus, Settings } from "lucide-react";

interface SidebarProps {
  userType: "influencer" | "sponsor";
}

export function Sidebar({ userType }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    {
      icon: Users,
      label: userType === "sponsor" ? "My Campaigns" : "Find Campaigns",
      path: userType === "sponsor" ? "/campaigns" : "/browse-campaigns",
    },
    { icon: BadgePlus, label: "Add Campign", path: "/add-campaigns" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="w-64 bg-white shadow-sm">
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
