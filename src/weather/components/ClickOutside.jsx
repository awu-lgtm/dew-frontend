import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function ClickOutside({ children, setNewDisplay }) {
  ClickOutside.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    children: PropTypes.object.isRequired,
    setNewDisplay: PropTypes.func.isRequired,
  };

  const clickRef = useRef(null);

  function clickOutside(event) {
    if (clickRef.current && !clickRef.current.contains(event.target)) {
      setNewDisplay({ display: 'none' });
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);
    return (() => document.removeEventListener('mousedown', clickOutside));
  });

  return (
    <span ref={clickRef}>
      {children}
    </span>
  );
}

export default ClickOutside;
