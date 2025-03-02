import { useState, useEffect } from "react";
import Toggle from "./toggle";
import FeaturedPage from "./featured_page";

const FeaturedSection = ({ cards }) => {
    const [visiblePage, setVisiblePage] = useState(1);

    const handleToggleClick = (id) => {
        if (visiblePage !== id) {
            setVisiblePage(id);
        }
    };

    const featuredPagesData = [
        {
            id: 1,
            title: "Mastering Tech-Driven Leadership",
            description: "Explore essential learning materials designed to equip leaders with the skills to navigate digital transformation, drive innovation, and lead effectively in a tech-driven world.",
            category: "Digital",
            ids: [2, 6]
        },
        {
            id: 2,
            title: "Driving Change, Empowering Growth",
            description: "Equip yourself with the skills needed to navigate organisational change with confidence and resilience. These courses focus on fostering adaptability, effective communication, and strategic planning to ensure smooth transitions and sustainable success.",
            category: "Change",
            link: "/discover"
        },
    ];

    useEffect(() => {
        setVisiblePage(1); // Show the first page by default
    }, []);

    return (
        <section className="bg-primary_saturated">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 py-15">
                <div className="flex gap-3 mb-10">
                    {featuredPagesData.map((page) => (
                        <Toggle
                            key={page.id}
                            label={page.category}
                            fct={() => handleToggleClick(page.id)}
                            active={visiblePage === page.id}
                        />
                    ))}
                </div>

                {featuredPagesData.map(
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
