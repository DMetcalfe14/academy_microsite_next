"use client";

import { useEffect, useState } from 'react';
import { useJsonData } from '@/context/json_context';

import Tour from "@/components/tour";
import CardSection from "../components/cards_section";
import Carousel from "@/components/carousel";
import FeaturedSection from "@/components/featured_section";
import EventSection from "@/components/events_section";
import LinkSection from "@/components/links_section";

function PageContent() {
  const { data } = useJsonData();
  const { courses = [] } = data;

  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    const isFirstVisit = localStorage.getItem('isFirstVisit');
    if (!isFirstVisit) {
      setShowTour(true);
      localStorage.setItem('isFirstVisit', 'true');
    }
  }, []);

  return (
    <main aria-label="Main content">
      {/* Tour */}
      {showTour && <Tour />}

      {/* Carousel */}
      <Carousel />

      {/* Card Section */}
      <CardSection id="featured" title="Featured 🌟" cards={courses} filters={{ topN: 4 }} />

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
      {/* Skip Link
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:outline focus:outline-primary"
      >
        Skip to main content
      </a> */}

      {/* Main Content */}
      <PageContent />
    </>
  );
}
