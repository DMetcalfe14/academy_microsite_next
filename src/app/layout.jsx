"use client";

import "./globals.css";
import "@glidejs/glide/dist/css/glide.core.min.css";

import { JsonProvider } from "@/context/json_context";
import useScormStore from "@/store/scormStore";

import { useEffect } from "react";

import Nav from "@/components/nav"; // Import Nav component

export default function RootLayout({ children }) {
  const initScorm = useScormStore((state) => state.initScorm);

  useEffect(() => {
    initScorm(); // Initialize SCORM globally ONCE
  }, [initScorm]);

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
