import { ArrowRight } from "iconoir-react";
import CardCarousel from "./card_carousel";

const FeaturedPage = ({ title, description, cards, category, ids, link }) => {
    return (
        <div
            className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6"
            aria-hidden="false"
        >
            <div className="lg:col-span-1">
                <h2 className="text-2xl font-semibold mb-4">{title}</h2>
                <p className="mb-5">{description}</p>
                <a href={link ? link : `search.html?category=${category}`} className="font-semibold hover:text-primary mb-5 flex">
                    View all <ArrowRight />
                </a>
            </div>
            <div className="col-span-3">
            <CardCarousel cards={cards} category={category} perView={3} ids={ids} />
            </div>
        </div>
    );
};

export default FeaturedPage;
