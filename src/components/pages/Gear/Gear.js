import React from 'react';
import { Table } from 'reactstrap';

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
      <div className="Gear col-12">
        <h1>Gear List Page</h1>

        <Table hover>
          <thead>
            <tr>
              <th>Item</th>
              <th>Image</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Exp. Yr.</th>
              <th>Function</th>
              <th>Weather</th>
              <th>Available?</th>
              <th>Actions</th>
            </tr>
          </thead>
            {buildGearGrid}
        </Table>
      </div>
    );
  }
}

export default Gear;
