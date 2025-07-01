import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form'; // Import Controller
import Input from '../../common/Input';
import MainButton from '../../common/buttons/MainButton';
import DropdownSelect from '../../common/DropdownSelect'; // Assuming this is your Dropdown component

const AddBookingForm = ({ isOpen, onClose, label, initialData }) => { // Added initialData prop
    const {
        register,
        handleSubmit,
        reset,
        control, // Get control from useForm for Controller
        formState: { errors },
    } = useForm({
        defaultValues: initialData || { // Set default values from initialData if provided
            fullName: '',
            email: '',
            partySize: '', // Initialize partySize
            tableNumber: '', // Initialize tableNumber
            planType: '',
            subscriptionType: '',
            status: '',
            startDate: '',
            endDate: '',
        },
    });

    // State for dropdowns (can also be managed directly by Controller if initial values are simple)
    const [selectedPartySize, setSelectedPartySize] = useState(initialData?.partySize || "");
    const [selectedTableNumber, setSelectedTableNumber] = useState(initialData?.tableNumber || "");


    const onSubmit = (data) => {
        console.log("Booking Submitted:", data);
        // Add API or state logic here
        reset();
        onClose();
    };

    // Effect to reset form when initialData changes (for editing)
    // useEffect(() => {
    //     if (initialData) {
    //         reset(initialData);
    //         setSelectedPartySize(initialData.partySize || "");
    //         setSelectedTableNumber(initialData.tableNumber || "");
    //     } else {
    //         reset({ // Reset to empty if no initialData
    //             fullName: '',
    //             email: '',
    //             partySize: '',
    //             tableNumber: '',
    //             planType: '',
    //             subscriptionType: '',
    //             status: '',
    //             startDate: '',
    //             endDate: '',
    //         });
    //         setSelectedPartySize("");
    //         setSelectedTableNumber("");
    //     }
    // }, [initialData, reset]);


    return (
        <AnimatePresence>
            {isOpen && (
                <div className='absolute top-0 left-0 w-svw h-svh'>
                    <div className='w-full h-full flex items-center justify-center'>
                        <motion.div
                            className="fixed inset-0 z-40 bg-black"
                            onClick={() => onClose()}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.2 }}
                            exit={{ opacity: 0 }}
                        />
                        <motion.div
                            initial={{ x: "70%" }}
                            animate={{ x: 0, opacity: 100 }}
                            exit={{ x: "70%", opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="z-50 h-auto w-full max-w-md bg-white rounded-4xl shadow-lg p-6 overflow-y-auto"
                        >
                            <div className="mb-5 flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-textPrimary">{label}</h2>
                                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                                {/* Full Name */}
                                <div className='flex w-full items-center'>
                                    <label className="w-2/8 text-left text-sm text-textSecondary font-medium mb-1">Full Name</label>
                                    <Input
                                        className="w-6/8 py-1 "
                                        placeholder="Enter your full name"
                                        {...register("fullName", { required: "Full Name is required" })}
                                    />
                                </div>

                                {/* Email */}
                                <div className='flex w-full items-center'>
                                    <label className="w-2/8 text-left text-sm text-textSecondary font-medium mb-1">Email</label>
                                    <Input
                                        className="w-6/8 py-1"
                                        placeholder="Enter your email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: { value: /^\S+@\S+$/, message: "Invalid email" },
                                        })}
                                    />
                                </div>

                                <div className='flex'>
                                    {/* Party Size */}
                                    <div className='flex w-1/2 items-center'>
                                        <label className="w-2/6 text-left text-sm text-textSecondary font-medium mb-1">Party Size</label>
                                        <Controller
                                            name="partySize"
                                            control={control}
                                            rules={{ required: "Party Size is required" }}
                                            render={({ field }) => (
                                                <DropdownSelect
                                                    label={selectedPartySize || "Select Size"}
                                                    options={["1", "2", "3", "4", "5", "6", "7", "8"]}
                                                    selected={field.value} // Use field.value for the selected prop
                                                    onChange={(value) => {
                                                        field.onChange(value);
                                                        setSelectedPartySize(value);
                                                    }}
                                                />
                                            )}
                                        />
                                    </div>

                                    {/* Table */}
                                    <div className='flex w-1/2 items-center'>
                                        <label className="w-2/6 text-left text-sm text-textSecondary font-medium mb-1">Table</label>
                                        <Controller
                                            name="tableNumber"
                                            control={control}
                                            rules={{ required: "Table Number is required" }}
                                            render={({ field }) => (
                                                <DropdownSelect
                                                    label={selectedTableNumber || "Select Table"}
                                                    options={Array.from({ length: 20 }, (_, i) => String(i + 1))} // Ensure options are strings
                                                    selected={field.value} // Use field.value for the selected prop
                                                    onChange={(value) => {
                                                        field.onChange(value);
                                                        setSelectedTableNumber(value); 
                                                    }}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-center w-full gap-2">
                                    <div className="flex items-center justify-center w-1/2">
                                        <label className="w-2/6 text-left text-sm text-textSecondary font-medium mb-1">Time</label>
                                        <input
                                            type="time"
                                            className="w-4/6 text-xs border border-gray-400 px-1 py-2 rounded-xl"
                                            {...register("time", { required: "Time is required" })}
                                        />
                                    </div>
                                    <div className="flex items-center justify-center w-1/2">
                                        <label className="w-2/6 text-left text-sm text-textSecondary font-medium mb-1">Date</label>
                                        <input
                                            type="date"
                                            className="w-4/6 rounded-xl text-xs border border-gray-400 px-1 py-2"
                                            {...register("date")}
                                        />
                                    </div>
                                </div>

                                <div className='flex w-full items-center'>
                                    <label className="w-2/8 text-left text-sm text-textSecondary font-medium mb-1">Zip Code</label>
                                    <Input
                                        className="w-6/8 py-1"
                                        {...register("zipCode", {
                                            required: "Zip Code is required",
                                        })}
                                    />
                                </div>

                                <div className='flex w-full items-center'>
                                    <label className="w-2/8 text-left text-sm text-textSecondary font-medium">Source</label>
                                    <div className="flex gap-4 w-6/8">
                                        {["Walk-in", "Reservation"].map((type) => (
                                            <label key={type} className="flex items-center gap-2 text-sm">
                                                <input
                                                    type="radio"
                                                    value={type}
                                                    {...register("source", { required: "Source is required" })}
                                                />
                                                {type}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className='flex flex-col gap-3'>
                                    <Input 
                                    type='textarea'
                                    placeholder="Any Allergy"
                                    />
                                    <Input 
                                    type='textarea'
                                    placeholder="Any Special Request"
                                    />
                                    <Input 
                                    type='textarea'
                                    placeholder="Any Note"
                                    />
                                </div>

                                <div className="pt-4 mb-3 flex justify-end gap-3">
                                    <MainButton
                                        onClick={() => {
                                            onClose();
                                            reset();
                                        }}
                                        className="bg-gray-600 px-3"
                                        radius='rounded-xl'
                                    >
                                        Cancel
                                    </MainButton>
                                    <MainButton type="submit" className="px-3" radius='rounded-xl'>
                                        Save
                                    </MainButton>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AddBookingForm;