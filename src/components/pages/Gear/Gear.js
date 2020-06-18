import React from 'react';
import { Link } from 'react-router-dom';

import GearItem from '../../shared/GearItem/GearItem';

import authData from '../../../helpers/data/authData';
import gearData from '../../../helpers/data/gearData';

import './Gear.scss';

class Gear extends React.Component {
  state = {
    gear: [],
  }

  getGear = () => {
    const uid = authData.getUid();
    gearData.getGearByUid(uid)
      .then((gear) => this.setState({ gear }))
      .catch((err) => console.error('could not get gear from firebase', err));
  }

  componentDidMount() {
    this.getGear();
  }

  render() {
    const { gear } = this.state;
    const buildGearGrid = gear.map((gearItem) => (
      <GearItem key={gearItem.id} gearItem={gearItem} />
    ));
    return (
      <div className="Gear">
        <h1>Gear List Page</h1>
        <Link to='gear/:gearItemId'>View</Link>
        <Link to='gear/new'>Add</Link>
        <Link to='gear/edit/:gearItemId'>Edit</Link>
        <div>
          {buildGearGrid}
        </div>
      </div>
    );
  }
}

export default Gear;
