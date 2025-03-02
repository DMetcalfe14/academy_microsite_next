"use client";

import { useState, useEffect } from "react";
import Banner from "@/components/banner";

export default function Discover() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Banner
        className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 max-h-[400px] overflow-hidden rounded-lg"
        heading="9 Leadership Capabilities"
        body="Lorem ipsum"
        image="https://images.pexels.com/photos/2566581/pexels-photo-2566581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        fullScreen
      />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <article className="prose lg:prose-lg mx-auto max-w-none mt-8">
            <p>Here's an initial paragraph</p>
          <h2>Subheading</h2>
          <p>
            Here’s another paragraph with some <strong>bold text</strong> and
            <em>italicized text</em>.
          </p>
          <blockquote>
            This is a cool quote.
          </blockquote>
          <ul>
            <li>First item</li>
            <li>Second item</li>
            <li>Third item</li>
          </ul>
        </article>
      </div>
    </>
  );
}
