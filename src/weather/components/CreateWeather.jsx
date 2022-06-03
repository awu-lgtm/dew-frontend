import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTheWeather } from '../reducers/weatherReducer';

function CreateWeather() {
  const [location, setLocation] = useState('');
  const [finalLocation, setFinalLocation] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addTheWeather(finalLocation));
  }, [finalLocation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFinalLocation(location);
    setLocation('');
  };

  return (
    <div>
      <form className="weather-form" onSubmit={handleSubmit}>
        <input className="form-field" value={location} onChange={(e) => setLocation(e.target.value)} />
        <select name="countries">
          <option value="Britain">Britain</option>
        </select>
        <button type="submit">
          submit
        </button>
      </form>
    </div>
  );
}

export default CreateWeather;
