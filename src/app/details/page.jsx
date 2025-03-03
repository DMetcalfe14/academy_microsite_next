"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import Banner from "@/components/banner";
import Accordion from "@/components/accordion";
import { formatDuration } from "@/app/utilities";

function CourseDetails({ id }) {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/courses.json")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        const result = data.find((course) => course.id == id);
        setCourse(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
          <svg
            fill="none"
            className="w-6 h-6 animate-spin"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
          <div>Loading ...</div>
        </div>
      </div>
    );
  }

  if (!course) {
    notFound();
  }

  let details = []

  if (course.type === "Event") {
    details = [
      { label: "Type", value: course.type },
      { label: "Location", value: course.location },
      { label: "Start", value: course.start_date },
      { label: "End", value: course.end_date },
      { label: "Duration", value: formatDuration(course.duration) },
    ];
  } else {
    details = [
      { label: "Type", value: course.type },
      { label: "Duration", value: formatDuration(course.duration) },
    ];
  }

  return (
    <>
      <Banner
        heading={course.title}
        image={course.thumbnail}
        // body={course.description}
        fullScreen
      />
      <section className="mb-15">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="col-span-3 prose">
              <p>{course.description}</p>
              {course.faqs && course.faqs.length > 0 && (
                <>
                  <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
                  <Accordion items={course.faqs} />
                </>
              )}
            </div>
            <div className="col-span-1">
              <h2 className="text-2xl font-semibold mb-4">Details</h2>
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
                <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary_hover flex-grow">
                  Launch Resource
                </button>
              </div>
              {course.instructors && course.instructors.length > 0 && (
                <>
                  <h2 className="text-2xl font-semibold mb-4 mt-8">
                    Instructors
                  </h2>
                  <ul className="space-y-4">
                    {course.instructors.map((instructor, index) => (
                      <li key={index} className="flex items-center space-x-4">
                        <img
                          src={instructor.profile}
                          alt={instructor.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <span className="font-semibold">{instructor.name}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Details() {
  return <DetailsWithSearchParams />;
}

function DetailsWithSearchParams() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    notFound(); // Handle missing ID gracefully
  }

  return <CourseDetails id={id} />;
}
