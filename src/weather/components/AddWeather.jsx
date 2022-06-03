import React, { useState } from 'react';
import outline from '../../assets/icons/outline.svg';
import weather from '../../assets/icons/ticker.svg';
import './AddWeather.css';
import CreateWeather from './CreateWeather';
import ClickOutside from './ClickOutside';

function AddWeather() {
  const [display, setDisplay] = useState({ display: 'none' });
  const setNewDisplay = (newDisplay) => setDisplay(newDisplay);

  const displayCreate = () => {
    setDisplay({ display: 'block' });
  };

  return (
    <div>
      <img src={outline} role="presentation" alt="outline" onKeyDown={displayCreate} onClick={displayCreate} className="plus-outline" />
      <div style={display}>
        <div className="modal">
          <ClickOutside setNewDisplay={setNewDisplay}>
            <div className="modal-content">
              <CreateWeather />
            </div>
          </ClickOutside>
        </div>
      </div>
    </div>
  );
}

export default AddWeather;
