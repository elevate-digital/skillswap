'use client';

import { CommentForm, PopupHeader, Comment, useComment, useSkills } from "@/lib/components"
import { PlusIcon, LockIcon } from "@phosphor-icons/react";

export function CommentPopup() {
   const { comments, loading, skillId } = useComment();
    const { skills } = useSkills();

    const skill = skills?.find((s) => s.id === skillId);
    const title = skill?.title ?? "Reacties";

    const isClosed = skill?.completed;

    // Nieuwste bovenaan
    const sortedComments = [...comments].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const newestCommentId = sortedComments[0]?.id;

    return (
        <section className="fixed top-0 right-0 bg-[var(--primary-bg-color)] w-[100%] md:w-[540px] h-[100dvh] z-[3100] p-[15px] md:p-[25px] flex flex-col justify-between">
            <a href="/" className="absolute right-[1.2em] top-[1.3em]">
                <span className="sr-only">Sluit popup</span>
                <PlusIcon width={26} height={26} className="rotate-45" />
            </a>

            <PopupHeader title="Reacties" description={title} />

            <ul className="flex flex-col gap-[1.5em] h-[80vh] pt-[2em] overflow-auto">
                {!loading && comments.length === 0 && <p className="m-auto">Geen reacties. Plaats hier als eerste jouw reactie!</p>}

                {sortedComments.map((comment) => (
                    <li key={comment.id}>
                        <Comment 
                            data={comment} 
                            isNew={comment.id === newestCommentId} 
                        />
                    </li>
                ))}         
            </ul>

            {!isClosed && <CommentForm />}
            {isClosed && 
            <div className="flex flex-col gap-5">
                <div className="flex w-[100%] h-px bg-gray-300" />
                <p className="flex items-center gap-3 justify-center bg-white rounded-[.5em] p-[.8em]"><LockIcon size={22} weight="fill" fill="#BF2D2D" />Deze ticket is gesloten. Reacties plaatsen is uitgezet.</p>
            </div>
            }
        </section>
    );
}
