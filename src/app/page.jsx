"use client";

import useSWR from "swr";

import CardSection from "../components/cards_section";
import Carousel from "@/components/carousel";
import FeaturedSection from "@/components/featured_section";
import EventSection from "@/components/events_section";
import LinkSection from "@/components/links_section";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function PageContent() {
  const { data: courses = [], isLoading } = useSWR("/courses.json", fetcher, {
    suspense: true,
    fallbackData: [],
  });

  return (
    <div className="">
      <Carousel />
      <CardSection title="Brand new 🌟" cards={courses} filters={{ topN: 4 }} />
      <FeaturedSection cards={courses} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="grid grid-cols-1 gap-6">
            <EventSection cards={courses} />
          </div>
          <div>
            <LinkSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return <PageContent />;
}
