import React from 'react';
import countObjectShape from '../../../helpers/propz/countObjectShape';

class GearChartsRow extends React.Component {
  static propTypes = {
    countObject: countObjectShape.countObjectShape,
  }

  render() {
    const { countObject } = this.props;

    return (
        <tbody>
          <tr>
            <th scope="row">{countObject.functionName}</th>
            <td>{countObject.count}</td>
          </tr>
        </tbody>
    );
  }
}

export default GearChartsRow;
