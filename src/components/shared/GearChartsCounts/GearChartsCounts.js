import React from 'react';

import authData from '../../../helpers/data/authData';
import gearData from '../../../helpers/data/gearData';

import './GearChartsCounts.scss';

class GearChartsCounts extends React.Component {
  state = {
    gear: [],
  }

  getAvailableGear = () => {
    const uid = authData.getUid();
    gearData.getGearByUid(uid)
      .then((gear) => {
        const availableGearItemsOnly = gear.filter((gearItem) => gearItem.isAvailable === true);
        this.setState({ gear: availableGearItemsOnly });
      })
      .catch((err) => console.error('could not get only available gear from firebase', err));
  }

  componentDidMount() {
    this.getAvailableGear();
  }
  render() {
    const { gear } = this.state;

    const gearFunction1 = gear.filter((gearItem) => gearItem.functionId === 'function1');

    console.log('gearFunction1', gearFunction1);

    return (
      <div>
        {/* <h1>Gear Count by Category</h1> */}


      </div>
    );
  }
}

export default GearChartsCounts;
