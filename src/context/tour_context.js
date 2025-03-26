"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import { usePathname } from "next/navigation";

const TourContext = createContext();

export function TourProvider({ children }) {
  const [tour, setTour] = useState(null);
  const [tourConfig, setTourConfig] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    if (tourConfig) {
      const newTour = new Shepherd.Tour({
        useModalOverlay: false,
        defaultStepOptions: {
          classes: 'p-6 rounded-lg z-50',
          scrollTo: true,
        },
      });

      tourConfig.steps.forEach((step) => {
        newTour.addStep({
          ...step,
          buttons: step.buttons.map((btn) => ({
            text: btn.text,
            classes: btn.classes,
            action: newTour[btn.action] ? newTour[btn.action].bind(newTour) : newTour.complete.bind(newTour)
          }))
        });
      });

      setTour(newTour);

      const hasSeenTour = localStorage.getItem(`seenTour-${pathname}`);
      if (!hasSeenTour) {
        newTour.start();
        localStorage.setItem(`seenTour-${pathname}`, "true");
      }
    }
  }, [tourConfig]);

  const startTour = () => {
    if (tour) {
      tour.start();
    }
  };

  return (
    <TourContext.Provider value={{ setTourConfig, startTour, hasTour: !!tourConfig }}>
      {children}
    </TourContext.Provider>
  );
}

export function useTour() {
  return useContext(TourContext);
}
