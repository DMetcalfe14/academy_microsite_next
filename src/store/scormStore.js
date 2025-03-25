"use client";
import { create } from "zustand";
import ScormWrapper from "@/utils/scormWrapper";

// Global variable outside Zustand store (prevents reinitialization)
let isScormInitialized = false;

const useScormStore = create((set, get) => ({
  lessonStatus: "not attempted",
  score: 0,
  suspendData: {},

  initScorm: () => {
    if (isScormInitialized) return; // ✅ Prevents multiple initializations

    console.log("Initializing SCORM...");
    const success = ScormWrapper.init();
    if (success) {
      set({
        lessonStatus: ScormWrapper.getLessonStatus() || "not attempted",
        score: ScormWrapper.getScore() || 0,
        suspendData: ScormWrapper.getSuspendData() || {},
      });
      isScormInitialized = true; // ✅ Ensures SCORM only initializes once
    }
  },

  updateLessonStatus: (status) => {
    ScormWrapper.setLessonStatus(status);
    set({ lessonStatus: status });
  },

  updateScore: (newScore) => {
    ScormWrapper.setScore(newScore);
    set({ score: newScore });
  },

  updateSuspendData: (data) => {
    ScormWrapper.setSuspendData(data);
    set({ suspendData: data });
  },

  finishScorm: () => {
    ScormWrapper.finish();
    console.log("SCORM session ended.");
  },
}));

export default useScormStore;
