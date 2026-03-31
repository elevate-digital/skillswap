'use client';

import { CommentForm, PopupHeader, Comment } from "@/lib/components"
import { PlusIcon } from "@phosphor-icons/react";

export function CommentPopup() {
    return (
         <section className="fixed top-0 right-0 bg-[var(--primary-bg-color)] w-[100%] md:w-[540px] h-[100vh] z-[3100] p-[25px] flex flex-col justify-between">
            <a href="/" className="absolute right-[1.2em] top-[1.3em]"><span className="sr-only">Sluit popup</span><PlusIcon width={26} height={26} className="rotate-45" /></a>

            <PopupHeader title="Reacties" description="React Hooks Uitleg & Best Practices" />

            <ul className="flex flex-col gap-[1.5em] h-[80vh] pt-[2em] overflow-auto">
                <li><Comment /></li>
                
                <li><Comment /></li>
                <li><Comment /></li>
                <li><Comment /></li>
                <li><Comment /></li>
            </ul>

            <CommentForm />
        </section>
    )
}