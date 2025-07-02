// src/pages/super/Tenants.jsx

import { useState, useEffect } from "react";
import DropdownSelect from "../../../components/common/DropdownSelect";
import GenericTable from "../../../components/common/GenericTable";
import { tenantBookingHeadings } from "../../../constants/tableHeadings/tenantBookingHeadings";
import Button from '../../../components/common/buttons/MainButton'
import AddBookingForm from "../../../components/tenant/booking/AddBookingForm";
import UpgradeDowngradeForm from "../../../components/super/addTenant/UpgradeDowngradeForm";
import DeleteSuspendForm from "../../../components/super/addTenant/DeleteSuspendForm";
import ViewAccessEndPoint from "../../../components/super/addTenant/ViewAccessEndPoint";
import { table } from "framer-motion/client";
import ConfirmationModal from '../../../components/common/ConfirmationModal'

import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';

const dummyTenantData = [
    {
        bookingId: "BK1",
        locationId: "LC1",
        customerName: "Good Vibes",
        customerType: "Returning",
        date: "2025-01-15",
        time: "03:00",
        table: "4",
        source: "Walk-in",
    },
    {
        bookingId: "BK2",
        locationId: "LC1",
        customerName: "Taco",
        customerType: "New",
        date: "2025-06-01",
        time: "15:48",
        table: "3",
        source: "Reserved",
    },
    {
        bookingId: "BK3",
        locationId: "LC2",
        customerName: "Burger Joint",
        customerType: "VIP",
        date: "2025-07-10",
        time: "19:00",
        table: "1",
        source: "Reserved",
    },
    {
        bookingId: "BK4",
        locationId: "LC1",
        customerName: "Pizza Place",
        customerType: "New",
        date: "2025-07-20",
        time: "12:30",
        table: "2",
        source: "Walk-in",
    },
    {
        bookingId: "BK1",
        locationId: "LC1",
        customerName: "Good Vibes",
        customerType: "Returning",
        date: "2025-01-15",
        time: "03:00",
        table: "4",
        source: "Walk-in",
    },
    {
        bookingId: "BK2",
        locationId: "LC1",
        customerName: "Taco",
        customerType: "New",
        date: "2025-06-01",
        time: "15:48",
        table: "3",
        source: "Reserved",
    },
    {
        bookingId: "BK3",
        locationId: "LC2",
        customerName: "Burger Joint",
        customerType: "VIP",
        date: "2025-07-10",
        time: "19:00",
        table: "1",
        source: "Reserved",
    },
    {
        bookingId: "BK4",
        locationId: "LC1",
        customerName: "Pizza Place",
        customerType: "New",
        date: "2025-07-20",
        time: "12:30",
        table: "2",
        source: "Walk-in",
    },
    {
        bookingId: "BK1",
        locationId: "LC1",
        customerName: "Good Vibes",
        customerType: "Returning",
        date: "2025-01-15",
        time: "03:00",
        table: "4",
        source: "Walk-in",
    },
    {
        bookingId: "BK2",
        locationId: "LC1",
        customerName: "Taco",
        customerType: "New",
        date: "2025-06-01",
        time: "15:48",
        table: "3",
        source: "Reserved",
    },
    {
        bookingId: "BK3",
        locationId: "LC2",
        customerName: "Burger Joint",
        customerType: "VIP",
        date: "2025-07-10",
        time: "19:00",
        table: "1",
        source: "Reserved",
    },
    {
        bookingId: "BK4",
        locationId: "LC1",
        customerName: "Pizza Place",
        customerType: "New",
        date: "2025-07-20",
        time: "12:30",
        table: "2",
        source: "Walk-in",
    },
    {
        bookingId: "BK3",
        locationId: "LC2",
        customerName: "Burger Joint",
        customerType: "VIP",
        date: "2025-07-10",
        time: "19:00",
        table: "1",
        source: "Reserved",
    },
    {
        bookingId: "BK4",
        locationId: "LC1",
        customerName: "Pizza Place",
        customerType: "New",
        date: "2025-07-20",
        time: "12:30",
        table: "2",
        source: "Walk-in",
    },
    {
        bookingId: "BK1",
        locationId: "LC1",
        customerName: "Good Vibes",
        customerType: "Returning",
        date: "2025-01-15",
        time: "03:00",
        table: "4",
        source: "Walk-in",
    },
    {
        bookingId: "BK2",
        locationId: "LC1",
        customerName: "Taco",
        customerType: "New",
        date: "2025-06-01",
        time: "15:48",
        table: "3",
        source: "Reserved",
    },
    {
        bookingId: "BK3",
        locationId: "LC2",
        customerName: "Burger Joint",
        customerType: "VIP",
        date: "2025-07-10",
        time: "19:00",
        table: "1",
        source: "Reserved",
    },
    {
        bookingId: "BK4",
        locationId: "LC1",
        customerName: "Pizza Place",
        customerType: "New",
        date: "2025-07-20",
        time: "12:30",
        table: "2",
        source: "Walk-in",
    },
    {
        bookingId: "BK1",
        locationId: "LC1",
        customerName: "Good Vibes",
        customerType: "Returning",
        date: "2025-01-15",
        time: "03:00",
        table: "4",
        source: "Walk-in",
    },
    {
        bookingId: "BK2",
        locationId: "LC1",
        customerName: "Taco",
        customerType: "New",
        date: "2025-06-01",
        time: "15:48",
        table: "3",
        source: "Reserved",
    },
    {
        bookingId: "BK3",
        locationId: "LC2",
        customerName: "Burger Joint",
        customerType: "VIP",
        date: "2025-07-10",
        time: "19:00",
        table: "1",
        source: "Reserved",
    },
    {
        bookingId: "BK4",
        locationId: "LC1",
        customerName: "Pizza Place",
        customerType: "New",
        date: "2025-07-20",
        time: "12:30",
        table: "2",
        source: "Walk-in",
    },
    {
        bookingId: "BK3",
        locationId: "LC2",
        customerName: "Burger Joint",
        customerType: "VIP",
        date: "2025-07-10",
        time: "19:00",
        table: "1",
        source: "Reserved",
    },
    {
        bookingId: "BK4",
        locationId: "LC1",
        customerName: "Pizza Place",
        customerType: "New",
        date: "2025-07-20",
        time: "12:30",
        table: "2",
        source: "Walk-in",
    },
    {
        bookingId: "BK1",
        locationId: "LC1",
        customerName: "Good Vibes",
        customerType: "Returning",
        date: "2025-01-15",
        time: "03:00",
        table: "4",
        source: "Walk-in",
    },
    {
        bookingId: "BK2",
        locationId: "LC1",
        customerName: "Taco",
        customerType: "New",
        date: "2025-06-01",
        time: "15:48",
        table: "3",
        source: "Reserved",
    },
    {
        bookingId: "BK3",
        locationId: "LC2",
        customerName: "Burger Joint",
        customerType: "VIP",
        date: "2025-07-10",
        time: "19:00",
        table: "1",
        source: "Reserved",
    },
    {
        bookingId: "BK4",
        locationId: "LC1",
        customerName: "Pizza Place",
        customerType: "New",
        date: "2025-07-20",
        time: "12:30",
        table: "2",
        source: "Walk-in",
    },
    {
        bookingId: "BK1",
        locationId: "LC1",
        customerName: "Good Vibes",
        customerType: "Returning",
        date: "2025-01-15",
        time: "03:00",
        table: "4",
        source: "Walk-in",
    },
    {
        bookingId: "BK2",
        locationId: "LC1",
        customerName: "Taco",
        customerType: "New",
        date: "2025-06-01",
        time: "15:48",
        table: "3",
        source: "Reserved",
    },
    {
        bookingId: "BK3",
        locationId: "LC2",
        customerName: "Burger Joint",
        customerType: "VIP",
        date: "2025-07-10",
        time: "19:00",
        table: "1",
        source: "Reserved",
    },
    {
        bookingId: "BK4",
        locationId: "LC1",
        customerName: "Pizza Place",
        customerType: "New",
        date: "2025-07-20",
        time: "12:30",
        table: "2",
        source: "Walk-in",
    },
    {
        bookingId: "BK3",
        locationId: "LC2",
        customerName: "Burger Joint",
        customerType: "VIP",
        date: "2025-07-10",
        time: "19:00",
        table: "1",
        source: "Reserved",
    },
    {
        bookingId: "BK4",
        locationId: "LC1",
        customerName: "Pizza Place",
        customerType: "New",
        date: "2025-07-20",
        time: "12:30",
        table: "2",
        source: "Walk-in",
    },
    {
        bookingId: "BK1",
        locationId: "LC1",
        customerName: "Good Vibes",
        customerType: "Returning",
        date: "2025-01-15",
        time: "03:00",
        table: "4",
        source: "Walk-in",
    },
    {
        bookingId: "BK2",
        locationId: "LC1",
        customerName: "Taco",
        customerType: "New",
        date: "2025-06-01",
        time: "15:48",
        table: "3",
        source: "Reserved",
    },
    {
        bookingId: "BK3",
        locationId: "LC2",
        customerName: "Burger Joint",
        customerType: "VIP",
        date: "2025-07-10",
        time: "19:00",
        table: "1",
        source: "Reserved",
    },
    {
        bookingId: "BK4",
        locationId: "LC1",
        customerName: "Pizza Place",
        customerType: "New",
        date: "2025-07-20",
        time: "12:30",
        table: "2",
        source: "Walk-in",
    },
    {
        bookingId: "BK1",
        locationId: "LC1",
        customerName: "Good Vibes",
        customerType: "Returning",
        date: "2025-01-15",
        time: "03:00",
        table: "4",
        source: "Walk-in",
    },
    {
        bookingId: "BK2",
        locationId: "LC1",
        customerName: "Taco",
        customerType: "New",
        date: "2025-06-01",
        time: "15:48",
        table: "3",
        source: "Reserved",
    },
    {
        bookingId: "BK3",
        locationId: "LC2",
        customerName: "Burger Joint",
        customerType: "VIP",
        date: "2025-07-10",
        time: "19:00",
        table: "1",
        source: "Reserved",
    },
    {
        bookingId: "BK4",
        locationId: "LC1",
        customerName: "Pizza Place",
        customerType: "New",
        date: "2025-07-20",
        time: "12:30",
        table: "2",
        source: "Walk-in",
    },
    {
        bookingId: "BK3",
        locationId: "LC2",
        customerName: "Burger Joint",
        customerType: "VIP",
        date: "2025-07-10",
        time: "19:00",
        table: "1",
        source: "Reserved",
    },
    {
        bookingId: "BK4",
        locationId: "LC1",
        customerName: "Pizza Place",
        customerType: "New",
        date: "2025-07-20",
        time: "12:30",
        table: "2",
        source: "Walk-in",
    },
    {
        bookingId: "BK1",
        locationId: "LC1",
        customerName: "Good Vibes",
        customerType: "Returning",
        date: "2025-01-15",
        time: "03:00",
        table: "4",
        source: "Walk-in",
    },
    {
        bookingId: "BK2",
        locationId: "LC1",
        customerName: "Taco",
        customerType: "New",
        date: "2025-06-01",
        time: "15:48",
        table: "3",
        source: "Reserved",
    },
    {
        bookingId: "BK3",
        locationId: "LC2",
        customerName: "Burger Joint",
        customerType: "VIP",
        date: "2025-07-10",
        time: "19:00",
        table: "1",
        source: "Reserved",
    },
    {
        bookingId: "BK4",
        locationId: "LC1",
        customerName: "Pizza Place",
        customerType: "New",
        date: "2025-07-20",
        time: "12:30",
        table: "2",
        source: "Walk-in",
    },
    {
        bookingId: "BK1",
        locationId: "LC1",
        customerName: "Good Vibes",
        customerType: "Returning",
        date: "2025-01-15",
        time: "03:00",
        table: "4",
        source: "Walk-in",
    },
    {
        bookingId: "BK2",
        locationId: "LC1",
        customerName: "Taco",
        customerType: "New",
        date: "2025-06-01",
        time: "15:48",
        table: "3",
        source: "Reserved",
    },
    {
        bookingId: "BK3",
        locationId: "LC2",
        customerName: "Burger Joint",
        customerType: "VIP",
        date: "2025-07-10",
        time: "19:00",
        table: "1",
        source: "Reserved",
    },
    {
        bookingId: "BK4",
        locationId: "LC1",
        customerName: "Pizza Place",
        customerType: "New",
        date: "2025-07-20",
        time: "12:30",
        table: "2",
        source: "Walk-in",
    },
    {
        bookingId: "BK3",
        locationId: "LC2",
        customerName: "Burger Joint",
        customerType: "VIP",
        date: "2025-07-10",
        time: "19:00",
        table: "1",
        source: "Reserved",
    },
    {
        bookingId: "BK4",
        locationId: "LC1",
        customerName: "Pizza Place",
        customerType: "New",
        date: "2025-07-20",
        time: "12:30",
        table: "2",
        source: "Walk-in",
    },
    {
        bookingId: "BK1",
        locationId: "LC1",
        customerName: "Good Vibes",
        customerType: "Returning",
        date: "2025-01-15",
        time: "03:00",
        table: "4",
        source: "Walk-in",
    },
    {
        bookingId: "BK2",
        locationId: "LC1",
        customerName: "Taco",
        customerType: "New",
        date: "2025-06-01",
        time: "15:48",
        table: "3",
        source: "Reserved",
    },
    {
        bookingId: "BK3",
        locationId: "LC2",
        customerName: "Burger Joint",
        customerType: "VIP",
        date: "2025-07-10",
        time: "19:00",
        table: "1",
        source: "Reserved",
    },
    {
        bookingId: "BK4",
        locationId: "LC1",
        customerName: "Pizza Place",
        customerType: "New",
        date: "2025-07-20",
        time: "12:30",
        table: "2",
        source: "Walk-in",
    },
    {
        bookingId: "BK1",
        locationId: "LC1",
        customerName: "Good Vibes",
        customerType: "Returning",
        date: "2025-01-15",
        time: "03:00",
        table: "4",
        source: "Walk-in",
    },
    {
        bookingId: "BK2",
        locationId: "LC1",
        customerName: "Taco",
        customerType: "New",
        date: "2025-06-01",
        time: "15:48",
        table: "3",
        source: "Reserved",
    },
    {
        bookingId: "BK3",
        locationId: "LC2",
        customerName: "Burger Joint",
        customerType: "VIP",
        date: "2025-07-10",
        time: "19:00",
        table: "1",
        source: "Reserved",
    },
    {
        bookingId: "BK4",
        locationId: "LC1",
        customerName: "Pizza Place",
        customerType: "New",
        date: "2025-07-20",
        time: "12:30",
        table: "2",
        source: "Walk-in",
    },
];


