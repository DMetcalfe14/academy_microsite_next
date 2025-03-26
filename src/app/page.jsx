"use client";

import { useEffect, useState } from 'react';
import { useJsonData } from '@/context/json_context';
import { usePathname } from "next/navigation";
// import Tour from "@/components/tour";
import { useTour } from "@/context/tour_context";

import CardSection from "../components/cards_section";
import Carousel from "@/components/carousel";
import FeaturedSection from "@/components/featured_section";
import EventSection from "@/components/events_section";
import LinkSection from "@/components/links_section";

function PageContent() {
  const { data } = useJsonData();
  const { 
    courses = [],
    featured_home = [],
    tours = [] // new
   } = data;

   const { setTourConfig } = useTour();
   const pathname = usePathname();

   useEffect(() => {
    const matchingTour = Object.keys(tours).find(key => pathname.includes(key));
    if (matchingTour) {
      setTourConfig(tours[matchingTour]);
    }
  }, [tours, pathname, setTourConfig]);

  return (
    <main aria-label="Main content">
      {/* Carousel */}
      <Carousel />

      {/* Card Section */}
      <CardSection id="featured" title="Featured 🌟" cards={courses} filters={featured_home} />

      {/* Featured Section */}
      <FeaturedSection cards={courses} />

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
