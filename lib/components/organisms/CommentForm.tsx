'use client';

import { Input, Button, ProfilePicture, useAuth } from "@/lib/components";
import { PaperPlaneIcon } from "@phosphor-icons/react";

export function CommentForm () {

    const { user } = useAuth();

    return (
        <div className="flex flex-col gap-[1.5em]">
            <div className="flex w-[100%] h-px bg-gray-300" />
            <form className="flex gap-3">
                <ProfilePicture className="w-[2em]" name={user?.name || ""} />
                <Input type="text" placeholder="Type hier jouw comment.." required />
                <Button type="submit" variant="primary" icon={PaperPlaneIcon}><span className="hidden md:block">Plaatsen</span></Button>
            </form>
        </div>
    )
}