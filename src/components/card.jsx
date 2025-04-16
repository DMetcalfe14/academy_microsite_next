"use client";

import { formatDuration } from "@/app/utilities";

const Card = ({
  id,
  title,
  description,
  categories,
  duration,
  thumbnail,
  alt,
  type,
  page_href,
  inactive = false,
  ariaHidden = false,
}) => {
  const plainDuration = formatDuration(duration);

  return (
    <article
      className="flex-1 flex flex-col bg-white border border-slate-200 rounded-lg group"
      role="region"
      aria-labelledby={`card-title-${id}`}
      aria-hidden={ariaHidden ? "true" : undefined}
    >
      <a
        href={page_href ? page_href : `details.html?id=${id}`}
        aria-label={`View details of ${title} (${type}, ${plainDuration})`}
        tabIndex={inactive ? -1 : 0}
        className="h-full rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {/* Thumbnail Section */}
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          {thumbnail ? (
            <img
              src={thumbnail}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              alt={alt || `${title} thumbnail`}
              loading="lazy"
            />
          ) : (
            // Fallback for missing thumbnail
            <div
              className="bg-gray-300 w-full h-full animate-pulse"
              aria-hidden="true"
            ></div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-1">
          {/* Details */}
          <span className="mb-2 text-primary font-semibold text-sm">
            {categories.length > 0 ? categories.length > 1 ? "Multiple" + " | " : categories[0] + " | " : undefined} {type} |{" "}
            {formatDuration(duration)}
          </span>

          {/* Title */}
          {title ? (
            <h3
              id={`card-title-${id}`}
              className="mb-2 text-lg font-semibold line-clamp-2 leading-tight text-gray-800"
            >
              {title}
            </h3>
          ) : (
            // Fallback for missing title
            <div
              className="bg-gray-300 animate-pulse h-[24px] w-[80%] mb-[16px]"
              aria-hidden="true"
            ></div>
          )}

          {/* Description */}
          {description ? (
            <p className="mb-4 line-clamp-3 flex-1 text-gray-700">
              {description}
            </p>
          ) : (
            // Fallback for missing description
            <div
              className="bg-gray-300 animate-pulse h-[16px] w-[90%] mb-[16px]"
              aria-hidden="true"
            ></div>
          )}
        </div>
      </a>
    </article>
  );
};

export default Card;
