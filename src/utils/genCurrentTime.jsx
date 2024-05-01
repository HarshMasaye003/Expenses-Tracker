function genCurrentTime() {
    const dayStr = new Date()
      .toLocaleString("en-us", { weekday: "long" })
      .slice(0, 3);
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const time = new Date().toLocaleTimeString();

    const date = {
      dayStr,
      day,
      month,
      year,
      time,
    };

    return date;
  }

export default genCurrentTime;