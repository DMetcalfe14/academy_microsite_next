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
  } = data;

  const { setTourConfig } = useTour();
  const pathname = usePathname();

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
        heading="Welcome"
        body="Learn the skills needed to lead high-performing teams with the Leadership and Management Academy."
        image="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Something"
        cta={{ label: "Read welcome article", href: "google.com" }}
        fullScreen={false}
      />

      {/* Card Section */}
      <CardSection
        id="featured"
        title="Featured"
        cards={courses}
        filters={featured_home}
        description="Featured content brings you the latest news, updates, thinking, and initiatives across government and wider, that directly impact leadership and management development."
      />

      {/* Featured Section */}
      <CategorySection categories={categories}></CategorySection>

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
