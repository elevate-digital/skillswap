'use client';

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DiscussionCards, Switch, useSkills, ResultPanel, FilterPanel } from "@/lib/components";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <PageContent />
    </Suspense>
  );
}

export function PageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { offerCount, requestCount, offerOpenCount, offerCompletedCount, requestOpenCount, requestCompletedCount } = useSkills();

  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("all");

  const filteredOfferCount =
    status === "all"
      ? offerCount
      : status === "open"
      ? offerOpenCount
      : offerCompletedCount;

  const filteredRequestCount =
    status === "all"
      ? requestCount
      : status === "open"
      ? requestOpenCount
      : requestCompletedCount;
  

  useEffect(() => {
    const type = searchParams.get("type");
    if (!type) {
      router.replace("/?type=OFFER");
    }
  }, [searchParams, router]);

  return (
    <main id="inhoud" className="py-[1em] md:py-[2em] flex flex-col gap-5">
      <ResultPanel />

      <FilterPanel
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        status={status}
        setStatus={setStatus}
        openCount={offerOpenCount + requestOpenCount}
        completedCount={offerCompletedCount + requestCompletedCount}
      />

      <div className="w-full md:w-[26em] self-baseline">
        <Switch
          param="type"
          options={["OFFER", "REQUEST"]}
          labels={[
            `Skills (${filteredOfferCount})`,
            `Hulpvragen (${filteredRequestCount})`
          ]}
        />
      </div>

      <DiscussionCards searchTerm={searchTerm} status={status} />
    </main>
  );
}
