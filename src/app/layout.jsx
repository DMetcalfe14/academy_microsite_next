"use client";

import "./globals.css";
import "@glidejs/glide/dist/css/glide.core.min.css";

import { JsonProvider } from "@/context/json_context";
import { TourProvider } from "@/context/tour_context";
import { HistoryProvider } from "@/context/history_context";

import useScormStore from "@/store/scormStore";

import { useEffect } from "react";

import Nav from "@/components/nav"; // Import Nav component
import Footer from '@/components/footer';

export default function RootLayout({ children }) {
  const initScorm = useScormStore((state) => state.initScorm);

  useEffect(() => {
    initScorm(); // Initialize SCORM globally ONCE
  }, [initScorm]);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <JsonProvider>
          <HistoryProvider>
          <TourProvider>
            {/* Wrap Nav component with JsonProvider */}
            <Nav />
            {/* Main Content */}
            <main className="flex-grow">{children}</main>
            {/* Footer */}
            <Footer />
          </TourProvider>
          </HistoryProvider>
        </JsonProvider>
      </body>
    </html>
  );
}
