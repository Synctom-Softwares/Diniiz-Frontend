/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { div } from 'framer-motion/client';
import { useForm } from 'react-hook-form';
import Input from '../../common/Input';
import MainButton from '../../common/buttons/MainButton';
import { useSelector, useDispatch } from 'react-redux';
import { createTenant, editTenant } from '../../../store/slices/super-admin/tenants/tenantSlice';
import { useToast } from '../../common/toast/useToast';

const AddTenantForm = ({ isOpen, onClose, label, fetchTenants, initialData }) => {

    const plans = useSelector(state => state.plan.plans);
    const { loading, error } = useSelector(state => state.tenants)
    const dispatch = useDispatch();
    const { toast } = useToast();


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log("Tenant Submitted:", data);

        let response;

        if (label === "Add Tenant") {
            response = await dispatch(createTenant(data));
            fetchTenants()
        } else {
            response = await dispatch(editTenant(data))
            fetchTenants()
        }
        
        console.log('response', response)

        if (response.payload?.success === true) {
            toast({
                title: response.payload?.message,
                variant: "success",
            });

            onClose();
        } else {
            toast({
                title: response.payload?.message,
                variant: "destructive",
            });
            onClose();
        }

        reset();
        onClose();
    };

    useEffect(() => {
        if (isOpen && initialData) {
            reset({
                _id: initialData._id,
                tenantName: initialData.tenantName,
                phone: initialData.phone,
                email: initialData.email,
                address: initialData.address,
                planId: initialData.planId,
                subscriptionType: initialData.subscriptionType,
                status: initialData.status,
                startDate: initialData.startDate,
                nextBillingDate: initialData.nextBillingDate,
            });
        } else if (!isOpen) {
            reset();
        }
    }, [isOpen, initialData, reset]);

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
                            animate={{ x: 0, opacity: 100 }}
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
                                        {...register("tenantName", { required: "Tenant Name is required" })}
                                    />

                                    {/* {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>} */}
                                </div>

                                {/* Contact Number */}
                                <div className='flex w-full items-center'>
                                    <label className="w-2/6 text-left text-sm text-textSecondary font-medium mb-1">Contact Number</label>
                                    <Input
                                        className="w-4/6 py-1"
                                        {...register("phone", { required: "Contact number is required" })}
                                    />
                                    {/* {errors.contact && <p className="text-red-500 text-xs">{errors.contact.message}</p>} */}
                                </div>

                                {/* Email */}
                                <div className='flex w-full items-center'>
                                    <label className="w-2/6 text-left text-sm text-textSecondary font-medium mb-1">Email</label>
                                    <Input
                                        className="w-4/6 py-1"
                                        {...register("email", {
                                            pattern: { value: /^\S+@\S+$/, message: "Invalid email" },
                                        })}
                                    />
                                    {/* {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>} */}
                                </div>

                                <div className='flex w-full items-center'>
                                    <label className="w-2/6 text-left text-sm text-textSecondary font-medium mb-1">Address</label>
                                    <Input
                                        className="w-4/6 py-1"
                                        {...register("address")}
                                    />
                                    {/* {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>} */}
                                </div>

                                {/* Plan Type */}
                                <div className='flex w-full items-center'>
                                    <label className="w-2/6 text-left text-sm text-textSecondary font-medium">Plan Type</label>
                                    <div className="flex gap-4">
                                        {plans?.map((plan, i) => (
                                            <label key={i} className="flex items-center gap-2 text-sm">
                                                <input
                                                    type="radio"
                                                    disabled={!(label === "Add Tenant")}
                                                    value={plan._id}
                                                    {...register("planId", { required: true })}
                                                />
                                                {plan.planName}
                                            </label>
                                        ))}
                                    </div>
                                    {/* {errors.planType && <p className="text-red-500 text-xs">Select a plan</p>} */}
                                </div>

                                {/* Subscription Type */}
                                <div className='flex w-full items-center'>
                                    <label className="w-2/6 text-left text-sm text-textSecondary font-medium">Subscription Type</label>
                                    <div className="flex gap-4">
                                        {["Monthly", "Yearly"].map((type) => (
                                            <label key={type} className="flex items-center gap-2 text-sm">
                                                <input
                                                    type="radio"
                                                    disabled={!(label === "Add Tenant")}
                                                    value={type.toLowerCase()}
                                                    {...register("subscriptionType", { required: true })}
                                                />
                                                {type}
                                            </label>
                                        ))}
                                    </div>
                                    {/* {errors.subscriptionType && <p className="text-red-500 text-xs">Choose one</p>} */}
                                </div>

                                {/* Status */}
                                <div className='flex items-center justify-center'>
                                    <label className="w-2/6 text-left text-sm text-textSecondary font-medium">Status</label>
                                    <div className="w-4/6 flex gap-4">
                                        {["Active", "Inactive"].map((status) => (
                                            <label key={status} className="flex items-center gap-2 text-sm">
                                                <input
                                                    type="radio"
                                                    disabled={!(label === "Add Tenant")}
                                                    value={status.toLowerCase()}
                                                    {...register("status", { required: true })}
                                                />
                                                {status}
                                            </label>
                                        ))}
                                    </div>
                                    {/* {errors.status && <p className="text-red-500 text-xs">Select a status</p>} */}
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
                                    {/* {errors.startDate && <p className="text-red-500 text-xs">{errors.startDate.message}</p>} */}
                                    <div className="flex items-center justify-center w-1/2">
                                        <label className="w-2/5 text-left text-sm text-textSecondary font-medium mb-1">End Date</label>
                                        <input
                                            type="date"
                                            className="w-3/5 text-xs border border-gray-400 px-3 py-2 rounded"
                                            {...register("nextBillingDate")}
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
