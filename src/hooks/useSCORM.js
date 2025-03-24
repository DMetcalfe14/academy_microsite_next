import { useEffect, useRef, useState } from "react";

let scormInitialized = false;
let pipwerks;

const initializeScorm = () => {
  if (!scormInitialized && typeof window !== "undefined") {
    pipwerks = require("pipwerks-scorm-api-wrapper");
    pipwerks.SCORM.init();
    scormInitialized = true;
  }
};

const useScorm = () => {
  const [interactionIndex, setInteractionIndex] = useState(() => {
    // Retrieve the interaction index from local storage or default to 0
    const savedIndex = localStorage.getItem("interactionIndex");
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const interactionIndexRef = useRef(interactionIndex);

  useEffect(() => {
    if (scormInitialized) {
      const lastIndex = getScormData("cmi.interactions._count");
      const index = lastIndex ? parseInt(lastIndex, 10) : 0;
      setInteractionIndex(index);
      interactionIndexRef.current = index;
    }
  }, []);

  useEffect(() => {
    // Save the interaction index to local storage whenever it changes
    localStorage.setItem("interactionIndex", interactionIndex);
  }, [interactionIndex]);

  const setScormData = (key, value) => {
    if (scormInitialized) {
      pipwerks.SCORM.set(key, value);
    }
  };

  const getScormData = (key) => {
    if (scormInitialized) {
      return pipwerks.SCORM.get(key);
    }
    return null;
  };

  const setLocation = (msg) => {
    const uuid = crypto.randomUUID(); // Generate a UUID

    console.log(`setting location with id ${interactionIndexRef.current}`);

    setScormData(`cmi.interactions.${interactionIndexRef.current}.id`, uuid); // Unique ID
    setScormData(
      `cmi.interactions.${interactionIndexRef.current}.type`,
      "fill-in"
    );
    setScormData(
      `cmi.interactions.${interactionIndexRef.current}.student_response`,
      msg
    );
    setScormData(
      `cmi.interactions.${interactionIndexRef.current}.time`,
      new Date().toISOString()
    );

    const newIndex = interactionIndexRef.current + 1;
    setInteractionIndex(newIndex);
    interactionIndexRef.current = newIndex;
  };

  return { setScormData, setLocation };
};

export default useScorm;
export { initializeScorm };
