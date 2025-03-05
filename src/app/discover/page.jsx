"use client";

import useSWR from "swr";
import { useSearchParams, notFound } from "next/navigation";
import Banner from "@/components/banner";
import CardSection from "@/components/cards_section";
import { Suspense } from "react";

const JSONfetcher = (...args) => fetch(...args).then((res) => res.json());

export function DiscoverSection({ id }) {
  // Fetch discover configuration
  const {
    data: discoverData,
    isLoading: discoverLoading,
    error: discoverError,
  } = useSWR("discover.json", JSONfetcher);

  // Fetch courses data
  const {
    data: courses,
    isLoading: coursesLoading,
    error: coursesError,
  } = useSWR("courses.json", JSONfetcher);

  // Handle loading state
  if (discoverLoading || coursesLoading) {
    return <div role="status" aria-live="polite">Loading data...</div>;
  }

  // Handle error state
  if (discoverError || coursesError) {
    return <div role="alert">Error loading data. Please try again later.</div>;
  }

  // Find the specific section by ID
  const section = discoverData?.find((item) => item.id == id);

  // Handle case where no matching section is found
  if (!section) {
    notFound();
    return null; // Prevent further rendering
  }

  const { title, image, description, cardSections } = section;

  return (
    <main aria-labelledby="discover-heading">
      <Banner fullScreen heading={title} body={description} image={image} />
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 id="discover-heading" className="sr-only">
          {title}
        </h1>
        <p className="mt-6">{description}</p>
      </section>

      {/* Dynamically render CardSections */}
      {cardSections.map((cardSection, index) => (
        <CardSection
          key={index}
          title={cardSection.title}
          description={cardSection.description}
          cards={courses}
          useCarousel={cardSection.useCarousel}
          filters={cardSection.filters}
          onViewAll={cardSection.onViewAll || "search.html"}
        />
      ))}
      <div className="mb-6" />
    </main>
  );
}

export function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Handle missing ID gracefully
  if (!id) {
    return (
      <div role="alert" aria-live="polite">
        No section ID provided.
      </div>
    );
  }

  return <DiscoverSection id={id} />;
}

export default function PageSuspense() {
  return (
    <Suspense fallback={<div role="status" aria-live="polite">Loading page...</div>}>
      <Page />
    </Suspense>
  );
}