"use client";

import useSWR from "swr";
import QuickLink from "./quick_link";
import LinkSectionSkeleton from "./link_section_skeleton";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const LinkSection = () => {
  const { data: links = [], isLoading } = useSWR("links.json", fetcher);

  if (isLoading) return <LinkSectionSkeleton />;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Links</h2>
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
        {links.map((link) => (
          <QuickLink
            key={link.title}
            title={link.title}
            href={link.href}
            icon={link.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default LinkSection;
