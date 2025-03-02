"use client";

import { useState, useEffect } from "react";
import { LoadingProvider, useLoading } from "./loadingContext";

import CardSection from "../components/cards_section";
import FeaturedSection from "../components/featured_section";
import Carousel from "@/components/carousel";

function PageContent() {
  const { isLoading } = useLoading();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  if (isLoading) {
    return <div className="full-page-loader">Loading...</div>;
  }

  return (
    <>
      <Carousel />
      <CardSection title="Brand new 🌟" cards={courses} filters={{ topN: 4 }} />
      <FeaturedSection cards={courses} />
    </>
  );
}

export default function Home() {
  return (
      <PageContent />
  );
}
