/* eslint-disable no-unused-vars */
// src/pages/super/Tenants.jsx

import { useState, useEffect, useCallback } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getAllbookings, setAllBookings } from "../../../store/slices/tenant/bookingSlice";

const Booking = () => {

    const dispatch = useDispatch();
    const { allBookings, loading, error } = useSelector((state) => state.booking);
    const userData = useSelector(state => state.auth.userData)

    const [clientType, setClientType] = useState("");
    const [dateRange, setDateRange] = useState([null, null]);
    const [source, setSource] = useState("");
    const [table, setTable] = useState("");
    const [location, setLocation] = useState("");

    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingRowData, setEditingRowData] = useState(null);
    const [showCancelForm, setShowCancelForm] = useState(false);
    const [noShowForm, setNoShowForm] = useState(false);
    const [showMarkAsCompleted, setShowMarkAsCompleted] = useState(false);

    const [filteredData, setFilteredData] = useState([]);

    const fetchBookings = useCallback(async () => {
        if (userData.tenantId) {
            const response = await dispatch(getAllbookings(userData.tenantId));
            console.log('response', response.payload.reservations)
            
        }
    }, [dispatch, userData]);

    useEffect(() => {
        fetchBookings()

    }, [fetchBookings]);


 const filterData = useCallback(() => {
        let result = [...(allBookings || [])]; 
        if (clientType) {
            result = result.filter(item => item.customerType === clientType);
        }

        if (dateRange[0] && dateRange[1]) {
            const start = new Date(dateRange[0]).setHours(0, 0, 0, 0);
            const end = new Date(dateRange[1]).setHours(23, 59, 59, 999);
            
            result = result.filter(item => {
                const itemDate = new Date(item.date).getTime();
                return itemDate >= start && itemDate <= end;
            });
        }

        if (source) {
            result = result.filter(item => item.source === source);
        }

        if (table) {
            result = result.filter(item => item.table === table);
        }

        if (location) {
            result = result.filter(item => {
                if (location === "Islamabad") return item.locationId === "LC1";
                if (location === "Rawalpindi") return item.locationId === "LC2";
                if (location === "Peshawar") return item.locationId === "LC3";
                return true;
            });
        }

        setFilteredData(result);
    }, [allBookings, clientType, dateRange, source, table, location]);

    const handleDropdownChange = (option, row) => {
        if (option === "Edit Booking") {
            setEditingRowData(row);
            setShowEditForm(true);
        } else if (option === "Cancel Booking") {
            setShowCancelForm(true);
        } else if (option === "No Show") {
            setNoShowForm(true);
        } else if (option === "Mark as Completed") {
            setShowMarkAsCompleted(true);
        }
    };

      useEffect(() => {
        if (!clientType && 
            (!dateRange[0] && !dateRange[1]) && 
            !source && 
            !table && 
            !location) {
            setFilteredData(allBookings || []);
        }
    }, [clientType, dateRange, source, table, location, allBookings]);

    //   useEffect(() => {
    //             const formattedData = filteredData?.map((booking) => ({
    //                 bookingId: booking._id,
    //                 locationId: booking.locationId,
    //                 customerName: booking.customerName,
    //                 customerType: booking.customerType || "New",
    //                 date: new Date(booking.date).toLocaleDateString(), 
    //                 time: booking.time,
    //                 table: booking.tableNumber || booking.table, 
    //                 source: booking.source
    //             }));
                
    //             dispatch(setAllBookings(formattedData));
    //             setFilteredData(formattedData);
            
    // }, [dispatch]);


    
    console.log('filteredData', filteredData)

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

                <AddBookingForm isOpen={showAddForm} onClose={() => setShowAddForm(false)} label={"Add Booking"} fetchBookings={fetchBookings} isTenantAdmin={true}/>
                <AddBookingForm isOpen={showEditForm} onClose={() => setShowEditForm(false)} label={"Edit Booking"} />
                <ConfirmationModal isOpen={showCancelForm} onClose={() => setShowCancelForm(false)} label={"Cancel Booking"} message={"Are you sure to cancel the reservation!"} />
                <ConfirmationModal isOpen={showMarkAsCompleted} onClose={() => setShowMarkAsCompleted(false)} label={"Mark as Completed"} message={"Are you sure to Mark the reservation as Completed!"} />


                <div className="flex justify-start pt-4">
                    <label htmlFor="" className="text-lg font-semibold">All Bookings</label>
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
