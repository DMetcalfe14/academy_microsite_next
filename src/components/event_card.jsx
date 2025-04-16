const EventCard = ({
  id,
  title,
  description,
  image,
  alt,
  duration,
  day,
  month,
  location,
}) => {
  return (
    <article className="relative" aria-labelledby={`event-card-title-${id}`}>
      <a
        href={`details.html?id=${id}`}
        aria-label={`View details for event: ${title}`}
        className="flex flex-col md:flex-row w-full bg-white border border-slate-200 rounded-lg overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
      {/* Event Date */}
      <div className="relative md:w-2/5 shrink-0 overflow-hidden">
        <div
          className="bg-[#00000080] text-6xl text-white absolute w-full h-full overflow-hidden flex justify-center items-center text-center"
          aria-label={`Event start date: ${day} of ${month}`}
        >
          {day}
          <br />
          {month}
        </div>
        <img
          src={image}
          alt={alt}
          className="h-full w-full md:rounded-l-lg @sm:rounded-t-lg object-cover lg:aspect-square"
        />
      </div>

      {/* Event Details */}
      <div className="p-6">
        <span className="text-primary font-semibold text-sm">
          {location + " | " + duration}
        </span>
        <h3
          id={`event-card-title-${id}`}
          className="mb-2 mt-2 text-lg font-semibold line-clamp-2"
        >
            {title}
        </h3>
        <p className="mb-4 line-clamp-3 text-gray-700">{description}</p>
      </div>
      </a>
    </article>
  );
};

export default EventCard;
