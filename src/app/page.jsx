"use client";

import { useState, useEffect } from "react";
import CardSection from "../components/cards_section";
import FeaturedSection from "../components/featured_section";
import Carousel from "@/components/carousel";

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  return (
    <>
      <Carousel />
      <CardSection title="Brand new 🌟" cards={courses} filters={{topN: 4}} />
      <FeaturedSection cards={courses}/>
    </>
  );
}
