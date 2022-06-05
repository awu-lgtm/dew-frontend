import React from 'react';
import PropTypes from 'prop-types';
import './DisplayWeather.css';
import sunnyIcon from '../../assets/icons/sunny with shadow.svg';
import cloudyIcon from '../../assets/icons/cloudy.svg';
import rainIcon from '../../assets/icons/rain.svg';
import snowIcon from '../../assets/icons/snow.svg';

function DisplayWeather({
  location, temp, clouds, rain, snow,
}) {
  DisplayWeather.propTypes = {
    location: PropTypes.string,
    temp: PropTypes.number,
    clouds: PropTypes.number,
    rain: PropTypes.shape({ '1h': PropTypes.number }),
    snow: PropTypes.shape({ '1h': PropTypes.number, '3h': PropTypes.number }),
  };

  DisplayWeather.defaultProps = {
    location: '',
    temp: 273.15,
    clouds: 0,
    rain: null,
    snow: null,
  };

  const weatherIcon = () => {
    // shows snow icon if there is snow
    if (snow && '1h' in snow) {
      if (snow['1h'] > 0) {
        return snowIcon;
      }
    }
    // shows rain icon if there is rain
    if (rain && '1h' in rain) {
      if (rain['1h'] > 0) {
        return rainIcon;
      }
    }
    // shows cloudy icon if there cloudiness > 50%
    if (clouds > 50) {
      return cloudyIcon;
    }
    // shows sunny if all others don't apply
    return sunnyIcon;
  };

  let advice = [];

  const celsius = Math.round(temp - 273.15);

  const giveAdvice = () => {
    // umbrella if rain
    if (rain && '1h' in rain) {
      if (rain['1h'] > 0) {
        advice.push('umbrella');
      }
    }
    // shows cloudy icon if there cloudiness > 50%

    if (celsius >= 21) {
      advice.push('t-shirt');
    } else if (celsius <= 21) {
      advice.push('long shirt');
    } else if (celsius <= 16) {
      advice.push('light jacket');
    } else if (celsius <= 11) {
      advice.push('jacket');
    } else if (celsius <= 0) {
      advice.push('winter jacket');
    }
    advice = advice.join(', ');
  };
    // shows sunny if all others don't apply

  giveAdvice();

  return (
    <div>
      <img id="weather-icon" src={weatherIcon()} alt="sunny" />
      <div className="location">
        {location}
      </div>
      <div className="temp">
        {celsius}
        <sup id="c">°C</sup>
      </div>
      <div className="advice">
        {advice}
      </div>
    </div>
  );
}

export default DisplayWeather;
