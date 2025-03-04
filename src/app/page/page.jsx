"use client";

import useSWR from "swr";
import { useSearchParams, notFound } from "next/navigation";
import Banner from "@/components/banner";
import LoadingSpinner from "../loading";

const JSONfetcher = (...args) => fetch(...args).then((res) => res.json());
const HTMLfetcher = (...args) => fetch(...args).then((res) => res.text());

export function Article({ id }) {
  // Fetch articles data
  const { data: articles = [], isLoading: articlesLoading, error: articlesError } = useSWR(
    "articles.json",
    JSONfetcher
  );

  // Find the article by ID (safe fallback if articles are not loaded yet)
  const article = articles.find((article) => article.id == id);

  // Fetch HTML content (conditionally based on article existence)
  const { data: htmlContent, isLoading: htmlLoading, error: htmlError } = useSWR(
    article ? article.page : null, // Only fetch if the article exists
    HTMLfetcher
  );

  // Handle loading state for articles
  if (articlesLoading) {
    return <LoadingSpinner />;
  }

  // Handle error state for articles
  if (articlesError) {
    return <div>Error loading articles.</div>;
  }

  // Handle case where article is not found
  if (!article) {
    notFound()
  }

  // Handle loading state for HTML content
  if (htmlLoading) {
    return <LoadingSpinner />;
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

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Handle missing ID gracefully
  if (!id) {
    return <div>No article ID provided</div>;
  }

  return <Article id={id} />;
}
