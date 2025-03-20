"use client";

import "./globals.css";
import "@glidejs/glide/dist/css/glide.core.min.css";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import useScorm from "@/hooks/useSCORM";
import { JsonProvider } from "@/context/json_context";
import Nav from "@/components/nav";  // Import Nav component

export default function RootLayout({ children }) {
  // const pathname = usePathname();
  // const { setScormData } = useScorm();
  // const searchParams = useSearchParams();
  // const [title, setTitle] = useState("");

  // useEffect(() => {
  //   const fetchData = async (source, idKey) => {
  //     try {
  //       const response = await fetch(`./${source}.json`);
  //       const data = await response.json();
  //       const id = Number(searchParams.get(idKey));

  //       if (id) {
  //         const item = data.find((item) => item.id === id);

  //         if (item) {
  //           setTitle(item.title);
  //           switch (pathname) {
  //             case "/details":
  //               console.log(`Viewed the course details for "${item.title}"`);
  //               break;
  //             case "/discover":
  //               console.log(`Exploring the material within "${item.title}"`);
  //               break;
  //             case "/page":
  //               console.log(`Accessed the page "${item.title}"`);
  //               break;
  //             default:
  //               console.log(`Viewed item "${item.title}"`);
  //           }
  //         } else {
  //           console.log(`No item found for ID: ${id}`);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   if (["/details"].includes(pathname)) {
  //     fetchData("courses", "id");
  //   } else if (pathname === "/discover") {
  //     fetchData("discover", "id");
  //   } else if (pathname === "/page") {
  //     fetchData("articles", "id");
  //   } else if (pathname === "/search") {
  //     const query = searchParams.get("query");
  //     console.log(`Search executed for query: "${query}"`);
  //   }
  // }, [pathname, searchParams]);

  return (
    <html lang="en">
      <body>
        <JsonProvider>
          {/* Wrap Nav component with JsonProvider */}
          <Nav />
          {/* Main Content */}
          {children}
        </JsonProvider>
      </body>
    </html>
  );
}
