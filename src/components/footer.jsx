import Image from "next/image";

import { useJsonData } from "@/context/json_context";

export default function Footer() {
  const { data } = useJsonData();
  const { footer = [] } = data;

  return (
    <footer className="bg-black text-white w-full">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center flex-col gap-4 md:flex-row">
        <div className="flex space-x-4">
          {footer.map((item) => {
            const isExternal = item.href.startsWith("http");
            return (
              <a
                key={item.href}
                href={item.href}
                className="text-white hover:underline"
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : undefined}
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
        <Image src="academy_branding_white.svg" alt="Capability Academy strapline" width="194" height="15" />
      </div>
    </footer>
  );
}