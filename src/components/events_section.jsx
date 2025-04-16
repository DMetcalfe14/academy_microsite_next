import { useMemo } from "react";
import { ArrowRight } from "iconoir-react";

import EventCard from "@/components/event_card";
import EventSectionSkeleton from "@/components/event_section_skeleton";
import { formatDate, formatDuration } from "@/app/utilities";

// Helper function to parse a date string in "dd/mm/YYYY" format
const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return new Date(year, month - 1, day); // JavaScript months are zero-indexed
};

const EventSection = ({ cards, isLoading }) => {
  const filteredAndSortedEvents = useMemo(() => {
    const currentDate = new Date();

    // Flatten the events array from cards and add parent card details
    const allEvents = cards
      ?.filter((card) => card.type === "Event" && Array.isArray(card.events)) // Ensure card has events
      .flatMap((card) =>
        card.events.map((event) => ({
          ...event,
          cardId: card.id,
          cardTitle: card.title,
          cardDescription: card.description,
          cardThumbnail: card.thumbnail,
          cardAlt: card.alt,
          cardDuration: card.duration
        }))
      );

    // Filter and sort events by start_date
    return allEvents
      ?.filter((event) => parseDate(event.start_date) >= currentDate)
      .sort((a, b) => parseDate(a.start_date) - parseDate(b.start_date))
      .slice(0, 2); // Limit to 2 events
  }, [cards]);

  if (isLoading)
    return (
      <EventSectionSkeleton aria-label="Loading upcoming events" />
    );

  return (
    <section aria-labelledby="events">
      <h2
        id="events"
        className="text-2xl font-semibold mb-4 text-gray-800"
      >
        Upcoming events
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {/* If no events are available */}
        {filteredAndSortedEvents.length === 0 && (
          <p className="text-gray-700">No events scheduled</p>
        )}

        {/* Render each event */}
        {filteredAndSortedEvents.map((event, index) => {
          const [day, month] = formatDate(event.start_date);
          return (
            <EventCard
              key={`${event.cardId}-${index}`} // Unique key using parent card ID and index
              id={event.cardId} // Parent card ID for reference
              title={event.cardTitle} // Parent card title
              description={event.cardDescription} // Parent card description
              image={event.cardThumbnail} // Parent card thumbnail
              alt={event.cardAlt} // Parent card alt text
              day={day} // Formatted day (e.g., "12")
              month={month} // Formatted month (e.g., "March")
              location={event.location} // Event-specific location
              duration={formatDuration(event.cardDuration)}
            />
          );
        })}

        {/* "View All" link if there are events */}
        {filteredAndSortedEvents.length !== 0 && (
          <a
            href={`search.html?type=Event`}
            className="font-semibold hover:text-primary mb-5 flex items-center focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
            aria-label="View all upcoming events"
          >
            View all <ArrowRight aria-hidden="true" className="ml-2" />
          </a>
        )}
      </div>
    </section>
  );
};

export default EventSection;