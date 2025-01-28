import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { CampaignsPage } from "./pages/campaigns/CampaignsPage";
import { BrowseCampaignsPage } from "./pages/campaigns/BrowseCampaignsPage";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { AddCampaigns } from "./pages/campaigns/AddCampaigns";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/browse-campaigns" element={<BrowseCampaignsPage />} />
        <Route path="/add-campaigns" element={<AddCampaigns />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
