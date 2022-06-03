import React from 'react';
import PropTypes from 'prop-types';
import DisplayWeather from './DisplayWeather';
import './Ticker.css';

function Ticker({ weather }) {
  Ticker.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    weather: PropTypes.object.isRequired,
  };

  return (
    <div className="ticker-size">
      <div className="ticker with-border">
        <div className="ticker-text">
          <DisplayWeather temp={weather.main.temp} location={weather.name} />
        </div>
        <div className="ticker edge" />
        <div className="ticker-shadow" />
      </div>
    </div>
  );
}

export default Ticker;
