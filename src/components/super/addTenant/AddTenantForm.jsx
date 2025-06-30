
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { div } from 'framer-motion/client';
import { useForm } from 'react-hook-form';
import Input from '../../common/Input';
import MainButton from '../../common/buttons/MainButton';

const AddTenantForm = ({ isOpen, onClose, label }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Tenant Submitted:", data);
        // Add API or state logic here
        reset();
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className='absolute top-0  left-0 w-svw h-svh'>
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
                            animate={{ x: 0, opacity:100 }}
                            exit={{ x: "70%", opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className=" z-50 h-auto w-full max-w-md bg-white rounded-4xl shadow-lg p-6 overflow-y-auto"
                        >
                            <div className="mb-5">
                                <h2 className="text-xl font-semibold text-textPrimary">{label}</h2>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                {/* Tenant Name */}

                                <div className='flex w-full items-center'>
                                    <label className="w-2/6 text-left text-sm text-textSecondary font-medium mb-1">Tenant Name</label>
                                    <Input
                                    className="w-4/6 py-1"
                                        {...register("name", { required: "Tenant Name is required" })}
                                    />

                                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                                </div>

                                {/* Contact Number */}
                                <div className='flex w-full items-center'>
                                    <label className="w-2/6 text-left text-sm text-textSecondary font-medium mb-1">Contact Number</label>
                                    <Input
                                        className="w-4/6 py-1"
                                        {...register("contact", { required: "Contact number is required" })}
                                    />
                                    {errors.contact && <p className="text-red-500 text-xs">{errors.contact.message}</p>}
                                </div>

                                {/* Email */}
                                <div className='flex w-full items-center'>
                                    <label className="w-2/6 text-left text-sm text-textSecondary font-medium mb-1">Email</label>
                                    <Input
                                        className="w-4/6 py-1"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: { value: /^\S+@\S+$/, message: "Invalid email" },
                                        })}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                                </div>

                                {/* Plan Type */}
                                <div className='flex w-full items-center'>
                                    <label className="w-2/6 text-left text-sm text-textSecondary font-medium">Plan Type</label>
                                    <div className="flex gap-4">
                                        {["Basic", "Premium", "Enterprise"].map((type) => (
                                            <label key={type} className="flex items-center gap-2 text-sm">
                                                <input
                                                    type="radio"
                                                    value={type}
                                                    {...register("planType", { required: true })}
                                                />
                                                {type}
                                            </label>
                                        ))}
                                    </div>
                                    {errors.planType && <p className="text-red-500 text-xs">Select a plan</p>}
                                </div>

                                {/* Subscription Type */}
                                <div className='flex w-full items-center'>
                                    <label className="w-2/6 text-left text-sm text-textSecondary font-medium">Subscription Type</label>
                                    <div className="flex gap-4">
                                        {["Monthly", "Annual"].map((type) => (
                                            <label key={type} className="flex items-center gap-2 text-sm">
                                                <input
                                                    type="radio"
                                                    value={type}
                                                    {...register("subscriptionType", { required: true })}
                                                />
                                                {type}
                                            </label>
                                        ))}
                                    </div>
                                    {errors.subscriptionType && <p className="text-red-500 text-xs">Choose one</p>}
                                </div>

                                {/* Status */}
                                <div className='flex items-center justify-center'>
                                    <label className="w-2/6 text-left text-sm text-textSecondary font-medium">Status</label>
                                    <div className="w-4/6 flex gap-4">
                                        {["Active", "Trial"].map((status) => (
                                            <label key={status} className="flex items-center gap-2 text-sm">
                                                <input
                                                    type="radio"
                                                    value={status}
                                                    {...register("status", { required: true })}
                                                />
                                                {status}
                                            </label>
                                        ))}
                                    </div>
                                    {errors.status && <p className="text-red-500 text-xs">Select a status</p>}
                                </div>

                                {/* Dates */}
                                <div className="flex items-center justify-center gap-3 w-full">
                                    <div className="flex items-center justify-center w-1/2">
                                        <label className="w-2/5 text-left text-sm text-textSecondary font-medium mb-1">Start Date</label>
                                        <input
                                            type="date"
                                            className="w-3/5  text-xs border border-gray-400 px-3 py-2 rounded"
                                            {...register("startDate", { required: "Start date is required" })}
                                        />
                                    </div>
                                        {errors.startDate && <p className="text-red-500 text-xs">{errors.startDate.message}</p>}
                                    <div className="flex items-center justify-center w-1/2">
                                        <label className="w-2/5 text-left text-sm text-textSecondary font-medium mb-1">End Date</label>
                                        <input
                                            type="date"
                                            className="w-3/5 text-xs border border-gray-400 px-3 py-2 rounded"
                                            {...register("endDate")}
                                        />
                                    </div>
                                </div>


                                {/* Submit */}
                                <div className="pt-4 mb-3 flex justify-end gap-3">
                                    <MainButton 
                                    onClick={() => {
                                        onClose()
                                        reset()
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

export default AddTenantForm;
