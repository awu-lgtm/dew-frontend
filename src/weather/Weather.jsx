import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import AddWeather from './components/AddWeather';
import Ticker from './components/Ticker';
import DisplayAllWeather from './components/DisplayAllWeather';
import './Weather.css';

function Weather() {
  const weathers = useSelector((state) => state.weather);
  // use useState instead of useRef to force rerender when refs are initiated
  const [ticker, setTicker] = useState();
  const [container, setContainer] = useState();

  const style = {
    justifyContent: 'flex-start',
    columnGap: '5rem',
  };

  // sets flexbox to flex-start if tickers wrap
  // computes wrap by using substracting widths of tickers from width of container
  // useMemo to only calculate on ticker, container, or weather state change
  // switch to non useMemo if it breaks
  // 15 accounts for column gap
  // eslint-disable-next-line consistent-return
  const computeWrap = useMemo(() => {
    // checks if both refs exist
    if (ticker && container) {
      console.log('first');
      if (
        container.offsetWidth
        - weathers.length * ticker.offsetWidth
        - weathers.length * 15 < ticker.offsetWidth
      ) {
        return style;
      }
    }
  }, [ticker, container, weathers]);

  // const computeWrap = () => {
  //   if (ticker && container) {
  //     console.log('first');
  //     if (
  //       container.offsetWidth
  //       - weathers.length * ticker.offsetWidth < ticker.offsetWidth
  //     ) {
  //       return style;
  //     }
  //   }
  // };

  return (
    <div className="weather-container-container">
      <div ref={setContainer} style={computeWrap} className="weather-container">
        {/* <DisplayAllWeather /> */}
        {weathers.map((weather) => (
          <Ticker ref={setTicker} className="weather-ticker" weather={weather} key={`${JSON.stringify(weather.coord)}`} />
        ))}
        <AddWeather />
      </div>
    </div>
  );
}

export default Weather;
