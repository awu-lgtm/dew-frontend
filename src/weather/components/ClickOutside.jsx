import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function ClickOutside({ children, setNewDisplay }) {
  ClickOutside.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    children: PropTypes.object.isRequired,
    setNewDisplay: PropTypes.func.isRequired,
  };

  const clickRef = useRef(null);

  // checks if key press is outside of ref (props.children)
  // sets display to none to hide modal
  function clickOutside(event) {
    if (clickRef.current && !clickRef.current.contains(event.target)) {
      setNewDisplay({ display: 'none' });
    }
  }

  // sets display to none on escape key press
  function escape(event) {
    if (event.key === 'Escape') {
      setNewDisplay({ display: 'none' });
    }
  }

  // useEffect allows function to occur after render when ref is initiated
  // sets display to none when click outside of children (the createWeather form)
  // also when pressing escape
  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);
    document.addEventListener('keydown', escape);
    // return function cleans up event listener
    return (() => {
      document.removeEventListener('mousedown', clickOutside);
      document.removeEventListener('keydown', escape);
    });
  });

  return (
    <span ref={clickRef}>
      {children}
    </span>
  );
}

export default ClickOutside;
