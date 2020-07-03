import React from 'react';
import { Table } from 'reactstrap';

import GearExpiringRow from './GearExpiringRow';

import authData from '../../../helpers/data/authData';
import gearData from '../../../helpers/data/gearData';

import './GearExpiring.scss';

class GearExpiring extends React.Component {
  state = {
    gear: [],
    gearExpiringCount: 0,
  }

  getData = () => {
    const uid = authData.getUid();
    gearData.getGearByUid(uid)
      .then((gear) => {
        const gearExpiringThisYear = gear.filter((gearItem) => gearItem.expirationYear === 2020);
        this.setState({ gear: gearExpiringThisYear });
        const count = gearExpiringThisYear.length;
        this.setState({ gearExpiringCount: count });
        console.log('count', this.state.gearExpiringCount);
        console.log('gear exp', gearExpiringThisYear);
      })
      .catch((err) => console.error('unable to get list of gear expiring this year', err));
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { gear, gearExpiringCount } = this.state;
    const buildGearExpiringList = () => gear.map((item) => (
        <GearExpiringRow key={item.id} gearItem={item} />
    ));

    return (
      <div>
        <p>({gearExpiringCount})</p>
        <Table dark>
          <thead>
            <tr>
              <th>Item</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Manufacture Year</th>
            </tr>
          </thead>
            {buildGearExpiringList()}
        </Table>
      </div>
    );
  }
}

export default GearExpiring;
