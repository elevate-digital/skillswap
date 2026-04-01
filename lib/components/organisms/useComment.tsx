'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/lib/components";
import axios from "axios";

type CommentType = {
    id: number;
    message: string;
    created_at: string;
    user: {
        id: number;
        name: string;
    };
};

type CommentsContextType = {
    comments: CommentType[];
    loading: boolean;
    formStatus: "idle" | "submitting" | "error" | "success";
    fetchComments: () => Promise<void>;
    addComment: (message: string) => Promise<void>;
    skillId?: number;
};

const CommentsContext = createContext<CommentsContextType | null>(null);

export function CommentProvider({
    children,
    skillId,
}: {
    children: React.ReactNode;
    skillId?: number;
}) {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [loading, setLoading] = useState(false);
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");

    const { token } = useAuth();

    const fetchComments = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/comment?skillId=${skillId}`);
            setComments(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addComment = async (message: string) => {
        setFormStatus("submitting");

        try {
            await axios.post(
                `/api/comment`,
                {
                    message,
                    skill_id: skillId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            await fetchComments();
            setFormStatus("success");

            // Reset status na korte delay zodat UI weer idle wordt
            setTimeout(() => setFormStatus("idle"), 800);
        } catch (err) {
            console.error(err);
            setFormStatus("error");
            throw err;
        }
    };

    useEffect(() => {
        if (skillId) fetchComments();
    }, [skillId]);

    return (
        <CommentsContext.Provider
            value={{ comments, loading, formStatus, fetchComments, addComment, skillId }}
        >
            {children}
        </CommentsContext.Provider>
    );
}

export function useComment() {
    const context = useContext(CommentsContext);
    if (!context) {
        throw new Error("useComment must be used within CommentProvider");
    }
    return context;
}
