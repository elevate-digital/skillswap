'use client';

import { ProfilePicture } from '@/lib/components'

type CommentProps = {
    data: {
        id: number;
        message: string;
        created_at: string;
        user: {
            id: number;
            name: string;
        };
    };
    isNew?: boolean;
};

export function Comment({ data, isNew }: CommentProps) {
    return (
        <div className="flex flex-col gap-[.5em]">
            <div className="flex gap-2 md:gap-5 items-center">
                <ProfilePicture small name={data.user.name || ""} />
                <p className="!font-medium">{data.user.name}</p>
                <p>
                    {new Date(data.created_at).toLocaleString("nl-NL", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
                {isNew && (
                    <p className="bg-[var(--secondary-bg-color)] rounded-[0.3em] px-2 !text-[13px] !leading-[24px] h-[1.8em]">Nieuw</p>
                )}
            </div>

            <p>{data.message}</p>

            <div className="flex w-[100%] h-px bg-gray-300 mt-[.5em]" />
        </div>
    );
}