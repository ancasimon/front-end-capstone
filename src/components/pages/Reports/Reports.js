import React from 'react';

import GearChartsCounts from '../../shared/GearChartsCounts/GearChartsCounts';
import GearExpiring from '../../shared/GearExpiring/GearExpiring';

import './Reports.scss';

class Reports extends React.Component {
  render() {
    return (
      <div className="Reports col-12 pt-0 pageDisplay">
        <h1 className="heading textShadow">Stats and More</h1>
        <div className="row col-12">
          <div className="col-6">
            <h3>Gear Counts by Category</h3>
            <GearChartsCounts />
          </div>
          <div className="col-6">
            <h3>Gear to Replace This Year</h3>
            <GearExpiring />
          </div>
        </div>
      </div>
    );
  }
}

export default Reports;
