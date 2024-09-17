// src/CalendarComponent.js
import React, { useState } from 'react';
import moment from 'moment';

const CalendarComponent = ({ onDateClick }) => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  const daysInMonth = currentMonth.daysInMonth();
  const startDay = currentMonth.clone().startOf('month').day();
  const endDay = currentMonth.clone().endOf('month').day();
  
  const days = [];
  
  // Add empty days from the previous month
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  // Add days for the current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Add empty days for the next month
  for (let i = endDay + 1; i <= 6; i++) {
    days.push(null);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentMonth(currentMonth.clone().subtract(1, 'month'))}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          &lt;
        </button>
        <h2 className="text-xl font-bold">{currentMonth.format('MMMM YYYY')}</h2>
        <button
          onClick={() => setCurrentMonth(currentMonth.clone().add(1, 'month'))}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-2 font-bold text-gray-700">{day}</div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`p-2 cursor-pointer rounded-lg ${day === null ? 'bg-gray-100' : 'bg-white'} ${day && moment().date() === day ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => day && onDateClick(currentMonth.clone().date(day))}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarComponent;
