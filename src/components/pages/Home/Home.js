import React from 'react';

import GearChartsCounts from '../../shared/GearChartsCounts/GearChartsCounts';
import GearExpiring from '../../shared/GearExpiring/GearExpiring';

import authData from '../../../helpers/data/authData';

import './Home.scss';

class Home extends React.Component {
  render() {
    const userName = authData.getName();
    return (
      <div className="Home col-12">
        <h1 className="heading">Welcome to GearUp, {userName}!</h1>
        <div className="col-12 pageDisplay">
          <h4 className="heading">Your Gear Dashboard</h4>
          <div className="row col-12">
            <div className="col-4">
              <GearChartsCounts />
            </div>
            <div className="col-8">
              <GearExpiring />
            </div>
          </div>
          </div>
      </div>
    );
  }
}

export default Home;