const Booking = () => {
    const [clientType, setClientType] = useState(""); // Renamed from clientType
    const [dateRange, setDateRange] = useState([null, null]); // State for date range
    const [source, setSource] = useState("");
    const [table, setTable] = useState("");
    const [location, setLocation] = useState("");

    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingRowData, setEditingRowData] = useState(null);
    const [showCancelForm, setShowCancelForm] = useState(false);
    const [noShowForm, setNoShowForm] = useState(false);
    const [showMarkAsCompleted, setShowMarkAsCompleted] = useState(false);

    const [filteredData, setFilteredData] = useState(dummyTenantData);

    const filterData = () => {
        let updated = [...dummyTenantData];

        if (clientType) {
            updated = updated.filter((item) => item.customerType === clientType);
        }

        if (dateRange && dateRange[0] instanceof Date && dateRange[1] instanceof Date) {
            const startDate = dateRange[0].setHours(0, 0, 0, 0);
            const endDate = dateRange[1].setHours(23, 59, 59, 999);
            updated = updated.filter((item) => {
                const itemDate = new Date(item.date).getTime();
                return itemDate >= startDate && itemDate <= endDate;
            });
        }

        if (source) {
            updated = updated.filter((item) => item.source === source);
        }
        if (table) {
            updated = updated.filter((item) => item.table === table);
        }
        if (location) {
            // Assuming locationId maps to location for filtering
            updated = updated.filter((item) => {
                if (location === "Islamabad") return item.locationId === "LC1";
                if (location === "Rawalpindi") return item.locationId === "LC2";
                // Add more conditions if necessary for other locations
                return false;
            });
        }


        setFilteredData(updated);
    };

    const handleDropdownChange = (option, row) => {
        if (option === "Edit Booking") {
            setEditingRowData(row); // Set the data of the row being edited
            setShowEditForm(true);
        } else if (option === "Cancel Booking") {
            setShowCancelForm(true)
        } else if (option === "No Show") {
            setNoShowForm(true)
        } else if (option === "Mark as Completed") {
            setShowMarkAsCompleted(true)
        }
    };

    useEffect(() => {
        const isDateRangeCleared = !dateRange || (dateRange[0] === null && dateRange[1] === null);

        if (!clientType && isDateRangeCleared && !source && !table && !location) {
            setFilteredData(dummyTenantData);
        }
    }, [clientType, dateRange, source, table, location]);

    return (
        <div className="p-4 max-w-7xl mx-auto bg-[#f7f7ff]">
            {/* Top Label */}
            <h1 className="text-2xl font-semibold text-center mb-6">Reservation</h1>

            <div className=" rounded-2xl shadow bg-white p-4 ">

                {/* Filters + Buttons */}
                <div className="flex flex-col justify-between my-4">
                    <div className="flex  gap-4 text-sm">
                        <Button
                            radius="rounded-xl"
                            className="px-2 py-1 shadow-none text-sm"
                            onClick={() => setShowAddForm(true)}
                        >
                            Add Booking +
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col md:items-center md:flex-row gap-4 w-full md:w-5/6 text-sm">
                    <DropdownSelect
                        label="Client Type"
                        options={["New", "Returning", "VIP"]}
                        selected={clientType}
                        onChange={setClientType}
                    />
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-textPrimary mb-1">Date Range</label>
                        <DateRangePicker
                            onChange={setDateRange}
                            value={dateRange}
                            className="react-daterange-picker-custom rounded-2xl"
                        />
                    </div>
                    <DropdownSelect
                        label="Source"
                        options={["Walk-in", "Reserved"]}
                        selected={source}
                        onChange={setSource}
                    />
                    <DropdownSelect
                        label="Table"
                        options={["1", "2", "3", "4", "5", "6", "7", "8"]}
                        selected={source}
                        onChange={setSource}
                    />
                    <DropdownSelect
                        label="Location"
                        options={["Islamabad", "Rawalpindi", "Peshawar"]}
                        selected={source}
                        onChange={setSource}
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


                </div>

                <AddBookingForm isOpen={showAddForm} onClose={() => setShowAddForm(false)} label={"Add Booking"} />
                <AddBookingForm isOpen={showEditForm} onClose={() => setShowEditForm(false)} label={"Edit Booking"} />
                <ConfirmationModal isOpen={showCancelForm} onClose={() => setShowCancelForm(false)} label={"Cancel Booking"} message={"Are you sure to cancel the reservation!"} />
                <ConfirmationModal isOpen={showMarkAsCompleted} onClose={() => setShowMarkAsCompleted(false)} label={"Mark as Completed"} message={"Are you sure to Mark the reservation as Completed!"} />


                <div className="flex justify-start pt-4">
                    <label htmlFor="" className="text-lg font-semibold">All Customers</label>
                </div>
                {/* Table */}
                <GenericTable
                    columns={tenantBookingHeadings}
                    data={filteredData}
                    actions={["Edit Booking", "Cancel Booking", "No Show", "Mark as Completed"]}
                    handleDropdownChange={handleDropdownChange}
                />
            </div>
        </div>
    );
};

export default Booking;
