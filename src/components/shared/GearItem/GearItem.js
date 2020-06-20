import React from 'react';
import { Link } from 'react-router-dom';

import smashData from '../../../helpers/data/smashData';

import gearShape from '../../../helpers/propz/gearShape';

import './GearItem.scss';

class GearItem extends React.Component {
  state = {
    gearFunction: {},
    gearWeather: {},
    gearSeasons: [],
    gearParties: [],
  }

  static propTypes = {
    gearItem: gearShape.gearShape,
  }

  getAdditionalGearProperties = () => {
    const { gearItem } = this.props;
    smashData.getGearProperties(gearItem.id)
      .then((gearWithProperties) => {
        this.setState({
          gearFunction: gearWithProperties.function,
          gearWeather: gearWithProperties.weather,
          gearSeasons: gearWithProperties.seasons,
          gearParties: gearWithProperties.parties,
        });
      })
      .catch((err) => console.error('unable to get additional properties of gear item', err));
  }

  componentDidMount() {
    this.getAdditionalGearProperties();
  }

  render() {
    const { gearItem } = this.props;
    const {
      gearFunction,
      gearWeather,
      gearSeasons,
      gearParties,
    } = this.state;

    return (
      <tbody>
        <tr>
          <th scope="row">{gearItem.item}</th>
          <td><img className="gearPhoto" src={gearItem.imageUrl} alt={gearItem.item} /></td>
          <td>{gearItem.brand}</td>
          <td>{gearItem.model}</td>
          <td><img className="gearIcon" src={gearFunction.imageUrl} alt={gearFunction.name} /></td>

          {
            gearSeasons
              ? <td>{gearSeasons.map((item) => <img className="gearIcon" src={item.imageUrl} alt={item.name} />)}</td>
              : <td>N/A</td>
          }

          <td><img className="gearIcon" src={gearWeather.imageUrl} alt={gearWeather.name} /></td>
          {
            gearParties
              ? <td>{gearParties.map((item) => <img className="gearIcon" src={item.imageUrl} alt={item.name} />)}</td>
              : <td>N/A</td>
          }

          { gearItem.isAvailable ? <td>Yes</td> : <td>No</td> }
          <td>{gearItem.expirationYear}</td>
          <td>
            <Link to='gear/:gearItemId'>View</Link>
            <Link to='gear/edit/:gearItemId'>Edit</Link>
            <button className="btn">Delete</button>
          </td>
        </tr>
      </tbody>
    );
  }
}

export default GearItem;
