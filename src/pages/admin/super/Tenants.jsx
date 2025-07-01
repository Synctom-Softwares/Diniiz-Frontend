// src/pages/super/Tenants.jsx

import { useState, useEffect } from "react";
import DropdownSelect from "../../../components/common/DropdownSelect";
import GenericTable from "../../../components/common/GenericTable";
import { superBookingHeadings } from "../../../constants/tableHeadings/superBookingHeadings";
import Button from '../../../components/common/buttons/MainButton'
import AddTenantForm from "../../../components/super/addTenant/AddTenantForm";
import UpgradeDowngradeForm from "../../../components/super/addTenant/UpgradeDowngradeForm";
import DeleteSuspendForm from "../../../components/super/addTenant/DeleteSuspendForm";
import ViewAccessEndPoint from "../../../components/super/addTenant/ViewAccessEndPoint";

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
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingRowData, setEditingRowData] = useState(null);
  const [showUpgradeDowngradeForm, setShowUpgradeDowngradeForm] = useState(false);
  const [showDeleteSuspendForm, setShowDeleteSuspendForm] = useState(false);
  const [showViewAccessEndPoint, setShowViewAccessEndPoint] = useState(false);

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

  const handleDropdownChange = (option, row) => {
    if (option === "Edit Detail") {
      setEditingRowData(row); // Set the data of the row being edited
      setShowEditForm(true);
    } else if (option === "Upgrade / Downgrade") {
      setShowUpgradeDowngradeForm(true)
    } else if (option === "Suspend / Delete") {
      setShowDeleteSuspendForm(true)
    } else if (option === "View Access Endpoint") {
      setShowViewAccessEndPoint(true)
    }
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

        <AddTenantForm isOpen={showAddForm} onClose={() => setShowAddForm(false)} label={"Add Tenant"} />
        <AddTenantForm isOpen={showEditForm} onClose={() => setShowEditForm(false)} label={"Edit Tenant"} />
        <UpgradeDowngradeForm isOpen={showUpgradeDowngradeForm} onClose={() => setShowUpgradeDowngradeForm(false)} label={"Upgrade / Downgrade Account"} />
        <DeleteSuspendForm isOpen={showDeleteSuspendForm} onClose={() => setShowDeleteSuspendForm(false)} label={"Delete / Suspend Account"} />
        <ViewAccessEndPoint isOpen={showViewAccessEndPoint} onClose={() => setShowViewAccessEndPoint(false)} label={"End Point Access"} />


        {/* Table */}
        <GenericTable
          columns={superBookingHeadings}
          data={filteredData}
          actions={["Edit Detail", "Upgrade / Downgrade", "Suspend / Delete", "View Access Endpoint"]}
          handleDropdownChange={handleDropdownChange}
        />
      </div>
    </div>
  );
};

export default Tenants;
