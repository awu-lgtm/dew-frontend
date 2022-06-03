import React from 'react';
import PropTypes from 'prop-types';
import './DisplayWeather.css';
import sunny from '../../assets/icons/sunny with shadow.svg';

function DisplayWeather({ location, temp, advice }) {
  DisplayWeather.propTypes = {
    location: PropTypes.string,
    temp: PropTypes.number,
    advice: PropTypes.string,
  };

  DisplayWeather.defaultProps = {
    location: '',
    temp: 273.15,
    advice: 'Quicktips: shorts',
  };

  // eslint-disable-next-line no-param-reassign
  advice = 'umbrella, shorts, jacket, coat';

  return (
    <div>
      <img id="weather-icon" src={sunny} alt="sunny" />
      <div className="location">
        {location}
      </div>
      <div className="temp">
        {`${(Math.round(temp - 273.15))}`}
        <sup id="c">°C</sup>
      </div>
      <div className="advice">
        {advice}
      </div>
    </div>
  );
}

export default DisplayWeather;
