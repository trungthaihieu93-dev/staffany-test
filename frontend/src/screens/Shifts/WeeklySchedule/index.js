import React from 'react';
import moment from 'moment';

import {
  SHIFT_DATE,
  SHIFT_START_TIME,
  SHIFT_END_TIME,
} from 'constants/fields';

import './styles.css';

const scheduleHeight = 600;
const hourHeight = 25;

export default function WeeklySchedule(props) {
  const {
    shifts,
    from,
    onClickShift,
  } = props;

  // render hours
  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i < 10 ? `0${i}:00` : `${i}:00`);
  }

  // render week days
  const weekDays = [moment(from)];
  for (let i = 1; i < 7; i++) {
    weekDays.push(moment(from).add(i, 'd'));
  }

  // style bar
  const getShiftStyle = (startTime, endTime, status) => {
    const startHour = parseInt(startTime.split(':')[0], 10);
    const endHour = parseInt(endTime.split(':')[0], 10);
    const shiftHeight = ((endHour - startHour) / 24) * scheduleHeight + 20;
    const topSpace = (startHour / 24) * scheduleHeight - 3;

    return {
      height: `${shiftHeight}px`,
      top: `${topSpace}px`,
      backgroundColor: status === 'pending' ? 'orange' : 'yellowgreen'
    }
  };

  return (
    <div className="weeklySchedule" style={{ height: `${scheduleHeight}px` }}>
      {
        hours.map((hour, index) => (
          <div key={hour} className="hourDiv" style={{ height: `${hourHeight}px` }}>
            <span className="scheduleHour">{hour}</span>
            {
              index === 0
                ? (
                  weekDays.map((weekDay) => (
                    <div className="weekDays">{weekDay.format('ddd Do')}</div>
                  ))
                )
                : null
            }
          </div>
        ))
      }
      <div className="shiftPanel">
        {
          weekDays.map((weekDay) => (
            <div className="dayShifts">
              {
                shifts.map((shift) => (
                  weekDay.format('YYYY-MM-DD') === shift[SHIFT_DATE]
                    ? (
                      <div
                        className="shift"
                        style={getShiftStyle(shift[SHIFT_START_TIME], shift[SHIFT_END_TIME])}
                        onClick={() => onClickShift(shift)}
                      >
                      </div>
                    )
                    : null
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}