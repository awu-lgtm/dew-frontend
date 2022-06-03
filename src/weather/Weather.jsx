import React from 'react';
import AddWeather from './components/AddWeather';
import DisplayAllWeather from './components/DisplayAllWeather';

function Weather() {
  return (
    <div>
      <DisplayAllWeather />
      <AddWeather />
    </div>
  );
}

export default Weather;
