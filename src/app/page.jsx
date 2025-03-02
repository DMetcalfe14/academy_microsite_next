"use client";

import { useState, useEffect } from "react";
import CardSection from "../components/cards_section";
import FeaturedSection from "../components/featured_section";
import Carousel from "@/components/carousel";

const slides = [
  {
    heading: "Change Hub",
    body: "Change is a constant in leadership...",
    image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    heading: "Adaptation Strategies",
    body: "Learn effective change management...",
    image: "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

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
      <Carousel slides={slides}/>
      <CardSection title="Brand new 🌟" cards={courses} filters={{topN: 4}} />
      <FeaturedSection cards={courses}/>
    </>
  );
}
