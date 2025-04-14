import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, BarChart2, BadgePlus, User } from "lucide-react";

interface SidebarProps {
  userType: "Influencer" | "Sponsor";
}

export function Sidebar({ userType }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    {
      icon: BarChart2,
      label: userType === "Sponsor" ? "My Campaigns" : "Find Campaigns",
      path: userType === "Sponsor" ? "/campaigns" : "/browse-campaigns",
    },
    userType === "Sponsor"
      ? { icon: BadgePlus, label: "Add Campaign", path: "/add-campaigns" }
      : null, // use null instead of {}
    { icon: User, label: "Profile", path: "/profile" },
  ].filter(Boolean); // filter out null values

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