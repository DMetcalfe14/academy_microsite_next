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
  const categoryString = categories.length > 1
    ? "Multiple"
    : categories[0] || "";

  // Modified srLabel without thumbnail
  const srLabel = [
    categoryString && `Category: ${categoryString}`,
    `Type: ${type}`,
    `Duration: ${plainDuration}`
  ].filter(Boolean).join(", ");

  return (
    <article
      className="flex-1 flex flex-col bg-white border border-slate-200 rounded-lg group"
      role="region"
      aria-labelledby={`card-title-${id}`}
      aria-hidden={ariaHidden ? "true" : undefined}
    >
      <a
        href={page_href ? page_href : `details.html?id=${id}`}
        tabIndex={inactive ? -1 : 0}
        className="h-full rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {/* Thumbnail Section - alt text read separately */}
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          {thumbnail ? (
            <img
              src={thumbnail}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              alt={alt || `${title} thumbnail`}
              loading="lazy"
            />
          ) : (
            <div
              className="bg-gray-300 w-full h-full animate-pulse"
              aria-hidden="true"
            ></div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-1">
          {/* Screen reader label without thumbnail */}
          <span className="sr-only" id={`card-details-sr-${id}`}>
            {srLabel}
          </span>
          
          {/* Visible details with conditional | */}
          <span
            className="mb-2 text-gray-700 font-semibold text-sm"
            id={`card-details-${id}`}
            aria-hidden="true"
          >
            {categoryString && (
              <>
                {categoryString}
                <span> | </span>
              </>
            )}
            {type} | {plainDuration}
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
            <div
              className="bg-gray-300 animate-pulse h-[24px] w-[80%] mb-[16px]"
              aria-hidden="true"
            ></div>
          )}

          {/* Description */}
          {description ? (
            <p
              className="mb-4 line-clamp-3 flex-1 text-gray-700"
              id={`card-desc-${id}`}
            >
              {description}
            </p>
          ) : (
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
