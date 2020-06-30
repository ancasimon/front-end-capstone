import React from 'react';

import GearChartsCounts from '../../shared/GearChartsCounts/GearChartsCounts';

import authData from '../../../helpers/data/authData';

import './Home.scss';

class Home extends React.Component {
  render() {
    const userName = authData.getName();
    return (
      <div className="Home">
        <h1 className="heading">Welcome to GearUp, {userName}!</h1>
        <GearChartsCounts />
      </div>
    );
  }
}

export default Home;
