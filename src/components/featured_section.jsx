import { useState, useEffect } from "react";
import useSWR from "swr";
import Toggle from "./toggle";
import FeaturedPage from "./featured_page";
import FeaturedSectionSkeleton from "./featured_section_skeleton";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const FeaturedSection = ({ cards }) => {
  const [visiblePage, setVisiblePage] = useState(1);

  const { data: featured = [], error, isLoading } = useSWR("featured.json", fetcher);

  const handleToggleClick = (id) => {
    if (visiblePage !== id) {
      setVisiblePage(id);
    }
  };

  useEffect(() => {
    setVisiblePage(1); // Show the first page by default
  }, []);

  if (isLoading)
    return (
      <FeaturedSectionSkeleton aria-label="Loading featured section content" />
    );

  return (
    <section
      className="bg-primary_saturated"
      aria-label="Learning spotlights"
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 py-15">
        {/* Toggles */}
        <div className="flex gap-3 mb-10" role="tablist" aria-label="Featured categories">
          {featured.map((page) => (
            <Toggle
              key={page.id}
              label={page.category}
              fct={() => handleToggleClick(page.id)}
              active={visiblePage === page.id}
              role="tab"
              aria-selected={visiblePage === page.id}
              aria-controls={`featured-page-${page.id}`}
            />
          ))}
        </div>

        {/* Featured Pages */}
        {featured.map(
          (page) =>
            visiblePage === page.id && (
              <FeaturedPage
                key={page.id}
                title={page.title}
                description={page.description}
                cards={cards}
                category={page.category}
                ids={page?.ids}
                link={page?.link}
                id={`featured-page-${page.id}`}
                role="tabpanel"
                aria-labelledby={`toggle-${page.id}`}
              />
            )
        )}
      </div>
    </section>
  );
};

export default FeaturedSection;