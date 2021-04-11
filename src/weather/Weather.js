import React, { useState } from 'react';
import './weather.css'
const api = {
  key: "4d6cadfb35f8be30f7add8c81e6ee16a",
  base: "https://api.openweathermap.org/data/2.5/"
}

function Weather() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    let days = ["日曜日", "月曜", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
    let dates =["一日","二日","三日","四日","五日","六日","七日","八日","九日","十日","十一日",
    "十二日","十三日","十四日","十五日","十六日","十七日","十八日","十九日","二十日","二十一日","二十二日",
    "二十三日","二十四日","二十五日","二十六日","二十七日","二十七日","二十九日","三十日","三十一日"];
    let day = days[d.getDay()];
    let date = dates[d.getDate()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day},  ${date},  ${month}, ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'weather1 warm' : 'weather1') : 'weather1'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="検索..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default Weather;