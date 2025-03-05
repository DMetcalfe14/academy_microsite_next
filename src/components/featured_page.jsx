import { ArrowRight } from "iconoir-react";
import CardCarousel from "./card_carousel";

const FeaturedPage = ({ title, description, cards, category, ids, link }) => {
    return (
        <div
            className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6"
            aria-labelledby={`featured-page-title-${category}`}
        >
            {/* Title and Description */}
            <div className="lg:col-span-1">
                <h2
                    id={`featured-page-title-${category}`}
                    className="text-2xl font-semibold mb-4 text-gray-800"
                >
                    {title}
                </h2>
                <p className="mb-5 text-gray-700">{description}</p>
                <a
                    href={link ? link : `search.html?category=${category}`}
                    className="font-semibold hover:text-primary mb-5 flex items-center focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
                >
                    View all <ArrowRight aria-hidden="true" className="ml-1" />
                </a>
            </div>

            {/* Card Carousel */}
            <div className="col-span-3">
                <CardCarousel
                    cards={cards}
                    category={category}
                    perView={3}
                    ids={ids}
                />
            </div>
        </div>
    );
};

export default FeaturedPage;