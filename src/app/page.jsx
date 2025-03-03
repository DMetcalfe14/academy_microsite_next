"use client";

import useSWR from "swr";

import CardSection from "../components/cards_section";
import Carousel from "@/components/carousel";
import FeaturedSection from "@/components/featured_section";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function PageContent() {
  const { data: courses = [], isLoading } = useSWR(
    "/courses.json",
    fetcher, {
      suspense: true,
      fallbackData: []
    }
  );

  return (
    <div className="">
      <Carousel />
      <CardSection title="Brand new 🌟" cards={courses} filters={{ topN: 4 }} />
      <FeaturedSection cards={courses} />
    </div>
  );
}

export default function Home() {
  return (
      <PageContent />
  );
}
