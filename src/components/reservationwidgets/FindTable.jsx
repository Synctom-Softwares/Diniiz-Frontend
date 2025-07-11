/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainButton from "../common/buttons/MainButton";
import DropdownSelect from "../common/DropdownSelect";
import { getAvailableTables } from "../reservationwidgets/widgetApi";

const FindTable = ({ data, update, onContinue, locationId }) => {
    const [showTables, setShowTables] = useState(false);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedTime, setSelectedTime] = useState("");
    const [error, setError] = useState("");


    const handleSearch = async () => {
        if (!data.people || !data.date || !data.time || !locationId) {
            setError("Please fill all fields.");
            return;
        }

        setError("");
        setLoading(true);
        console.log('locationId', locationId)
        const response = await getAvailableTables(locationId, {
            partySize: data.people,
            date: data.date,
            time: data.time,
        }
        );
        console.log('response', response)
        setLoading(false);

        if (response.success) {
            setAvailableTimeSlots(response.tableAvailableTime || []);
            setShowTables(true);
        } else {
            setError(response.message || "Could not fetch tables.");
        }
    };

    const handleSelectTime = (time) => {
        setSelectedTime(time);
        update("time", time);
    };

    return (
        <div className="space-y-4 w-full">

            {/* Inputs */}
            <div className="w-full flex flex-col gap-4">

                <div className="w-full flex justify-center">
                    <div className="w-1/2 flex justify-center">
                        <DropdownSelect
                            label="How many people?"
                            className="hover:bg-widgetColor"
                            options={[1, 2, 3, 4, 5, 6, 7, 8].map((num) => ({
                                id: num,
                                label: num,
                                value: num
                            }))}
                            selected={data?.people}
                            onChange={(val) => update("people", val.value)}
                            placeholder="Select"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center gap-5">
                    <div>
                        <input
                            type="date"
                            value={data.date}
                            onChange={(e) => update("date", e.target.value)}
                            className="w-full border px-2 text-sm py-1 rounded-xl"
                        />
                    </div>

                    <input
                        type="time"
                        name=""
                        id=""
                        value={data.time}
                        className=" border px-2 text-sm py-1 rounded-xl"
                        onChange={(e) => update("time", e.target.value)}
                    />

                </div>
            </div>

            {/* Find Button */}
            <div className="text-center">
                <MainButton onClick={handleSearch} className="px-4 bg-widgetColor">{loading ?
                    <div className="flex items-center gap-2">
                        <span className="loader w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                        Loading...
                    </div> : "Find Tables"}</MainButton>
            </div>

            {/* Available Tables */}
            <AnimatePresence>
                {showTables && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        className="mt-6 space-y-4"
                    >
                        <h3 className="text-lg font-medium">Select available time slot:</h3>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {availableTimeSlots?.map((time) => (
                                <button
                                    key={time}
                                    onClick={() => handleSelectTime(time)}
                                    className={`border border-textSecondary text-textSecondary text-xs px-2 py-1 rounded transition-all ${selectedTime === time
                                        ? "bg-widgetColor text-white"
                                        : "hover:bg-gray-100"
                                        }`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>

                        {/* Continue Button */}
                        {selectedTime && (
                            <div className="text-center pt-4 flex justify-end">
                                <MainButton onClick={onContinue} color="bg-widgetColor" className="px-4  ">Continue</MainButton>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FindTable;
