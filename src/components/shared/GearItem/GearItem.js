import React from 'react';
import { Link } from 'react-router-dom';

import smashData from '../../../helpers/data/smashData';

import gearShape from '../../../helpers/propz/gearShape';

import './GearItem.scss';

class GearItem extends React.Component {
  state = {
    gearFunction: {},
  }

  static propTypes = {
    gearItem: gearShape.gearShape,
  }

  getFunctions = () => {
    const { gearItem } = this.props;
    console.log('gearItem id in gearitem file', gearItem.id);
    smashData.getFunctionForGear(gearItem.id)
      .then((selectedFunction) => {
        console.log('sel function passed to gearitem file', selectedFunction);
        this.setState({ gearFunction: selectedFunction });
      })
      .catch((err) => console.error('unable to get functions for gear', err));
  }

  componentDidMount() {
    this.getFunctions();
  }

  render() {
    const { gearItem } = this.props;
    const { gearFunction } = this.state;

    return (
      <tbody>
        <tr>
          <th scope="row">{gearItem.item}</th>
          <td><img className="gearPhoto" src={gearItem.imageUrl} alt={gearItem.item} /></td>
          <td>{gearItem.brand}</td>
          <td>{gearItem.model}</td>
          <td><img className="gearIcon" src={gearFunction.imageUrl} alt={gearFunction.name} /></td>
          <td>{gearItem.season}</td>
          <td>{gearItem.weatherId}</td>
          <td>{gearItem.party}</td>
          { gearItem.isAvailable ? <td>Yes</td> : <td>No</td> }
          <td>{gearItem.expirationYear}</td>
          <td>
            <Link to='gear/:gearItemId'>View</Link>
            <Link to='gear/new'>Add</Link>
            <Link to='gear/edit/:gearItemId'>Edit</Link>
          </td>
        </tr>
      </tbody>
    );
  }
}

export default GearItem;
