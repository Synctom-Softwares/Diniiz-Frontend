// src/components/reservationWidget/FindTable.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainButton from "../common/buttons/MainButton";
import DropdownSelect from "../common/DropdownSelect";


const timeOptions = ["6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM"];

const availableTables = ["6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM"];

const FindTable = ({ data, update, onContinue }) => {
    const [showTables, setShowTables] = useState(false);
    const [selectedTable, setSelectedTable] = useState("");

    const handleSearch = () => {
        if (data.people && data.date && data.time) {
            setShowTables(true);
        }
    };

    const handleSelectTable = (table) => {
        setSelectedTable(table);
        update("table", table);
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
                            options={[1, 2, 3, 4, 5, 6, 7, 8]}
                            selected={data?.people}
                            onChange={(val) => update("people", val)}
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

                    <DropdownSelect
                        label="Time"
                        className="hover:bg-widgetColor"
                        options={timeOptions}
                        selected={data?.time}
                        onChange={(val) => update("time", val)}
                        placeholder="Select time"
                    />
                </div>
            </div>

            {/* Find Button */}
            <div className="text-center">
                <MainButton onClick={handleSearch} className="px-4 bg-widgetColor">Find Tables</MainButton>
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
                        <h3 className="text-lg font-medium">Available Tables</h3>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {availableTables.map((table) => (
                                <button
                                    key={table}
                                    onClick={() => handleSelectTable(table)}
                                    className={`border border-textSecondary text-textSecondary text-xs px-2 py-1 rounded transition-all ${selectedTable === table
                                        ? "bg-widgetColor text-white"
                                        : "hover:bg-gray-100"
                                        }`}
                                >
                                   {table}
                                </button>
                            ))}
                        </div>

                        {/* Continue Button */}
                        {selectedTable && (
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
