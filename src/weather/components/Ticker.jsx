import React from 'react';
import PropTypes from 'prop-types';
import DisplayWeather from './DisplayWeather';
import './Ticker.css';
import { deleteTheWeather } from '../reducers/weatherReducer';
import { useDispatch } from 'react-redux';
import xmark from '../../assets/icons/x-mark.svg';

// forwardRef to give ref to Weather.jsx
const Ticker = React.forwardRef(({ weather }, ref) => {
  Ticker.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    weather: PropTypes.object.isRequired,
  };

  const dispatch = useDispatch();

  const handleKeyDown = (event) => {
    if (event.keyCode === 46) {
      dispatch(deleteTheWeather(weather.name, weather.coord.lat, weather.coord.lon))
    }
  };

  const handleClick = () => {
    dispatch(deleteTheWeather(weather.name, weather.coord.lat, weather.coord.lon))
  };

  return (
    <div className="ticker-size">
      <div ref={ref} className="ticker with-border">
        <div onKeyDown={handleKeyDown} onClick={handleClick} role="presentation" className="xmark-container">
          <img className="xmark" src={xmark} alt="x" />
        </div>
        <div className="ticker-text">
          <DisplayWeather
            temp={weather.main.temp}
            location={weather.name}
            clouds={weather.clouds.all}
            rain={weather.rain}
          />
        </div>
        <div className="ticker edge" />
        <div className="ticker-shadow" />
      </div>
    </div>
  );
});

export default Ticker;
