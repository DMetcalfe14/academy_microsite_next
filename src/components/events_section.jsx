import { useState, useEffect } from "react";
import Link from "next/link";
import { NavArrowLeft, NavArrowRight, ArrowRight } from "iconoir-react";

import EventCard from "@/components/event_card";

import { formatDate } from "@/app/utilities";

const filterRules = {
  topN: (courses, n) => (n ? courses.slice(0, n) : courses),
  byCategory: (courses, categories) =>
    categories.length > 0
      ? courses.filter((course) =>
          categories.some((category) => course.categories.includes(category))
        )
      : courses,
  byMaxDuration: (courses, maxDuration) =>
    maxDuration
      ? courses.filter((course) => course.duration <= maxDuration)
      : courses,
  byMinDuration: (courses, minDuration) =>
    minDuration
      ? courses.filter((course) => course.duration >= minDuration)
      : courses,
  byType: (courses, types) =>
    types.length > 0
      ? courses.filter((course) =>
          types.some((type) => course.type.includes(type))
        )
      : courses,
  byLocation: (courses, location) =>
    location
      ? courses.filter((course) => course.location === location)
      : courses,
  byQuery: (courses, query) =>
    query
      ? courses.filter(
          (course) =>
            course.title.toLowerCase().includes(query.toLowerCase()) ||
            course.description.toLowerCase().includes(query.toLowerCase())
        )
      : courses,
  byId: (courses, ids) =>
    ids ? courses.filter((course) => ids.includes(course.id)) : courses,
};

const EventSection = ({ cards, filters = { byType: ["Event"] } }) => {
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (filters) {
      const result = applyFilters(cards, filters);
      setFiltered(result);
    } else {
      setFiltered(cards);
    }
  }, []);

  const applyFilters = (cards, rules) => {
    return Object.entries(rules).reduce((filtered, [ruleKey, ruleValue]) => {
      const filterFunction = filterRules[ruleKey];
      return filterFunction ? filterFunction(filtered, ruleValue) : filtered;
    }, cards);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Events</h2>
      <div className="grid grid-cols-1 gap-6">
        {filtered.map((card) => {
            const [day, month] = formatDate(card.start_date)
          return (<EventCard
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            image={card.thumbnail}
            alt={card.alt}
            day={day}
            month={month}
            location={card.location}
          />)
        })}
         <Link href={`/search?type=Event`} className="font-semibold hover:text-primary mb-5 flex">
                    View all <ArrowRight />
                </Link>
      </div>
    </div>
  );
};

export default EventSection;
