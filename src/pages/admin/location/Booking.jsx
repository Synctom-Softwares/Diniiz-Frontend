/* eslint-disable no-unused-vars */
// src/pages/super/Tenants.jsx

import { useState, useEffect, useCallback } from "react";
import DropdownSelect from "../../../components/common/DropdownSelect";
import GenericTable from "../../../components/common/GenericTable";
import { locationBookingHeadings } from "../../../constants/tableHeadings/locationBookingHeadings";
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
import { getAllReservations } from "../../../store/slices/location/reservationSlice";


// const Booking = () => {
//     const [clientType, setClientType] = useState(""); // Renamed from clientType
//     const [dateRange, setDateRange] = useState([null, null]); // State for date range
//     const [source, setSource] = useState("");
//     const [table, setTable] = useState("");
//     const [partySize, setPartySize] = useState("");

//     const [showAddForm, setShowAddForm] = useState(false);
//     const [showEditForm, setShowEditForm] = useState(false);
//     const [editingRowData, setEditingRowData] = useState(null);
//     const [showCancelForm, setShowCancelForm] = useState(false);
//     const [noShowForm, setNoShowForm] = useState(false);
//     const [showMarkAsCompleted, setShowMarkAsCompleted] = useState(false);

//     const [filteredData, setFilteredData] = useState(dummyTenantData);

//     const filterData = () => {
//         let updated = [...dummyTenantData];

//         if (clientType) {
//             updated = updated.filter((item) => item.customerType === clientType);
//         }

//         if (dateRange && dateRange[0] instanceof Date && dateRange[1] instanceof Date) {
//             const startDate = dateRange[0].setHours(0, 0, 0, 0);
//             const endDate = dateRange[1].setHours(23, 59, 59, 999);
//             updated = updated.filter((item) => {
//                 const itemDate = new Date(item.date).getTime();
//                 return itemDate >= startDate && itemDate <= endDate;
//             });
//         }

//         if (source) {
//             updated = updated.filter((item) => item.source === source);
//         }
//         if (table) {
//             updated = updated.filter((item) => item.table === table);
//         }
//         // if (partySize) {
            
//         // }


//         setFilteredData(updated);
//     };

//     const handleDropdownChange = (option, row) => {
//         if (option === "Edit Booking") {
//             setEditingRowData(row); // Set the data of the row being edited
//             setShowEditForm(true);
//         } else if (option === "Cancel Booking") {
//             setShowCancelForm(true)
//         } else if (option === "No Show") {
//             setNoShowForm(true)
//         } else if (option === "Mark as Completed") {
//             setShowMarkAsCompleted(true)
//         }
//     };

//     useEffect(() => {
//         const isDateRangeCleared = !dateRange || (dateRange[0] === null && dateRange[1] === null);

//         if (!clientType && isDateRangeCleared && !source && !table && !partySize) {
//             setFilteredData(dummyTenantData);
//         }
//     }, [clientType, dateRange, source, table, partySize]);

//     return (
//         <div className="p-4 max-w-7xl mx-auto bg-[#f7f7ff]">
//             {/* Top Label */}
//             <h1 className="text-2xl font-semibold text-center mb-6">Reservation</h1>

//             <div className=" rounded-2xl shadow bg-white p-4 ">

//                 {/* Filters + Buttons */}
//                 <div className="flex flex-col justify-between my-4">
//                     <div className="flex  gap-3 text-sm">
//                         <Button
//                             radius="rounded-xl"
//                             className="px-2 py-1 shadow-none text-sm"
//                             onClick={() => setShowAddForm(true)}
//                         >
//                             Add Booking +
//                         </Button>
//                     </div>
//                 </div>
//                 <div className="flex flex-col md:items-center md:flex-row gap-4 w-full md:w-7/8 text-sm">
//                     <DropdownSelect
//                         label="Client Type"
//                         options={["New", "Returning", "VIP"]}
//                         selected={clientType}
//                         onChange={setClientType}
//                     />
//                     <div className="flex items-center gap-2">
//                         <label className="text-sm text-textPrimary mb-1">Date Range</label>
//                         <DateRangePicker
//                             onChange={setDateRange}
//                             value={dateRange}
//                             className="react-daterange-picker-custom rounded-2xl"
//                         />
//                     </div>
//                     <DropdownSelect
//                         label="Source"
//                         options={["Walk-in", "Reserved"]}
//                         selected={source}
//                         onChange={setSource}
//                     />
//                     <DropdownSelect
//                         label="Table"
//                         options={["1", "2", "3", "4", "5", "6", "7", "8"]}
//                         selected={table}
//                         onChange={setTable}
//                     />
//                     <DropdownSelect
//                         label="Party Size"
//                         options={["1", "2", "3", "4", "5", "6", "7", "8"]}
//                         selected={partySize}
//                         onChange={setPartySize}
//                     />
//                     <Button
//                         radius="rounded-xl"
//                         className="px-5 py-1 shadow-none"
//                         onClick={filterData}
//                     >
//                         Filter
//                     </Button>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex">


//                 </div>

