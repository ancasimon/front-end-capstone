import React from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    removeGearItem: PropTypes.func.isRequired,
  }

  getGearWithAdditionalProperties = () => {
    const { gearItem } = this.props;
    smashData.getGearWithProperties(gearItem.id)
      .then((gearWithProperties) => {
        this.setState({
          gearFunction: gearWithProperties.selectedFunction,
          gearWeather: gearWithProperties.selectedWeather,
          gearSeasons: gearWithProperties.selectedGearSeasons,
          gearParties: gearWithProperties.selectedGearParties,
        });
        console.log('gear with addl properties', gearWithProperties);
      })
      .catch((err) => console.error('unable to get additional properties of gear item', err));
  }

  componentDidMount() {
    this.getGearWithAdditionalProperties();
  }

  deleteConfirmationMessage = (gearId) => {
    const { gearItem, removeGearItem } = this.props;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#32471E',
      cancelButtonColor: '#8b0000',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success',
        );
        removeGearItem(gearItem.id);
      }
    });
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

    // Note: I used the editLink variable below initially when this is all I had to pass down to the Edit Page component. Once I wantted to maek changes to return the user to the exact page that he left when he staretd editing, then I had to pass 2 pieces of info - this route as well as the path they came from - so newroute replaced and included the edit path - hence the variable below was no longer needed.
    // const editLink = `/gear/edit/${gearItem.id}`;
    const newRoute = {
      pathname: `/gear/edit/${gearItem.id}`,
      previouspath: { currentpath },
    };

    return (
      <tbody>
        <tr>
          <th scope="row">{gearItem.item}</th>
          <td className="d-none d-md-table-cell"><img className="gearPhoto photoBorder" src={gearItem.imageUrl} alt={gearItem.item} /></td>
          <td>{gearItem.brand}</td>
          <td className="d-none d-md-table-cell">{gearItem.model}</td>
          <td className="d-none d-md-table-cell"><img className="gearIcon" src={gearFunction.imageUrl} alt={gearFunction.name} /></td>
          {/* { console.log('func value', gearFunction.id) } */}

          {
            gearSeasons
              ? <td className="d-none d-md-table-cell">{gearSeasons.map((item) => <img key={item.id} className="gearIcon" src={item.imageUrl} alt={item.name} />)}</td>
              : <td className="d-none d-md-table-cell">N/A</td>
          }

          <td className="d-none d-md-table-cell"><img className="gearIcon" src={gearWeather.imageUrl} alt={gearWeather.name} /></td>
          {
            gearParties
              ? <td className="d-none d-md-table-cell">{gearParties.map((item) => <img key={item.id} className="gearIcon" src={item.imageUrl} alt={item.name} />)}</td>
              : <td className="d-none d-md-table-cell">N/A</td>
          }
          {/* <td>{gearItem.weightInGrams * 1 }</td> */}

          { gearItem.isAvailable ? <td className="green d-none d-md-table-cell"><i className="fas fa-check"></i></td> : <td className="red d-none d-md-table-cell"><i className="fas fa-times"></i></td> }

          {/* <td>{gearItem.expirationYear}</td> */}

          <td className="row">
            <Link to={singleLink} className="btn p-1"><i className="fas fa-eye"></i></Link>
            <Link to={newRoute} className="btn p-1"><i className="fas fa-pencil-alt"></i></Link>
            <button className="btn pointerHand p-1" onClick={() => this.deleteConfirmationMessage(gearItem.id)}><i className="fas fa-trash-alt"></i></button>
          </td>
        </tr>
      </tbody>
    );
  }
}

export default GearItem;
