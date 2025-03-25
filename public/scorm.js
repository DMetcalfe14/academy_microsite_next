const scorm = pipwerks.SCORM;

let sessionActive = false;

initializeSCORM();

window.onbeforeunload = function () {
    exitSCORM();
};

function initializeSCORM() {
    scorm.version = "2004";

    // Attempt to connect to the LMS
    const success = scorm.init();
    if (success) {
        sessionActive = true;
        console.log("SCORM session started.");
    } else {
        console.warn("Failed to initialize SCORM.");
    }
}

function exitSCORM() {
    if (sessionActive) {
        scorm.set("cmi.core.lesson_status", "completed");
        scorm.save();
        scorm.quit();
        console.log("SCORM session ended.");
    }
}

// Find the next available cmi.interactions index
function getInteractionIndex() {
    let count = parseInt(scorm.get("cmi.interactions._count"), 10);
    return isNaN(count) ? 0 : count;
}