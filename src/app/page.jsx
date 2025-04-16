"use client";

import { useEffect, useState } from "react";
import { useJsonData } from "@/context/json_context";
import { usePathname } from "next/navigation";
import { useTour } from "@/context/tour_context";

import CardSection from "../components/cards_section";
import Banner from "@/components/banner";
import EventSection from "@/components/events_section";
import LinkSection from "@/components/links_section";
import CategorySection from "@/components/category_section";

function PageContent() {
  const { data } = useJsonData();
  const {
    courses = [],
    featured_home = [],
    tours = [],
    categories = [],
    landing = []
  } = data;

  const { setTourConfig } = useTour();
  const pathname = usePathname();
  const { banner, featured, category } = landing;

  useEffect(() => {
    const matchingTour = Object.keys(tours).find((key) =>
      pathname.includes(key)
    );
    if (matchingTour) {
      setTourConfig(tours[matchingTour]);
    }
  }, [tours, pathname, setTourConfig]);

  return (
    <main aria-label="Main content">
      {/* Banner */}
      <Banner
        heading={banner?.title}
        body={banner?.body}
        image={banner?.thumbnail}
        alt={banner?.alt}
        cta={banner?.cta}
        fullScreen={false}
      />

      {/* Card Section */}
      <CardSection
        id="featured"
        title={featured?.title}
        cards={courses}
        filters={featured_home}
        description={featured?.body}
        useCarousel={true}
      />

      {/* Featured Section */}
      <CategorySection categories={categories} title={category?.title} description={category?.body}></CategorySection>

      {/* Events and Links */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Events Section */}
          <EventSection cards={courses} />

          {/* Links Section */}
          <LinkSection />
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <>
      <PageContent />
    </>
  );
}