//                 <AddBookingForm isOpen={showAddForm} onClose={() => setShowAddForm(false)} label={"Add Booking"} />
//                 <AddBookingForm isOpen={showEditForm} onClose={() => setShowEditForm(false)} label={"Edit Booking"} />
//                 <ConfirmationModal isOpen={showCancelForm} onClose={() => setShowCancelForm(false)} label={"Cancel Booking"} message={"Are you sure to cancel the reservation!"} />
//                 <ConfirmationModal isOpen={showMarkAsCompleted} onClose={() => setShowMarkAsCompleted(false)} label={"Mark as Completed"} message={"Are you sure to Mark the reservation as Completed!"} />


//                 <div className="flex justify-start pt-4">
//                     <label htmlFor="" className="text-lg font-semibold">All Customers</label>
//                 </div>
//                 {/* Table */}
//                 <GenericTable
//                     columns={locationBookingHeadings}
//                     data={filteredData}
//                     actions={["Edit Booking", "Cancel Booking", "No Show", "Mark as Completed"]}
//                     handleDropdownChange={handleDropdownChange}
//                 />
//             </div>
//         </div>
//     );
// };

const Booking = () => {
    const dispatch = useDispatch();
    const { allReservations, loading, error } = useSelector((state) => state.reservation);
    const userData = useSelector(state => state.auth.userData);

    const [clientType, setClientType] = useState("");
    const [dateRange, setDateRange] = useState([null, null]);
    const [source, setSource] = useState("");
    const [table, setTable] = useState("");
    const [partySize, setPartySize] = useState("");

    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingRowData, setEditingRowData] = useState(null);
    const [showCancelForm, setShowCancelForm] = useState(false);
    const [noShowForm, setNoShowForm] = useState(false);
    const [showMarkAsCompleted, setShowMarkAsCompleted] = useState(false);

    const [filteredData, setFilteredData] = useState([]);

    const fetchBookings = useCallback(async () => {
        if (userData.locationId) {
            const locationId = userData?.locationId
            console.log('userData.locationId', locationId)
            const response = await dispatch(getAllReservations(locationId));
            console.log('response', response)
            
        }
    }, [dispatch, userData.locationId]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const filterData = useCallback(() => {
        let result = [...(allReservations || [])];

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

        if (partySize) {
            result = result.filter(item => item.partySize === partySize);
        }

        setFilteredData(result);
    }, [allReservations, clientType, dateRange, source, table, partySize]);

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
            !partySize) {
            setFilteredData(allReservations || []);
        }
    }, [clientType, dateRange, source, table, partySize, allReservations]);

    return (
        <div className="p-4 max-w-7xl mx-auto bg-[#f7f7ff]">
            <h1 className="text-2xl font-semibold text-center mb-6">Reservation</h1>

            <div className="rounded-2xl shadow bg-white p-4">
                <div className="flex flex-col justify-between my-4">
                    <div className="flex gap-3 text-sm">
                        <Button
                            radius="rounded-xl"
                            className="px-2 py-1 shadow-none text-sm"
                            onClick={() => setShowAddForm(true)}
                        >
                            Add Booking +
                        </Button>
                    </div>
                </div>
                
                <div className="flex flex-col md:items-center md:flex-row gap-4 w-full md:w-7/8 text-sm">
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
                        selected={table}
                        onChange={setTable}
                    />
                    
                    <DropdownSelect
                        label="Party Size"
                        options={["1", "2", "3", "4", "5", "6", "7", "8"]}
                        selected={partySize}
                        onChange={setPartySize}
                    />
                    
                    <Button
                        radius="rounded-xl"
                        className="px-5 py-1 shadow-none"
                        onClick={filterData}
                    >
                        Filter
                    </Button>
                </div>

                <AddBookingForm 
                    isOpen={showAddForm} 
                    onClose={() => setShowAddForm(false)} 
                    label="Add Booking"
                    fetchBookings={fetchBookings}
                    isTenantAdmin={false}
                />
                
                <AddBookingForm 
                    isOpen={showEditForm} 
                    onClose={() => setShowEditForm(false)} 
                    label="Edit Booking"
                    initialData={editingRowData}
                    fetchBookings={fetchBookings}
                    isTenantAdmin={false}
                />
                
                <ConfirmationModal 
                    isOpen={showCancelForm} 
                    onClose={() => setShowCancelForm(false)} 
                    label="Cancel Booking" 
                    message="Are you sure to cancel the reservation!" 
                />
                
                <ConfirmationModal 
                    isOpen={showMarkAsCompleted} 
                    onClose={() => setShowMarkAsCompleted(false)} 
                    label="Mark as Completed" 
                    message="Are you sure to Mark the reservation as Completed!" 
                />

                <div className="flex justify-start pt-4">
                    <label className="text-lg font-semibold">All Customers</label>
                </div>
                
                <GenericTable
                    columns={locationBookingHeadings}
                    data={filteredData}
                    actions={["Edit Booking", "Cancel Booking", "No Show", "Mark as Completed"]}
                    handleDropdownChange={handleDropdownChange}
                />
            </div>
        </div>
    );
};

export default Booking;
