"use client";

type TagProps = {
  title: string;
};

export function Tag({ title }: TagProps) {
  return (
    <p className="inline-block bg-[var(--primary-bg-color)] px-[12px] rounded-[var(--border-radius-md)] !font-[var(--font-weight-m)]">
      {title}
    </p>
  );
}
