import { formatPlainDate, isBeforeToday } from "@/app/utilities";

import Button from "@/components/button";

const EventDetails = ({ title, location, date, href }) => {
  const plainDate = formatPlainDate(date);
  const isPastEvent = isBeforeToday(date);

  return (
    <div
      className="flex flex-col md:flex-row w-full bg-white border border-slate-200 rounded-lg p-6"
      role="region"
      aria-labelledby={`event-details-${location}`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
        <h3
          id={`event-details-${location}`}
          className="text-slate-800 text-xl font-semibold"
        >
          {location}
        </h3>
        <span className="text-slate-500 text-sm my-4 md:my-0 mr-6">
          {plainDate}
        </span>
      </div>
      <Button
        as="a"
        href={href}
        target="_blank" 
        rel="noopener noreferrer"
        className="focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
        aria-label={`Book event at ${location} on ${plainDate}`}
        disabled={isPastEvent}
        onClick={() => registerClick(title)}
      >
        Book
      </Button>
    </div>
  );
};

const EventDetailSection = ({ events, title }) => {
  return (
    <section aria-labelledby="event-details">
      <h2
        id="event-details"
        className="text-2xl font-semibold mb-4 text-gray-800"
      >
        Events
      </h2>
      {events.length === 0 && (
        <p className="text-gray-700">No upcoming events.</p>
      )}
      <div className="flex flex-col gap-4">
      {events.map((event, index) => (
        <EventDetails
          key={index}
          title={title}
          location={event.location}
          date={event.start_date}
          href={event.href}
        />
      ))}
      </div>
    </section>
  );
};

function registerClick(title) {
  window.parent.postMessage(
    {
      type: "BOOKING_EVENT",
      event: title,
    },
    "*"
  );
}

export default EventDetailSection;