"use client";

import Tag from "./tag";
import { Clock, Laptop, PathArrow, QuestionMark, Microphone, Book, Calendar } from "iconoir-react";
import { formatDuration } from "@/app/utilities";

const iconMap = {
  Event: Calendar,
  eBook: Book,
  elearning: Laptop,
  Pathway: PathArrow,
  Podcast: Microphone,
  default: QuestionMark,
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
          aria-label={`Type: ${type}`}
        >
          <Icon className="w-4 h-4" aria-hidden="true" />
        </div>

        {/* Duration Section */}
        <div
          className="absolute top-2 right-2 bg-primary text-white text-sm font-semibold px-3 py-1 rounded flex items-center h-8 z-10"
        >
          <Clock className="w-4 h-4 mr-1" aria-hidden="true" />
          <span aria-label={`Duration: ${plainDuration}`}>{plainDuration}</span>
        </div>

        {thumbnail ? (
          <img
            src={thumbnail}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            alt={alt || `${title} thumbnail`}
            loading="lazy"
          />
        ) : (
          // Fallback for missing thumbnail
          <div className="bg-gray-300 w-full h-full animate-pulse"></div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        {title ? (
          <a
            href={`details.html?id=${id}`}
            className="hover:no-underline rounded"
            aria-label={`View details of ${title} (${type}, ${plainDuration})`}
          >
            <h3 className="mb-2 text-lg font-semibold line-clamp-2 leading-tight">{title}</h3>
          </a>
        ) : (
          // Fallback for missing title
          <div className="bg-gray-300 animate-pulse h-[24px] w-[80%] mb-[16px]"></div>
        )}

        {/* Description */}
        {description ? (
          <p className="mb-4 line-clamp-3 flex-1">{description}</p>
        ) : (
          // Fallback for missing description
          <div className="bg-gray-300 animate-pulse h-[16px] w-[90%] mb-[16px]"></div>
        )}

        {/* Categories/Tags */}
        {categories?.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-auto">
            {categories.map((category) => (
              <Tag key={category} label={category} />
            ))}
          </div>
        ) : (
          // Fallback for missing categories
          Array.from({ length: 3 }).map((_, index) => (
            <span key={index} className="bg-gray-300 animate-pulse h-[16px] w-[60px] rounded"></span>
          ))
        )}
      </div>
    </div>
  );
};

export default Card;
