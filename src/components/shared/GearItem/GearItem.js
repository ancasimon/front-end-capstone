import React from 'react';
import { Link } from 'react-router-dom';

import gearShape from '../../../helpers/propz/gearShape';

import './GearItem.scss';

class GearItem extends React.Component {
  static propTypes = {
    gearItem: gearShape.gearShape,
  }

  render() {
    const { gearItem } = this.props;

    return (
      <tbody>
        <tr>
          <th scope="row">{gearItem.item}</th>
          <td><img className="gearPhoto" src={gearItem.imageUrl} alt={gearItem.item} /></td>
          <td>{gearItem.brand}</td>
          <td>{gearItem.model}</td>
          <td>{gearItem.expirationYear}</td>
          <td>{gearItem.function}</td>
          <td>{gearItem.weather}</td>
          { gearItem.isAvailable ? <td>Yes</td> : <td>No</td> }
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
