export default function buildCalender(value) {
  //start en eind datum van de laaste en eerste week van de maand
  const startDay = value.clone().startOf("month").startOf("week");

  const endDay = value.clone().endOf("month").endOf("week");

  const day = startDay.clone().subtract(0, "day")
  const calender = [];

  //zolang het niet de laaste de laaste dag is per 7 in array duwen
  while (day.isBefore(endDay, 'day')) {
    calender.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, 'day').clone())
    );
  }

  return calender
}