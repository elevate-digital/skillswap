"use client";

import React from 'react';
import { DiscussionCard } from "@/lib/components";

export function DiscussionCards() {
    return (
        <ul className='list-none flex flex-col gap-4'>
            <li>
               <DiscussionCard /> 
            </li>
        </ul>
    )
}
