"use client";

import "./globals.css";
import "@glidejs/glide/dist/css/glide.core.min.css";

import { JsonProvider } from "@/context/json_context";
import { TourProvider } from "@/context/tour_context";

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
      <body className="min-h-screen flex flex-col">
        <JsonProvider>
          <TourProvider>
            {/* Wrap Nav component with JsonProvider */}
            <Nav />
            {/* Main Content */}
            <main className="flex-grow">{children}</main>
            {/* Footer */}
            <footer className="bg-black text-white w-full">
              <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex space-x-4">
                  <a href="/" className="text-white hover:underline">Accessibility statement</a>
                  <a href="/" className="text-white hover:underline">Contact Us</a>
                </div>
              </div>
            </footer>
          </TourProvider>
        </JsonProvider>
      </body>
    </html>
  );
}
