import React from 'react';
import { Link } from 'react-router-dom';
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
      <div className="Gear col-12 pt-0">
        <h1>Gear List Page</h1>
        <div className="p-3">
          <Link to='gear/new' className="mt-5">Did you buy some new gear? Add it to your list!</Link>
        </div>
        <Table hover>
          <thead>
            <tr>
              <th>Item</th>
              <th>Image</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Function</th>
              <th>Seasons</th>
              <th>Weather</th>
              <th>Party</th>
              <th>Available?</th>
              <th>Exp. Yr.</th>
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
