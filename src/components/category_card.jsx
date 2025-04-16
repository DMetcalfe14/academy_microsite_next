const CategoryCard = ({
  title,
  description,
  image,
  alt,
  count = 0,
  href = `search.html?category=${title}`,
}) => {
  return (
    <article
      className="relative"
      aria-labelledby={`category-card-${title}`}
    >
      <a href={href} aria-label={`View all resources for category: ${title}`} className="h-full flex flex-col md:flex-row w-full bg-white border border-slate-200 rounded-lg overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
        <div className="relative md:w-2/5 shrink-0 overflow-hidden">
          <img
            src={image}
            alt={alt}
            className="h-full w-full md:rounded-l-lg @sm:rounded-t-lg object-cover aspect-video"
          />
        </div>

        {/* Details */}
        <div className="p-6 gap-2 flex flex-col">
          {/* Title */}
          <h3
            id={`category-card-title`}
            className="mt-2 text-lg font-semibold line-clamp-2"
          >
            {title}
          </h3>

          {/* Count */}
          <span class="text-primary text-sm font-semibold">
            {count} resources
          </span>

          {/* Description */}
          <p className="mb-4 line-clamp-3 text-gray-700">{description}</p>
        </div>
      </a>
    </article>
  );
};

export default CategoryCard;
