// src/pages/super/Tenants.jsx

import { useState } from "react";
import DropdownSelect from "../../../components/common/DropdownSelect";
import GenericTable from "../../../components/common/GenericTable";
import { superBookingHeadings } from "../../../constants/tableHeadings/superBookingHeadings";
const dummyTenantData = [
  {
    name: "Café Good Vibes",
    plan: "Premium",
    subscriptionType: "Annual",
    startDate: "2025-01-15",
    nextBillingDate: "2026-01-15",
    status: "Active",
    location: "New York",
  },
  {
    name: "Taco Palace",
    plan: "Basic",
    subscriptionType: "Monthly",
    startDate: "2025-06-01",
    nextBillingDate: "2025-07-01",
    status: "Trial",
    location: "Austin",
  },
];


const Tenants = () => {
  const [subscription, setSubscription] = useState("");
  const [plan, setPlan] = useState("");
  const [status, setStatus] = useState("");

  const filterData = () => {
    // Implement filter logic here
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Top Label */}
      <h1 className="text-2xl font-semibold text-center mb-6">Tenants Management</h1>

      {/* Box Container */}
      <div className="border rounded-lg shadow bg-white p-4 space-y-6">

        {/* Filters + Buttons */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Filter Fields */}
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
            <DropdownSelect
              label="Subscription Type"
              options={["Monthly", "Annual"]}
              selected={subscription}
              onChange={setSubscription}
            />
            <DropdownSelect
              label="Plan"
              options={["Basic", "Premium", "Enterprise"]}
              selected={plan}
              onChange={setPlan}
            />
            <DropdownSelect
              label="Status"
              options={["Active", "Inactive", "Trial"]}
              selected={status}
              onChange={setStatus}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 self-end">
            <button
              className="bg-primary text-white px-4 py-2 rounded"
              onClick={filterData}
            >
              Filter
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              + Add Tenant
            </button>
          </div>
        </div>

        {/* Table */}
        <GenericTable columns={superBookingHeadings} data={dummyTenantData} />
      </div>
    </div>
  );
};

export default Tenants;
