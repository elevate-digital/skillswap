import React from 'react';

export function Tag() {
    return (
        <ul className="list-none flex gap-2">
            <li>
                <p className="inline-block bg-[var(--secondary-highlight-color)] px-[12px] rounded-[var(--border-radius-md)] !font-[var(--font-weight-m)]">React</p> 
            </li>
            <li>
                <p className="inline-block bg-[var(--secondary-highlight-color)] px-[12px] rounded-[var(--border-radius-md)] !font-[var(--font-weight-m)]">Javascript</p> 
            </li>
        </ul>
    )
}