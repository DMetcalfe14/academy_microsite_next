import moment from "moment";
import stringSimilarity from "string-similarity";

const formatDuration = (duration) => {
  const moment_duration = moment.duration(duration, "minutes");
  const totalDays = Math.floor(moment_duration.asDays());

  if (totalDays >= 1) {
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays % 7;
    let parts = [];
    if (weeks > 0) parts.push(`${weeks} ${weeks === 1 ? "wk" : "wks"}`);
    if (days > 0) parts.push(`${days} ${days === 1 ? "day" : "days"}`);
    return parts.join(" ");
  } else {
    const hours = moment_duration.hours();
    const mins = moment_duration.minutes();
    let parts = [];
    if (hours > 0) parts.push(`${hours} ${hours === 1 ? "hr" : "hrs"}`);
    parts.push(`${mins === 0 ? "" : mins} ${mins === 0 ? "" : "mins"}`);
    return parts.join(" ");
  }
};

const formatDate = (dateStr) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [day, month] = dateStr.split("/");
  return [day, months[[parseInt(month) - 1]]];
};

const formatPlainDate = (dateStr) => {
  const parsedDate = moment(dateStr, "DD/MM/YYYY");
  return parsedDate.format("dddd, MMMM Do YYYY");
};

const isBeforeToday = (dateStr) => {
  const parsedDate = moment(dateStr, "DD/MM/YYYY");
  return parsedDate.isBefore(moment(), "day");
};

const tokenize = (text) =>
  text?.toLowerCase().split(/\W+/).filter(Boolean) ?? [];

const jaccard = (a, b) => {
  const setA = new Set(tokenize(a));
  const setB = new Set(tokenize(b));
  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return union.size ? intersection.size / union.size : 0;
};

const fuzzyScore = (a, b) =>
  stringSimilarity.compareTwoStrings(a?.toLowerCase() ?? "", b?.toLowerCase() ?? "");

export { formatDuration, formatDate, formatPlainDate, isBeforeToday, fuzzyScore, tokenize, jaccard };
