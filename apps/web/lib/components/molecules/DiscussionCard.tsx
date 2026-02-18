"use client";

import React from 'react';
import { ClockIcon, ChatCircleIcon, CalendarIcon } from "@phosphor-icons/react";
import { Tag } from "@/lib/components";
import { IconBg } from "@/lib/components";

export function DiscussionCard() {
    return (

    <article className="flex flex-col gap-[1em] items-start bg-[var(--third-bg-color)] p-[25px] md:p-[40px] rounded-[var(--border-radius-md)] border-l-10 border-l-[var(--secondary-bg-color)]">
        <section className="flex gap-3 flex-col-reverse md:flex-row items-baseline md:items-center justify-between w-[100%]">
            <h1 className="flex items-center gap-5 !text-[18px] md:!text-[24px]"><IconBg />React Hooks Uitleg & Best Practices</h1>
            <span className="flex items-center gap-1 items-center bg-[var(--succes-color)] text-[var(--third-bg-color)] px-[12px] rounded-[var(--border-radius-md)]"><ClockIcon /><p className="!text-[var(--secondary-text-color)]">Open</p></span>
        </section>
        <Tag />
        <p>Ik kan je helpen met useState, useEffect, useContext en custom hooks. Heb meerdere projecten gebouwd met React en kan praktische voorbeelden geven.</p>
        <div className="h-[1px] bg-[#CBCBCB] w-[100%]"></div>

        <section className="flex items-center justify-between w-[100%] mt-2">
            <div className="flex items-center gap-3">
                <p className="w-[45px] h-[45px] rounded-full bg-[var(--primary-highlight-color)] flex items-center justify-center !text-[var(--secondary-text-color)] !font-[var(--font-weight-m)]">EV</p>
                <div className="flex flex-col">
                    <span className="text-[16px] font-medium text-[var(--primary-text-color)]">Emma Visser</span>
                    <span className="flex flex-row items-center gap-1 text-[14px] text-[var(--primary-text-color)]"><CalendarIcon /> 2 feb 2026</span>
                </div>
            </div>
            <span className="flex items-center gap-1 text-[var(--primary-text-color)] bg-[var(--primary-bg-color)] rounded-full px-[12px]"><ChatCircleIcon className="w-4 h-4" />2</span>
        </section>

        <label className="flex items-center gap-2 font-[var(--font-weight-m)] text-[16px] text-[var(--primary-text-color)] pt-[1em]">
            <input type="checkbox" className="peer appearance-none w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer checked:bg-[var(--secondary-bg-color)] before:content-[''] before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:shadow-md checked:before:translate-x-6 before:transition-transform before:duration-300"/>
            <span className="peer-checked:hidden">open</span>
            <span className="hidden peer-checked:inline">gesloten</span>
        </label>
    </article>

    )
}
