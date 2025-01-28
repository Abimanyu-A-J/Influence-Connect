import React, { useState } from "react";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { CampaignList } from "../../components/campaigns/CampaignList";
import { useNavigate } from "react-router-dom";

export function AddCampaigns() {
  const [campaignname, setCampaignName] = useState('');
  const [company, setCompany] = useState('');
  const [startdate, setStartDate] = useState('');
  const [desc, setDesc] = useState('');
  const [enddate, setEndDate] = useState('');
  const [budget, setBudget] = useState(0);
  const [targetviews, setTargetviews] = useState(0);
  const navigator = useNavigate();
  const handleAddCampaign = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/campaign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ campaignname, company, startdate, desc, enddate, budget, targetviews }),
      });

      if (!response.ok) {
        console.log(response);
      }

      const data = await response.json();
      if(data.message == "Campaign created successfully") {
        navigator("/add-campaigns");
      } else {
        alert(data.message);
      }
      // Handle successful login (e.g., store user data, redirect, etc.)
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error (e.g., show error message to the user)
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-gray-900">Add Campaigns</h1>
      <form className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="campaign-name"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
            placeholder=""
            onChange={(e) => setCampaignName(e.target.value)}
            required
          />
          <label
            htmlFor="campaign-name"
            className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Campaign Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <textarea
            name="descripition"
            id="campaign-descprition"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
            placeholder=" "
            onChange={(e) => setDesc(e.target.value)}
            required
          ></textarea>
          <label
            htmlFor="campaign-description"
            className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Campaign Description
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            name="company-name"
            id="company-name"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
            placeholder=" "
            onChange={(e) => setCompany(e.target.value)}
            required
          />
          <label
            htmlFor="company-name"
            className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Company Name
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="start-date"
              id="start-date"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
              placeholder=" "
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <label
              htmlFor="start-date"
              className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Start Date
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="end-date"
              id="end-date"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
              placeholder=" "
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
            <label
              htmlFor="end-date"
              className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              End Date
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="targeted-views"
            id="targeted-views"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
            placeholder=" "
            onChange={(e) => setTargetviews(e.target.value)}
            required
          />
          <label
            htmlFor="targeted-views"
            className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Targeted Views
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="budget"
            id="budget"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
            placeholder=" "
            onChange={(e) => setBudget(e.target.value)}
            required
          />
          <label
            htmlFor="budget"
            className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Budget
          </label>
        </div>
        <button
          type="button"
          onClick={handleAddCampaign}
          className="text-white bg-indigo-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </DashboardLayout>
  );
}
