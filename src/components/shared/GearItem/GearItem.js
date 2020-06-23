import React from 'react';
import { Link } from 'react-router-dom';

import smashData from '../../../helpers/data/smashData';

import gearShape from '../../../helpers/propz/gearShape';

import '../../../styles/index.scss';
import './GearItem.scss';

class GearItem extends React.Component {
  state = {
    gearFunction: {},
    gearWeather: {},
    gearSeasons: [],
    gearParties: [],
    currentpath: '/gear',
  }

  static propTypes = {
    gearItem: gearShape.gearShape,
  }

  getGearWithAdditionalProperties = () => {
    const { gearItem } = this.props;
    smashData.getGearWithProperties(gearItem.id)
      .then((gearWithProperties) => {
        this.setState({
          gearFunction: gearWithProperties.selectedFunction,
          gearWeather: gearWithProperties.selectedWeather,
          gearSeasons: gearWithProperties.selectedSeasons,
          gearParties: gearWithProperties.selectedParties,
        });
      })
      .catch((err) => console.error('unable to get additional properties of gear item', err));
  }

  componentDidMount() {
    this.getGearWithAdditionalProperties();
  }

  render() {
    const { gearItem } = this.props;
    const {
      gearFunction,
      gearWeather,
      gearSeasons,
      gearParties,
      currentpath,
    } = this.state;

    const singleLink = `/gear/${gearItem.id}`;
    const editLink = `/gear/edit/${gearItem.id}`;
    const newRoute = {
      pathname: `/gear/edit/${gearItem.id}`,
      previouspath: { currentpath },
    };

    return (
      <tbody>
        <tr>
          <th scope="row">{gearItem.item}</th>
          <td><img className="gearPhoto" src={gearItem.imageUrl} alt={gearItem.item} /></td>
          <td>{gearItem.brand}</td>
          <td>{gearItem.model}</td>
          <td><img className="gearIcon" src={gearFunction.imageUrl} alt={gearFunction.name} /></td>
          {/* { console.log('func value', gearFunction.id) } */}

          {
            gearSeasons
              ? <td>{gearSeasons.map((item) => <img key={item.id} className="gearIcon" src={item.imageUrl} alt={item.name} />)}</td>
              : <td>N/A</td>
          }

          <td><img className="gearIcon" src={gearWeather.imageUrl} alt={gearWeather.name} /></td>
          {
            gearParties
              ? <td>{gearParties.map((item) => <img key={item.id} className="gearIcon" src={item.imageUrl} alt={item.name} />)}</td>
              : <td>N/A</td>
          }
          {/* <td>{gearItem.weightInGrams * 1 }</td> */}

          { gearItem.isAvailable ? <td className="green"><i className="fas fa-check"></i></td> : <td className="red"><i className="fas fa-times"></i></td> }

          {/* <td>{gearItem.expirationYear}</td> */}

          <td className="row">
            <Link to={singleLink} className="btn p-1"><i className="fas fa-eye"></i></Link>
            <Link to={newRoute} className="btn p-1"><i className="fas fa-pencil-alt"></i></Link>
            <button className="btn pointerHand p-1"><i className="fas fa-trash-alt"></i></button>
          </td>
        </tr>
      </tbody>
    );
  }
}

export default GearItem;
