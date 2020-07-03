import React from 'react';
import {
  Button,
  Collapse,
} from 'reactstrap';

import GearChartsCounts from '../../shared/GearChartsCounts/GearChartsCounts';
import GearExpiring from '../../shared/GearExpiring/GearExpiring';

import authData from '../../../helpers/data/authData';

import './Home.scss';

class Home extends React.Component {
  state = {
    isOpenGearCounts: false,
    isOpenGearExpiring: false,
  }

  toggleAccordionGearCounts = () => {
    this.setState({ isOpenGearCounts: !this.state.isOpenGearCounts });
  }

  toggleAccordionGearExpiring = () => {
    this.setState({ isOpenGearExpiring: !this.state.isOpenGearExpiring });
  }

  render() {
    const { isOpenGearCounts, isOpenGearExpiring } = this.state;
    const userName = authData.getName();
    return (
      <div className="Home col-12">
        <h1 className="heading">Welcome to GearUp, {userName}!</h1>
        <div className="col-12 pageDisplay mt-5">
          <h4 className="heading m-3">Your Gear Dashboard</h4>
          <div className="row col-12">
            <div className="col-md-4">
              {/* COLLAPSE ACCORDION FOR Gear Counts Chart BELOW */}
              <div>
                <Button className="blueButtons" onClick={this.toggleAccordionGearCounts}>Gear Counts by Category</Button>
                <Collapse className="m-2" isOpen={isOpenGearCounts}>
                  <GearChartsCounts />
                </Collapse>
              </div>
            </div>
            <div className="col-md-8">
            {/* COLLAPSE ACCORDION FOR Gear Expiring List BELOW */}
            <div>
                <Button className="blueButtons" onClick={this.toggleAccordionGearExpiring}>Gear to Replace This Year</Button>
                <Collapse className="m-2" isOpen={isOpenGearExpiring}>
                  <GearExpiring />
                </Collapse>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Home;
