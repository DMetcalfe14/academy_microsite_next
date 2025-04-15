"use client";

import { useJsonData } from '@/context/json_context';
import { useSearchParams, notFound } from "next/navigation";
import Banner from "@/components/banner";
import CardSection from "@/components/cards_section";
import { Suspense } from "react";

export function DiscoverSection({ id }) {
  
  const { data, isLoading, isError } = useJsonData();

  const {
    courses = [],
    discover = [],
  } = data;

  // Handle loading state
  if (isLoading) {
    return <div role="status" aria-live="polite">Loading data...</div>;
  }

  // Handle error state
  if (isError) {
    return <div role="alert">Error loading data. Please try again later.</div>;
  }

  // Find the specific section by ID
  const section = discover?.find((item) => item.id == id);

  // Handle case where no matching section is found
  if (!section) {
    notFound();
    return null; // Prevent further rendering
  }

  const { title, image, description, htmlDescription, cardSections } = section;

  return (
    <main aria-labelledby="discover-heading">
      <Banner fullScreen={false} heading={title} body={description} image={image} />
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 id="discover-heading" className="sr-only">
          {title}
        </h1>
          {htmlDescription ? (
      <div dangerouslySetInnerHTML={{ __html: htmlDescription }} />
    ) : (
      <p className="mt-6">{description}</p>
    )}
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
    <Suspense>
      <Page />
    </Suspense>
  );
}
