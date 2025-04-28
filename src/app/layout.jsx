"use client";

import "./globals.css";
import "@glidejs/glide/dist/css/glide.core.min.css";

import { JsonProvider } from "@/context/json_context";
import { TourProvider } from "@/context/tour_context";
import { HistoryProvider } from "@/context/history_context";

import Nav from "@/components/nav";
import Footer from '@/components/footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <JsonProvider>
          <HistoryProvider>
          <TourProvider>
            <Nav />
            <main className="flex-grow">{children}</main>
            <Footer />
          </TourProvider>
          </HistoryProvider>
        </JsonProvider>
      </body>
    </html>
  );
}
