import React from "react";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { CampaignList } from "../../components/campaigns/CampaignList";

export function AddCampaigns() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-gray-900">Add Campaigns</h1>
      <form class="max-w-md mx-auto">
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="campaign-name"
            class="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
            placeholder=""
            required
          />
          <label
            for="campaign-name"
            class="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Campaign Name
          </label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <textarea
            name="descrpition"
            id="campaign-descprition"
            class="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
            placeholder=" "
            required
          ></textarea>
          <label
            for="campaign-description"
            class="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Campaign Description
          </label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input
            name="company-name"
            id="company-name"
            class="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
            placeholder=" "
            required
          />
          <label
            for="company-name"
            class="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Company Name
          </label>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="start-date"
              id="start-date"
              class="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
              placeholder=" "
              required
            />
            <label
              for="start-date"
              class="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Start Date
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="end-date"
              id="end-date"
              class="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
              placeholder=" "
              required
            />
            <label
              for="end-date"
              class="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              End Date
            </label>
          </div>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input
            name="targeted-views"
            id="targeted-views"
            class="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
            placeholder=" "
            required
          />
          <label
            for="targeted-views"
            class="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Targeted Views
          </label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="budget"
            id="budget"
            class="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
            placeholder=" "
            required
          />
          <label
            for="budget"
            class="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Budget
          </label>
        </div>
        <button
          type="submit"
          class="text-white bg-indigo-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </DashboardLayout>
  );
}
