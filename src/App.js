import React from "react";
import './App.css';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function App() {
  return (
    <div className="App">
      <div className="Calendar">
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
        />
      </div>
    </div>
  );
}

export default App;
