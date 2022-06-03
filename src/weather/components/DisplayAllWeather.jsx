import React from 'react';
import { useSelector } from 'react-redux';
import Ticker from './Ticker';

function DisplayAllWeather() {
  const weathers = useSelector((state) => state.weather);
  console.log(weathers);
  if (weathers.length > 0) {
    return (
      <div>
        <ul style={{ listStyleType: 'none' }}>
          {weathers.map((weather) => (
            <li key={weather.name}>
              <Ticker weather={weather} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default DisplayAllWeather;
