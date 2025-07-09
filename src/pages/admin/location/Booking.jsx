import { useState, useEffect, useCallback } from "react";
import DropdownSelect from "../../../components/common/DropdownSelect";
import GenericTable from "../../../components/common/GenericTable";
import { locationBookingHeadings } from "../../../constants/tableHeadings/locationBookingHeadings";
import Button from '../../../components/common/buttons/MainButton'
import AddBookingForm from "../../../components/tenant/booking/AddBookingForm";
import ConfirmationModal from '../../../components/common/ConfirmationModal'
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from "react-redux";
import { getAllReservations, getAllStaffReservations } from "../../../store/slices/location/reservationSlice";
import Loader from "../../../components/common/Loader";
import locationApi from "../../../config/locationApi";

const Booking = () => {
    const dispatch = useDispatch();
    const { allReservations, loading, error } = useSelector((state) => state.reservation);
    const userData = useSelector(state => state.auth.userData);
    const isLocationAdmin = userData?.role === "location-admin";
    const staffId = !isLocationAdmin ? userData?._id : null;
    const locationId = userData?.locationId;

    const [clientType, setClientType] = useState("");
    const [dateRange, setDateRange] = useState([null, null]);
    const [source, setSource] = useState("");
    const [tableId, setTableId] = useState("");
    const [partySize, setPartySize] = useState("");
    const [localLoading, setLocalLoading] = useState(false);
    const [localError, setLocalError] = useState(null);
    const [allTables, setAllTables] = useState([]);

    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingRowData, setEditingRowData] = useState(null);
    const [showCancelForm, setShowCancelForm] = useState(false);
    const [noShowForm, setNoShowForm] = useState(false);
    const [showMarkAsCompleted, setShowMarkAsCompleted] = useState(false);

    const fetchBookings = useCallback(async (filters = {}) => {
        if (!userData?.locationId) return;
        
        setLocalLoading(true);
        setLocalError(null);
        
        try {
            const params = {
                ...filters,
                locationId
            };

            if (isLocationAdmin) {
                await dispatch(getAllReservations(params));
            } else {
                await dispatch(getAllStaffReservations({ 
                    ...params,
                    staffId 
                }));
            }
        } catch (err) {
            console.error('Failed to fetch bookings:', err);
            setLocalError('Failed to load bookings. Please try again.');
        } finally {
            setLocalLoading(false);
        }
    }, [dispatch, userData, isLocationAdmin, staffId, locationId]);

    const handleFilter = useCallback(() => {
        const filters = {};
        
        if (clientType) filters.clientType = clientType;
        if (dateRange && dateRange[0] && dateRange[1]) {
            filters.dateRange = [new Date(dateRange[0]).toISOString(), new Date(dateRange[1]).toISOString()]
        }
        if (source) filters.source = source;
        if (tableId) filters.tableId = tableId;
        if (partySize) filters.partySize = partySize;

        fetchBookings(filters);
    }, [clientType, dateRange, source, tableId, partySize, fetchBookings]);

    const handleResetFilters = useCallback(() => {
        setClientType("");
        setDateRange([null, null]);
        setSource("");
        setTableId("");
        setPartySize("");
        fetchBookings(); // Fetch without filters
    }, [fetchBookings]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

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
        const fetchAllTables = async () => {
            try {
                const response = await locationApi.post(`/${locationId}/tables`);
                if (response) {
                    setAllTables(response.tables);
                }
            } catch (err) {
                console.error('Failed to fetch tables:', err);
            }
        }

        if (locationId) {
            fetchAllTables();
        }
    }, [locationId]);

    const isLoading = loading || localLoading;
    const hasError = error || localError;
    const hasFilters = clientType || (dateRange[0] && dateRange[1]) || source || tableId || partySize;

    return (
        <div className="p-4 max-w-7xl mx-auto bg-[#f7f7ff]">
            <h1 className="text-2xl font-semibold text-center mb-6">Reservation</h1>

            <div className="rounded-2xl shadow bg-white p-4">
                {isLoading && !hasError ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader size="lg" />
                    </div>
                ) : hasError ? (
                    <div className="flex flex-col items-center justify-center h-64">
                        <p className="text-red-500 mb-4">{hasError}</p>
                        <Button 
                            onClick={() => fetchBookings()}
                            className="px-4 py-2"
                        >
                            Retry
                        </Button>
                    </div>
                ) : (
                    <>
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
                                options={["New", "Returning", "VIP"].map((type) => ({
                                    id: type.toLowerCase(),
                                    label: type,
                                    value: type.toLowerCase()
                                }))}
                                selected={clientType}
                                onChange={(opt) => setClientType(opt.value)}
                            />
                            
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-textPrimary mb-1">Date Range</label>
                                <DateRangePicker
                                    onChange={setDateRange}
                                    value={dateRange}
                                    className="react-daterange-picker-custom rounded-2xl"
                                    clearIcon={null}
                                />
                            </div>
                            
                            <DropdownSelect
                                label="Source"
                                options={["Walk-in", "Reserved"].map((type) => ({
                                    id: type.toLowerCase(),
                                    label: type,
                                    value: type.toLowerCase()
                                }))}
                                selected={source}
                                onChange={(opt) => setSource(opt.value)}
                            />
                            
                            <DropdownSelect
                                label="Table"
                                options={allTables?.map((table) => ({
                                    id: table._id,
                                    label: table._id,
                                    value: table._id
                                }))}
                                selected={tableId}
                                onChange={(opt) => setTableId(opt.value)}
                            />
                            
                            <DropdownSelect
                                label="Party Size"
                                options={["1", "2", "3", "4", "5", "6", "7", "8"].map((size) => ({
                                    id: size,
                                    label: size,
                                    value: size
                                }))}
                                selected={partySize}
                                onChange={(opt) => setPartySize(opt.value)}
                            />
                            
                            <Button
                                radius="rounded-xl"
                                className="px-5 py-1 shadow-none"
                                onClick={handleFilter}
                            >
                                Filter
                            </Button>
                            
                            {hasFilters && (
                                <Button
                                    radius="rounded-xl"
                                    className="px-5 py-1 shadow-none bg-amber-300"
                                    onClick={handleResetFilters}
                                >
                                    Reset
                                </Button>
                            )}
                        </div>

                        <AddBookingForm 
                            isOpen={showAddForm} 
                            onClose={() => setShowAddForm(false)} 
                            label="Add Booking"
                            fetchBookings={() => fetchBookings()}
                            isTenantAdmin={false}
                        />
                        
                        <AddBookingForm 
                            isOpen={showEditForm} 
                            onClose={() => setShowEditForm(false)} 
                            label="Edit Booking"
                            initialData={editingRowData}
                            fetchBookings={() => fetchBookings()}
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
                            data={allReservations || []}
                            actions={["Edit Booking", "Cancel Booking", "No Show", "Mark as Completed"]}
                            handleDropdownChange={handleDropdownChange}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Booking;