"use client";

import { useState, useEffect, Suspense } from "react";
import Banner from "@/components/banner";
import CardSection from "@/components/cards_section";

export default function Discover() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/courses.json")
            .then((response) => response.json())
            .then((data) => {
                setCourses(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching courses:", error);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Banner fullScreen heading="Change Hub" body="Change is a constant in leadership, and navigating it effectively is essential for success. The Change Hub is your go-to resource for building the skills needed to lead yourself, your team, and your projects through transformation. Whether you're supporting others through uncertainty, strengthening your own adaptability, or managing change within projects, you'll find practical tools, strategies, and learning materials to help you thrive in a dynamic environment." image="https://images.pexels.com/photos/2566581/pexels-photo-2566581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            </div>
            <CardSection title="Leading Others Through Change" description="Effective leaders inspire and support their teams through uncertainty. Learn strategies to communicate change with clarity, foster resilience, and guide people through transitions while maintaining engagement and trust." cards={courses} filters={{ topN: 4 }} useCarousel more/>
            <CardSection title="Leading Myself Through Change" description="Personal resilience is key to leading others effectively. Explore ways to navigate change with confidence, manage stress, and develop a growth mindset that allows you to adapt and thrive in evolving environments." cards={courses} filters={{ topN: 4 }} useCarousel more />
            <CardSection title="Managing Change Within Projects" description="Successful change management in projects requires careful planning and execution. Gain insights into frameworks and techniques for integrating change within project workflows, mitigating risks, and ensuring stakeholder alignment." cards={courses} filters={{topN: 4}} useCarousel more />
            <div className="mb-10"></div>
        </>
    )
}