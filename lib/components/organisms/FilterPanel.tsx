'use client';

import { SearchField, StatusField } from "@/lib/components";

interface FilterPanelProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  openCount: number;
  completedCount: number;
}

export function FilterPanel({ searchTerm, setSearchTerm, status, setStatus, openCount, completedCount }: FilterPanelProps) {
  return (
    <div className="bg-white rounded-[1em] p-5 flex flex-col md:flex-row gap-3 md:gap-4">
      <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <StatusField status={status} setStatus={setStatus} openCount={openCount} completedCount={completedCount} />
    </div>
  );
}
