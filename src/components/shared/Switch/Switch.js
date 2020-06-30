import React from 'react';
import PropTypes from 'prop-types';

import './Switch.scss';

class Switch extends React.Component {
  static propTypes = {
    isOn: PropTypes.bool.isRequired,
    handleToggle: PropTypes.func.isRequired,
  }

  render() {
    const { isOn, handleToggle } = this.props;

    const buildToggleLabel = () => {
      if (isOn === true) {
        return (
          // Notes: if the checkbox is on, then ONLY AVAILABLE items have been selected so the background would be GREEN:
          <label
            style={{ background: '#008000' }}
            className="react-switch-label"
            htmlFor={'react-switch-new'}
            >
              <span className={'react-switch-button'} />
          </label>
        );
      }
      return (
      // Notes: if the checkbox is NOT on, then only UNavailable items have been selected so the background would be RED:
          <label
          style={{ background: '#FF0000' }}
          className="react-switch-label"
          htmlFor={'react-switch-new'}
          >
            <span className={'react-switch-button'} />
        </label>
      );
    };

    return (
      <div className="Switch">
        <input
          checked={isOn}
          onChange={handleToggle}
          className="react-switch-checkbox"
          id={'react-switch-new'}
          type="checkbox"
          />
        {buildToggleLabel()}
      </div>
    );
  }
}

export default Switch;
