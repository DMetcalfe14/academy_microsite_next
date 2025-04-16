"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { usePathname, useRouter } from "next/navigation";

const SESSION_KEY = "siteHistoryStack";
const SiteHistoryContext = createContext();

function stripSearch(url) {
  // Removes the search/query part from the URL
  return url.split("?")[0];
}

export function HistoryProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // Track the full path (pathname + search params)
  const [fullPath, setFullPath] = useState(pathname);
  const [stack, setStack] = useState([]);
  const [canGoBack, setCanGoBack] = useState(false);

  // Update fullPath on client-side navigation
  useEffect(() => {
    if (typeof window === "undefined") return;
    setFullPath(window.location.pathname + window.location.search);
  }, [pathname]);

  // On mount and on fullPath change, update the stack in sessionStorage and state
  useEffect(() => {
    if (typeof window === "undefined") return;
    let sessionStack = [];
    try {
      sessionStack = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "[]");
    } catch {
      sessionStack = [];
    }

    const prev = sessionStack[sessionStack.length - 1];
    const prevBase = prev ? stripSearch(prev) : null;
    const currentBase = stripSearch(fullPath);

    // Only push if different from last, and replace if last was same path without params
    if (prev !== fullPath) {
      if (prevBase === currentBase && prev !== fullPath) {
        // Replace the previous entry with the new one (with params)
        sessionStack[sessionStack.length - 1] = fullPath;
      } else {
        sessionStack.push(fullPath);
      }
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionStack));
    }
    setStack(sessionStack);
    setCanGoBack(sessionStack.length > 1);
  }, [fullPath]);

  // Go back within the site stack
  const goBack = useCallback(() => {
    if (typeof window === "undefined") return;
    let sessionStack = [];
    try {
      sessionStack = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "[]");
    } catch {
      sessionStack = [];
    }
    if (sessionStack.length > 1) {
      sessionStack.pop(); // Remove current page
      const prev = sessionStack[sessionStack.length - 1];
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionStack));
      setStack(sessionStack);
      setCanGoBack(sessionStack.length > 1);
      router.push(prev);
    }
  }, [router]);

  // Reset the stack to only the current fullPath
  const resetHistory = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify([fullPath]));
    setStack([fullPath]);
    setCanGoBack(false);
  }, [fullPath]);

  // Always push the current fullPath (not a custom path)
  const pushToStack = useCallback(() => {
    if (typeof window === "undefined") return;
    let sessionStack = [];
    try {
      sessionStack = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "[]");
    } catch {
      sessionStack = [];
    }
    const prev = sessionStack[sessionStack.length - 1];
    const prevBase = prev ? stripSearch(prev) : null;
    const currentBase = stripSearch(fullPath);

    if (prev !== fullPath) {
      if (prevBase === currentBase && prev !== fullPath) {
        sessionStack[sessionStack.length - 1] = fullPath;
      } else {
        sessionStack.push(fullPath);
      }
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionStack));
      setStack(sessionStack);
      setCanGoBack(sessionStack.length > 1);
    }
  }, [fullPath]);

  return (
    <SiteHistoryContext.Provider
      value={{ canGoBack, goBack, pushToStack, stack, resetHistory }}
    >
      {children}
    </SiteHistoryContext.Provider>
  );
}

export function useSiteHistory() {
  return useContext(SiteHistoryContext);
}
