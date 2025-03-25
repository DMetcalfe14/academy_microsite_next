"use client";
import pipwerks from "pipwerks-scorm-api-wrapper"; // Ensure pipwerks is installed

const ScormWrapper = {
  isInitialized: false,

  init: function () {
    pipwerks.SCORM.version = "2004";
    const success = pipwerks.SCORM.init();
    this.isInitialized = success;
    console.log("SCORM initialized:", success);
    return success;
  },

  getLessonStatus: function () {
    if (!this.isInitialized) return null;
    return pipwerks.SCORM.get("cmi.completion_status") || "unknown";
  },

  setLessonStatus: function (status) {
    if (!this.isInitialized) return false;
    pipwerks.SCORM.set("cmi.completion_status", status);
    return pipwerks.SCORM.save();
  },

  getScore: function () {
    if (!this.isInitialized) return null;
    return parseFloat(pipwerks.SCORM.get("cmi.score.raw")) || 0;
  },

  setScore: function (score) {
    if (!this.isInitialized) return false;
    pipwerks.SCORM.set("cmi.score.raw", score);
    return pipwerks.SCORM.save();
  },

  getSuspendData: function () {
    if (!this.isInitialized) return null;
    try {
      return JSON.parse(pipwerks.SCORM.get("cmi.suspend_data")) || {};
    } catch (e) {
      console.error("Error parsing suspend data:", e);
      return {};
    }
  },

  setSuspendData: function (data) {
    if (!this.isInitialized) return false;
    pipwerks.SCORM.set("cmi.suspend_data", JSON.stringify(data));
    return pipwerks.SCORM.save();
  },

  finish: function () {
    if (!this.isInitialized) return false;
    pipwerks.SCORM.set("cmi.exit", "suspend"); // Ensures progress is saved
    pipwerks.SCORM.save();
    pipwerks.SCORM.quit();
    this.isInitialized = false;
    console.log("SCORM session finished.");
  },
};

export default ScormWrapper;