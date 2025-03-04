import { formatPlainDate } from "@/app/utilities";

import Button from "@/components/button";

const EventDetails = ({ location, date, href }) => {
  const plainDate = formatPlainDate(date);

  return (
    <div className="flex flex-col md:flex-row w-full bg-white border border-slate-200 rounded-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
        <h3 className="text-slate-800 text-xl font-semibold">{location}</h3>
        <span className="text-slate-500 text-sm my-4 md:my-0 mr-6">
          {plainDate}
        </span>
      </div>
      <Button as="a" href={href}>Book</Button>
    </div>
  );
};

const EventDetailSection = ({ events }) => {
  return (
    <>
    <h2 className="text-2xl font-semibold mb-4">Events</h2>
      {events.map((event, index) => (
        <EventDetails
          key={index}
          location={event.location}
          date={event.start_date}
          href={event.href}
        />
      ))}
    </>
  );
};

export default EventDetailSection;
