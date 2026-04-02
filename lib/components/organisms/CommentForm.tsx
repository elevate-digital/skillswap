'use client';

import { Input, Button, ProfilePicture, useAuth, useComment } from "@/lib/components";
import { PaperPlaneIcon } from "@phosphor-icons/react";
import { useState } from "react";

export function CommentForm() {
    const { user } = useAuth();
    const { addComment, formStatus } = useComment();

    const [comment, setComment] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user) return;

        try {
            await addComment(comment);
            setComment("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col gap-[1.5em]">
            <div className="flex w-[100%] h-px bg-gray-300" />
            <form className="flex gap-3" onSubmit={handleSubmit}>
                <ProfilePicture className="w-[2em]" name={user?.name || ""} />
                <Input
                    name="comment"
                    type="text"
                    placeholder="Type hier jouw comment.."
                    required
                    value={comment}

                    onChange={(e) => setComment(e.target.value)}
                />

                <Button
                    type="submit"
                    variant="primary"
                    icon={formStatus === "submitting" ? undefined : PaperPlaneIcon}
                    disabled={formStatus === "submitting"}
                >

                    <span className="sr-only">Plaats reactie</span>
                    
                    <span className="hidden md:block">
                        {formStatus === "submitting" ? (
                            <div className="flex items-center gap-3">
                                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4 inline-block"></span>
                                <span className="ml-2">Plaatsen...</span>
                            </div>
                        ) : (
                            "Plaatsen"
                        )}
                    </span>
                </Button>

            </form>
        </div>
    )
}