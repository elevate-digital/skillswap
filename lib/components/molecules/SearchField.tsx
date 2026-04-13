'use client';

import { XIcon } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchFieldProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchField({ searchTerm, setSearchTerm }: SearchFieldProps) {
  const handleClear = () => setSearchTerm("");

  return (
    <div className="flex flex-col w-[100%] md:w-[78%] relative">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Skill zoeken.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-[var(--primary-bg-color)] py-[.8em] px-[1em] rounded-[8px] w-full"
        />

        <AnimatePresence>
          {searchTerm && (
            <motion.button key="clear-btn"
              onClick={handleClear}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 10, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              <XIcon size={18} weight="bold" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
