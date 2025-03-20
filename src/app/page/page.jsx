"use client";

import useSWR from "swr";
import { Suspense } from "react";
import { useJsonData } from '@/context/json_context';
import { useSearchParams, notFound } from "next/navigation";

import Banner from "@/components/banner";

const HTMLfetcher = (...args) => fetch(...args).then((res) => res.text());

export function Article({ id }) {
  
  const { data, isLoading: articlesLoading, articlesError } = useJsonData();

  const {
    articles = [],
  } = data;


  // Always call useSWR for HTML content, but provide a default key
  const { data: htmlContent, isLoading: htmlLoading, error: htmlError } = useSWR(
    articles?.find((article) => article.id == id)?.page || null,
    HTMLfetcher
  );

  // Handle loading state for articles
  if (articlesLoading) {
    return null; // Render nothing while loading; child components handle skeletons
  }

  // Handle error state for articles
  if (articlesError) {
    return <div>Error loading articles.</div>;
  }

  // Find the article by ID
  const article = articles?.find((article) => article.id == id);

  // Handle case where article is not found
  if (!article) {
    notFound();
    return null; // Prevent further rendering
  }

  // Handle loading state for HTML content
  if (htmlLoading) {
    return null; // Render nothing while loading; child components handle skeletons
  }

  // Handle error state for HTML content
  if (htmlError) {
    return <div>Error loading article content.</div>;
  }

  return (
    <>
      <Banner
        className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 max-h-[400px] overflow-hidden rounded-lg"
        heading={article.title}
        image={article.image}
        alt={article.alt}
        fullScreen
      />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <article className="prose lg:prose-lg mx-auto max-w-none mt-8">
          {/* Render HTML content */}
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </article>
      </div>
    </>
  );
}

export function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Handle missing ID gracefully
  if (!id) {
    return <div>No article ID provided</div>;
  }

  return <Article id={id} />;
}

export default function PageSuspense() {
  return (
    <Suspense fallback={<div className="p-4 text-gray-500">Loading page...</div>}>
      <Page />
    </Suspense>
  );
}
