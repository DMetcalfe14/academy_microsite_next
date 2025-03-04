import { useState, useEffect } from "react";
import useSWR from "swr";
import Toggle from "./toggle";
import FeaturedPage from "./featured_page";

const fetcher = (...args) => fetch(...args).then(res => res.json());

const FeaturedSection = ({ cards }) => {
    const [visiblePage, setVisiblePage] = useState(1);

    const { data: featured = [], error, isLoading } = useSWR('featured.json', fetcher);

    const handleToggleClick = (id) => {
        if (visiblePage !== id) {
            setVisiblePage(id);
        }
    };

    useEffect(() => {
        setVisiblePage(1); // Show the first page by default
    }, []);

    return (
        <section className="bg-primary_saturated">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 py-15">
                <div className="flex gap-3 mb-10">
                    {featured.map((page) => (
                        <Toggle
                            key={page.id}
                            label={page.category}
                            fct={() => handleToggleClick(page.id)}
                            active={visiblePage === page.id}
                        />
                    ))}
                </div>

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
                            />
                        )
                )}
            </div>
        </section>
    );
};

export default FeaturedSection;
