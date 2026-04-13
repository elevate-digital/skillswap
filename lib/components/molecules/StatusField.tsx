'use client';

interface StatusFieldProps {
  status: string;
  setStatus: (value: string) => void;
  openCount: number;
  completedCount: number;
}

export function StatusField({ status, setStatus, openCount, completedCount }: StatusFieldProps) {
  return (
    <div className="w-full md:w-[30%] lg:max-w-[20%]">
      <label htmlFor="status" className="sr-only">
        Filter op status
      </label>

      <select id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)} className="status-select w-full py-[.8em] px-[1em] rounded-md bg-[var(--primary-bg-color)] cursor-pointer">
        <option value="all" className="py-[.6em] px-[.7em] rounded-[3px] cursor-pointer">
          Alle Status ({openCount + completedCount})
        </option>
        <option value="open" className="py-[.6em] px-[.7em] rounded-[3px] cursor-pointer">
          Open ({openCount})
        </option>
        <option value="done" className="py-[.6em] px-[.7em] rounded-[3px] cursor-pointer">
          Afgerond ({completedCount})
        </option>
      </select>
    </div>
  );
}