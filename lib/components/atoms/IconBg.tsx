"use client";

import React from 'react';
import { StarIcon } from "@phosphor-icons/react";

export function IconBg() {
    return (
        <StarIcon weight="regular" className="bg-[var(--third-highlight-color)] rounded-[var(--border-radius-md)] p-[10px]" width={45} height={45} />
    )
}