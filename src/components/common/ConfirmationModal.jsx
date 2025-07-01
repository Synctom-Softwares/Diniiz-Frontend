
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { div } from 'framer-motion/client';
import { useForm } from 'react-hook-form';
import Input from './Input';
import MainButton from './buttons/MainButton';

const ConfirmationModal = ({ isOpen, onClose, label, message }) => {


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
                            animate={{ x: 0, opacity: 100 }}
                            exit={{ x: "70%", opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className=" z-50 h-auto w-full max-w-md bg-white rounded-4xl shadow-lg p-6 overflow-y-auto"
                        >
                            <div className="mb-5">
                                <h2 className="text-lg font-bold text-textPrimary">{label}</h2>
                            </div>

                            <div className='flex justify-start text-textSecondary'>
                                <p>{message}</p>
                            </div>

                            <div className="pt-4 mb-3 flex justify-end gap-3">
                                <MainButton
                                    onClick={() => {
                                        onClose()
                                    }}
                                    className="bg-gray-600 px-3"
                                    radius='rounded-xl'
                                >
                                    No
                                </MainButton>
                                <MainButton type="submit" className="px-3" radius='rounded-xl'>
                                    Yes
                                </MainButton>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmationModal;
