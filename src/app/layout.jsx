"use client";

import "./globals.css";
import "@glidejs/glide/dist/css/glide.core.min.css";

import { JsonProvider } from "@/context/json_context";
import { initializeScorm } from "@/hooks/useSCORM";
import { useEffect } from "react";

import Nav from "@/components/nav";  // Import Nav component

export default function RootLayout({ children }) {

useEffect(() => {
  if (typeof window !== 'undefined' && !sessionStorage.getItem('scorm-init')) {
    initializeScorm();
    sessionStorage.setItem('scorm-init', 'true');
  }
}, []);

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
