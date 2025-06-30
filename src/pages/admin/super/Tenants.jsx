// src/pages/super/Tenants.jsx

import { useState, useEffect } from "react";
import DropdownSelect from "../../../components/common/DropdownSelect";
import GenericTable from "../../../components/common/GenericTable";
import { superBookingHeadings } from "../../../constants/tableHeadings/superBookingHeadings";
import Button from '../../../components/common/buttons/MainButton'
import AddTenantForm from "../../../components/super/addTenant/AddTenantForm";

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
  const [showAddForm, setShowAddForm] = useState(false);

  const [filteredData, setFilteredData] = useState(dummyTenantData);

  const filterData = () => {
     let updated = [...dummyTenantData];

    if (subscription) {
      updated = updated.filter((item) => item.subscriptionType === subscription);
    }
    if (plan) {
      updated = updated.filter((item) => item.plan === plan);
    }
    if (status) {
      updated = updated.filter((item) => item.status === status);
    }

    setFilteredData(updated);
  };

  // Reset filtered data when all filters are cleared
  useEffect(() => {
    if (!subscription && !plan && !status) {
      setFilteredData(dummyTenantData);
    }
  }, [subscription, plan, status]);

  return (
    <div className="p-4 max-w-7xl mx-auto bg-[#f7f7ff]">
      {/* Top Label */}
      <h1 className="text-2xl font-semibold text-center mb-6">Tenant Management</h1>

      <div className=" rounded-2xl shadow bg-white p-4 space-y-6">

        {/* Filters + Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-3 mb-10">
          {/* Filter Fields */}
          <div className="flex flex-col md:items-center md:flex-row gap-4 w-full md:w-2/3 ">
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
            <Button
              radius="rounded-xl"
              className="px-5 py-1 shadow-none"
              onClick={filterData}
            >
              Filter
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex">

            <Button
              radius="rounded-xl"
              className="px-5 py-1 shadow-none"
              onClick={() => setShowAddForm(true)}
            >
              Add Tenant
            </Button>
          </div>
        </div>

        <AddTenantForm isOpen={showAddForm} onClose={() => setShowAddForm(false)}  label={"Add Tenant"}/>


        {/* Table */}
        <GenericTable columns={superBookingHeadings} data={filteredData} />
      </div>
    </div>
  );
};

export default Tenants;
