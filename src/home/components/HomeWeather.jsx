import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addHomeWeather, addHomeWeatherCoord } from '../reducers/homeReducer';
import search from '../../assets/other/search.svg';
import auto from '../../weather/services/autocomplete';
import thermometer from '../../assets/icons/thermometer.png';
import sunnyIcon from '../../assets/icons/sunny with shadow.svg';
import cloudyIcon from '../../assets/icons/cloudy.svg';
import rainIcon from '../../assets/icons/rain.svg';
import snowIcon from '../../assets/icons/snow.svg';
import '../../weather/components/CreateWeather.css';
import './SearchWeather.css';
import './HomeWeather.css';

function HomeWeather() {
  const weather = useSelector((state) => state.home);

  // converts unic timestamp to utc
  const formatLocalTime = (time) => {
    const date = new Date(time * 1000);
    return date.toLocaleString('en-US', { timeZone: weather.timezone }).split(' ')[1];
  };

  const weatherIcon = () => {
    // shows snow icon if there is snow
    if (weather.hourly[0].snow && '1h' in weather.hourly[0].snow) {
      if (weather.hourly[0].snow['1h'] > 0) {
        return snowIcon;
      }
    }
    // shows rain icon if there is rain
    if (weather.hourly[0].rain && '1h' in weather.hourly[0].rain) {
      if (weather.hourly[0].rain['1h'] > 0) {
        return rainIcon;
      }
    }
    // shows cloudy icon if there cloudiness > 50%
    if (weather.current.clouds > 50) {
      return cloudyIcon;
    }
    // shows sunny if all others don't apply
    return sunnyIcon;
  };

  return (
    <div className="home-weather-container">
      <div className="home-weather-card">
        <div className="home-weather-format">
          <h1 className="home-weather-header">
            {`Weather in ${weather.name}`}
          </h1>
          <img className="home-weather-icon" src={weatherIcon()} alt="weather icon" />
          <div className="home-weather-temp">
            {`${(weather.current.temp - 271.5).toFixed(2)}°C`}
          </div>
          <div id="home-weather-feelslike">
            {`Feels like: ${(weather.current.feels_like - 271.5).toFixed(2)}°C`}
            <br />
          </div>
          <div id="home-weather-wind">
            {`Wind speed: ${weather.current.wind_speed} m/s`}
          </div>
          <div>
            {`Current time: ${formatLocalTime(weather.current.dt)}`}
          </div>
          <div>
            {`Sunrise: ${formatLocalTime(weather.current.sunrise)}`}
          </div>
          <div>
            {`Sunset: ${formatLocalTime(weather.current.sunset)}`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeWeather;
