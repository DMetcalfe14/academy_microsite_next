import React, { useState } from "react";
import Button from "./button";
import BannerSkeleton from "./banner_skeleton";

const Banner = ({ heading, body, image, alt, cta, fullScreen }) => {
  const [loading, setLoading] = useState(true);

  // Shared content for both layouts
  const BannerContent = (sectionId) => (
    <div className="relative z-20 pt-40 pb-10 h-full flex flex-col justify-end bg-gradient-to-t from-black to-transparent">
      <div className="mx-auto max-w-7xl px-8 w-full">
        <h2
          id={sectionId}
          className="text-4xl font-semibold tracking-tight text-white"
        >
          {heading}
        </h2>
        {!fullScreen && body && <p className="text-white mt-4 mb-6">{body}</p>}
        {!fullScreen && cta && (
          <Button
            as="a"
            href={cta.href}
            aria-label={`Call to action: ${cta.label}`}
          >
            {cta.label}
          </Button>
        )}
      </div>
    </div>
  );

  // Section wrapper based on fullScreen prop
  const sectionId = fullScreen ? "full-banner-heading" : "banner-heading";
  const sectionClass = fullScreen
    ? "relative w-full left-1/2 right-1/2 -translate-x-1/2 overflow-hidden"
    : "mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8";

  return (
    <section className={sectionClass} aria-labelledby={sectionId} style={{ position: "relative" }}>
      <div className="relative h-full rounded-lg overflow-hidden" style={{ minHeight: "320px" }}>
        {/* Skeleton overlays the whole banner until image is loaded */}
        {loading && (
          <div className="absolute inset-0 w-full h-full z-30">
            <BannerSkeleton fullScreen={fullScreen} />
          </div>
        )}
        {/* Always mount the image so onLoad can fire */}
        <img
          alt={alt || "Banner background"}
          src={image}
          onLoad={() => setLoading(false)}
          className="absolute inset-0 w-full h-full object-cover object-center brightness-50"
          role="presentation"
          style={{ display: loading ? "none" : "block" }}
        />
        {/* Only show content when not loading */}
        {!loading && BannerContent(sectionId)}
      </div>
    </section>
  );
};

export default Banner;
