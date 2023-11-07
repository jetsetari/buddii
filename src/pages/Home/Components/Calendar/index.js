//libs
import React, {useEffect, useState} from "react";
import moment from "moment";

//styling
import "./Calendar.scss";

//assets
import buildCalender from "./build";
import Left from "./images/left.svg";
import Right from "./images/right.svg";

const Calendar = ({ setDate }) => {
  const [value, setValue] = useState(moment())
  const [calender, SetCalender] = useState([])
  const today = moment();
  const weekDay = moment().isoWeekday()

  useEffect(() => {
    SetCalender(buildCalender(value))
  }, [value])

  function currMonthName() {
    return value.format("MMM")
  }

  function currYear() {
    return value.format("YYYY")
  }

  function prevMonth() {
    return value.clone().subtract(1, "month")
  }

  function nextMonth() {
    return value.clone().add(1, "month")
  }

  const changeDay = (day, month) => {
    setDate(day.format('DD/MM/YYYY'));
    setValue(day);
  }
 
  return (
    <section className="c-calendar">
      <div className="c-cal-header">
        <h2 className="c-cal-title">Calendar</h2>
        <div className="c-cal-monthyear">
          <div onClick={() => setValue(prevMonth())}>
            <img src={Left} className="c-cal-left" alt="left arrow"/>
          </div>
          <p className="c-cal-selected-month">{currMonthName()} {currYear()}</p>
          <div onClick={() => setValue(nextMonth())}>
            <img src={Right} className="c-cal-right" alt="right arrow"/>
          </div>
        </div>
      </div>
      <div className="c-calendar-full">
        <div className="c-calendar-week c-calender-weekdays">
          <div className={'c-calendar-weekday'}>M</div>
          <div className={'c-calendar-weekday'}>T</div>
          <div className={'c-calendar-weekday'}>W</div>
          <div className={'c-calendar-weekday'}>T</div>
          <div className={'c-calendar-weekday'}>F</div>
          <div className={'c-calendar-weekday'}>S</div>
          <div className={'c-calendar-weekday'}>S</div>
        </div>
        {calender.map((week, index) => (
          <div key={index} className="c-calendar-week">
            {week.map((day, index) => (
              //checked op de selected dag zo niet dan zien of het in deze maand zit
              <div key={index} className={value.isSame(day, "day") ? "c-calendar-day-selected" : value.isSame(day, "month") ? "c-calendar-day" : "c-calender-day-othermonth"} onClick={() => changeDay(day)}>
                <div className={value.isSame(day, "day") ? "c-calender-selected" : ""} >
                  <span className={today.isSame(day, 'day') ? 'today' : ""}>{day.format('D')}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Calendar;
