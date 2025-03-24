"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, notFound } from "next/navigation";

import { useJsonData } from '@/context/json_context';

import Banner from "@/components/banner";
import Accordion from "@/components/accordion";
import { formatDuration } from "@/app/utilities";
import EventDetails from "@/components/event_details";
import Button from "@/components/button";

function CourseDetails({ id }) {
  const { data } = useJsonData();
  const [course, setCourse] = useState(undefined);
  
  useEffect(() => {
    const {
      courses = [],
    } = data;

    const result = courses.find((course) => course.id == id);
    setCourse(result || null);

    if (result === null) {
      notFound();
      return;
    }
  }
  , [data, id]);

  // Delay rendering child components until data is fetched
  if (course === undefined || course === null) {
    return null; // Render nothing while waiting for data
  }

  let details = [
    { label: "Type", value: course.type },
    { label: "Duration", value: formatDuration(course.duration) },
  ];

  return (
    <>
      <Banner
        heading={course.title}
        image={course.thumbnail}
        alt={course.alt}
        fullScreen
      />
      <main aria-labelledby="course-title">
        <section className="mb-15">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Main Content */}
              <div className="col-span-3">
                <h1 id="course-title" className="sr-only">
                  {course.title}
                </h1>
                <p className="mb-6">{course.description}</p>
                {course.faqs && course.faqs.length > 0 && (
                  <>
                    <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
                    <Accordion items={course.faqs} />
                  </>
                )}
                {course.type === "Event" && (
                  <EventDetails events={course.events} />
                )}
              </div>

              {/* Sidebar Content */}
              <aside className="col-span-1" aria-labelledby="details-heading">
                <h2 id="details-heading" className="text-2xl font-semibold mb-4">
                  Details
                </h2>
                <ul>
                  {details.map((detail, index) => (
                    <li
                      key={index}
                      className="p-4 bg-gray-100 rounded-lg mb-2 flex place-content-between font-semibold text-right"
                    >
                      <span className="mr-4">{detail.label}:</span>
                      {detail.value}
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex">
                  <Button
                    className="w-full text-center"
                    as="a"
                    href={course.href}
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={`Launch resource: ${course.title}`}
                  >
                    Launch Resource
                  </Button>
                </div>
                {course.instructors && course.instructors.length > 0 && (
                  <>
                    <h2
                      id="instructors-heading"
                      className="text-2xl font-semibold mb-4 mt-8"
                    >
                      Instructors
                    </h2>
                    <ul
                      aria-labelledby="instructors-heading"
                      className="space-y-4"
                    >
                      {course.instructors.map((instructor, index) => (
                        <li key={index} className="flex items-center space-x-4">
                          <img
                            src={instructor.profile}
                            alt={`Profile picture of ${instructor.name}`}
                            className="w-10 h-10 rounded-full"
                          />
                          <span className="font-semibold">{instructor.name}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default function Details() {
  return (
    <Suspense fallback={<p>Loading course details...</p>}>
      <DetailsWithSearchParams />
    </Suspense>
  );
}

function DetailsWithSearchParams() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    notFound(); // Handle missing ID gracefully
    return; // Prevent further rendering
  }

  return <CourseDetails id={id} />;
}
