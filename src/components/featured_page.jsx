import { ArrowRight } from "iconoir-react";
import CardCarousel from "./card_carousel";
import Link from 'next/link';

const FeaturedPage = ({ title, description, cards, category, ids, link }) => {
    return (
        <div
            className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6"
            aria-hidden="false"
        >
            <div className="lg:col-span-1">
                <h1 className="text-2xl font-semibold mb-4">{title}</h1>
                <p className="mb-5">{description}</p>
                <Link href={link ? link : `/search.html?Category=${category}`} className="font-semibold hover:text-primary mb-5 flex">
                    View all <ArrowRight />
                </Link>
            </div>
            <div className="col-span-3">
            <CardCarousel cards={cards} category={category} perView={3}/>
            </div>
        </div>
    );
};

export default FeaturedPage;
