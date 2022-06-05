import React, { useState } from 'react';
import outline from '../../assets/icons/outline3.svg';
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

  const displayHide = () => {
    setNewDisplay({ display: 'none' });
  };

  return (
    <div>
      <img src={outline} role="presentation" alt="outline" onKeyDown={displayCreate} onClick={displayCreate} className="plus-outline" />
      <div style={display}>
        <div className="modal">
          <ClickOutside setNewDisplay={setNewDisplay}>
            <div className="modal-content">
              <CreateWeather displayHide={displayHide} />
            </div>
          </ClickOutside>
        </div>
      </div>
    </div>
  );
}

export default AddWeather;
