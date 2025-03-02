import Tag from "./tag";
import { Clock, Laptop, PathArrow, QuestionMark } from "iconoir-react";
import Link from 'next/link';
import { formatDuration } from "@/app/utilities";

const iconMap = {
  elearning: Laptop,
  Pathway: PathArrow,
  default: QuestionMark
};

const Card = ({
  id,
  title,
  description,
  categories,
  duration,
  thumbnail,
  alt,
  type,
}) => {
  const Icon = iconMap[type] || iconMap.default;
  const plainDuration = formatDuration(duration);

  return (
    <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-lg group">
      {/* Thumbnail Section */}
      <div className="relative aspect-video overflow-hidden rounded-t-lg">
        {/* Centered Type Icon */}
        <div
          className="absolute top-2 left-2 bg-primary text-white text-sm font-semibold rounded-full flex items-center justify-center h-8 w-8 z-10"
          aria-label={type}
        >
          <Icon className="w-4 h-4" aria-hidden="true" />
        </div>

        {/* Duration Section */}
        <div
          className="absolute top-2 right-2 bg-primary text-white text-sm font-semibold px-3 py-1 rounded flex items-center h-8 z-10"
          aria-label={`Duration: ${plainDuration}`}
        >
          <Clock className="w-4 h-4 mr-1" aria-hidden="true" />
          <span>{plainDuration}</span>
        </div>

        <img
          src={thumbnail}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={alt || `${title} thumbnail`}
          loading="lazy"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <Link
          href={{ pathname: "/details", query: { id } }}
          className="hover:no-underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
          aria-label={`View details of ${title} (${type}, ${plainDuration})`}
        >
          <h2 className="mb-2 text-lg font-semibold line-clamp-2 leading-tight">
            {title}
          </h2>
        </Link>

        {/* Description */}
        <p className="mb-4 line-clamp-3 flex-1">{description}</p>

        {/* Categories/Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {categories.map((category) => (
            <Tag key={category} label={category} />
          ))}
        </div>
      </div>
    </div>
  );
};



export default Card;
