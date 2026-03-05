import { DiscussionCard } from "@/lib/components";

export default function Home() {
  return (  
    <main id="inhoud" className="py-[1em] md:py-[2em] flex flex-col gap-5">
      <DiscussionCard />
      <DiscussionCard />
      <DiscussionCard />
    </main>
  )
}