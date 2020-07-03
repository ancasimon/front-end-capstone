import React from 'react';
import gearShape from '../../../helpers/propz/gearShape';

class GearExpiringRow extends React.Component {
  static propTypes = {
    gearItem: gearShape.gearShape,
  }

  render() {
    const { gearItem } = this.props;

    return (
        <tbody>
          <tr>
            <th scope="row">{gearItem.item}</th>
            <td>{gearItem.brand}</td>
            <td>{gearItem.model}</td>
            <td>{gearItem.manufactureYear}</td>
          </tr>
        </tbody>
    );
  }
}

export default GearExpiringRow;
