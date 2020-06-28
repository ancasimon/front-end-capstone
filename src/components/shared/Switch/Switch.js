import React from 'react';

import './Switch.scss';

const Switch = ({ isOn, handleToggle }) => {
  return (
    <div className="Switch">
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={'react-switch-new'}
        type="checkbox"
        />
      <label
        style={{ background: isOn && '#008b00' }}
        className="react-switch-label"
        htmlFor={'react-switch-new'}
        >
          <span className={'react-switch-button'} />
        </label>
    </div>
  );
};

export default Switch;
