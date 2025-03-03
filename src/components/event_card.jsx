import Link from "next/link";

const EventCard = ({
  id,
  title,
  description,
  image,
  alt,
  day,
  month,
  location,
}) => {
  return (
    <div className="relative flex flex-col md:flex-row w-full bg-white border border-slate-200 rounded-lg overflow-hidden">
      <div className="relative md:w-2/5 shrink-0 overflow-hidden">
        <div className="bg-[#00000080] text-6xl text-white absolute w-full h-full overflow-hidden flex justify-center items-center text-center">
          {day}
          <br />
          {month}
        </div>
        <img
          src={image}
          alt={alt}
          className="h-full w-full md:rounded-l-lg @sm:rounded-t-lg object-cover"
        />
      </div>
      <div className="p-6">
        <a className="text-primary hover:text-orange-600 font-semibold text-sm">
          {location}
        </a>
        <h4 className="mb-2 mt-2 text-lg font-semibold line-clamp-2">
          <Link href={`/details?id=${id}`}>{title}</Link>
        </h4>
        <p className="mb-4 line-clamp-3">{description}</p>
      </div>
    </div>
  );
};

export default EventCard;