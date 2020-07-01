import React from 'react';

import GearChartsCounts from '../../shared/GearChartsCounts/GearChartsCounts';

import authData from '../../../helpers/data/authData';

import './Home.scss';

class Home extends React.Component {
  render() {
    const userName = authData.getName();
    return (
      <div className="Home col-12">
        <h1 className="heading">Welcome to GearUp, {userName}!</h1>
        <div className="col-12 pageDisplay">
          <div className="row col-12">
            <div className="col-4">
              <GearChartsCounts />
            </div>
          </div>
          </div>
      </div>
    );
  }
}

export default Home;
