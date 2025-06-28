// src/components/common/DropdownSelect.jsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const DropdownSelect = ({ label, options, selected, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        className="w-full border px-3 py-2 rounded flex justify-between items-center bg-white"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{selected || label}</span>
        <ChevronDown size={16} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute z-20 mt-1 w-full bg-white shadow-lg rounded border"
          >
            {options.map((opt) => (
              <li
                key={opt}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
              >
                {opt}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownSelect;
