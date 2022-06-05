import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addTheWeather, addTheWeatherCoord } from '../reducers/weatherReducer';
import './CreateWeather.css';
import search from '../../assets/other/search.svg';
import auto from '../services/autocomplete';

function CreateWeather({ displayHide }) {
  CreateWeather.propTypes = {
    // eslint-disable-next-line react/require-default-props
    displayHide: PropTypes.func,
  };

  const [location, setLocation] = useState('');
  const [finalLocation, setFinalLocation] = useState('');
  const [coord, setCoord] = useState({});
  const [autoComplete, setAutoComplete] = useState([]);
  const dispatch = useDispatch();
  // const myRefs = useRef([]);

  // creates an array off refs in myRefs.current
  // if (autoComplete) {
  //   myRefs.current = autoComplete.map((element, i) => myRefs.current[i] ?? createRef());
  // }

  useEffect(() => {
    dispatch(addTheWeather(finalLocation));
  }, [finalLocation]);

  useEffect(() => {
    dispatch(addTheWeatherCoord(coord.city, coord.lat, coord.lon));
  }, [coord]);

  // calls geoNames API to find similar names
  // uses setTimeout to prevent too many api calls
  useEffect(() => {
    const findLocation = async () => {
      if (location !== '' && location) {
        const locations = await auto.searchGeonames(location);
        setAutoComplete(locations);
      }

      if (location === '') {
        setAutoComplete([]);
      }
    };

    const timeoutId = setTimeout(findLocation, 400);

    // clears setTimeout so that multiple timeouts don't stack
    return () => clearInterval(timeoutId);
  }, [location]);

  const handleAutoComplete = (city) => {
    setCoord({ city: city.name, lat: city.lat, lon: city.lng });
    displayHide();
    setLocation('');
  };

  // each index in myRefs.current corresponds to the index of the element in autoComplete
  const displayAutoComplete = () => {
    if (autoComplete.length < 1) {
      return null;
    }

    if (autoComplete.length > 1) {
      return (autoComplete.map(
        (city) => <li key={city.geonameId} onClick={() => handleAutoComplete(city)} role="presentation">{`${city.name}, ${city.countryCode}`}</li>,
      ));
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    displayHide();
    setFinalLocation(location);
    setLocation('');
  };

  const handleOnChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div>
      <form className="weather-form" onSubmit={handleSubmit}>
        <div className="create-weather-form">
          <h1 className="addweather"> Add weather </h1>
          <input className="form-field weather" placeholder="Search for city" value={location} onChange={handleOnChange} />
          <img className="icon search" src={search} alt="search" />
          <div className="list-container">
            <ul className="auto-complete-list">
              {displayAutoComplete()}
            </ul>
          </div>
          {/* <button type="submit">
            submit
          </button> */}
        </div>
      </form>
    </div>
  );
}

export default CreateWeather;
