import React from 'react';

import './Switch.scss';

const Switch = () => {
  return (
    <div className="Switch">
      <input
        className="react-switch-checkbox"
        id={'react-switch-new'}
        type="checkbox"
        />
      <label
        className="react-switch-label"
        htmlFor={'react-switch-new'}
        >
          <span className={'react-switch-button'} />
        </label>
    </div>
  );
};

export default Switch;
