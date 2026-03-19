'use client';

import React from "react";
import { motion } from "framer-motion";

interface ContainerProps {
    children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
    return (
        <motion.main className="px-[5%] max-w-[1400px] m-auto">
           {children}
        </motion.main>
    )
}