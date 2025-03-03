import moment from 'moment';

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
      parts.push(`${mins} mins`);
      return parts.join(" ");
    }
  };

  const formatDate = (dateStr) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [day, month] = dateStr.split("/");
    return [day, months[[parseInt(month) - 1]]]
  }

  export {formatDuration, formatDate}