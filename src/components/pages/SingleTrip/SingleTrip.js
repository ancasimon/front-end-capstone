import React from 'react';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

import smashData from '../../../helpers/data/smashData';
import tripsData from '../../../helpers/data/tripsData';

import './SingleTrip.scss';

class SingleTrip extends React.Component {
  state = {
    trip: {},
    selectedParty: '',
    selectedWeather: '',
    selectedSeason: '',
    selectedGear: [],
  }

  buildSingleTripView = () => {
    const { tripId } = this.props.match.params;
    console.log('trip id in single view', tripId);
    smashData.getTripWithDetails(tripId)
      .then((fbData) => this.setState({
        trip: fbData,
        selectedParty: fbData.selectedParty,
        selectedWeather: fbData.selectedWeather,
        selectedSeason: fbData.selectedSeason,
        selectedGear: fbData.selectedTripGearObjects,
      }))
      .catch((err) => console.error('could not get trip details from firebase', err));
  }

  componentDidMount() {
    const { tripId } = this.props.match.params;
    this.buildSingleTripView(tripId);
  }

  removeTrip = () => {
    const { tripId } = this.props.match.params;
    tripsData.deleteTrip(tripId)
      .then(() => this.props.history.push('/trips'))
      .catch((err) => console.error('could not delete trip', err));
  }

  deleteConfirmationMessage = () => {
    const { tripId } = this.props.match.params;
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
        this.removeTrip(tripId);
      }
    });
  }

  render() {
    const {
      trip,
      selectedParty,
      selectedWeather,
      selectedSeason,
      selectedGear,
    } = this.state;
    const { tripId } = this.props.match.params;
    const editPath = `/trips/edit/${tripId}`;

    const buildGearGrid = () => selectedGear.sort((a, b) => moment(b.timestamp).format('YYYYMMDD') - moment(a.timestamp).format('YYYYMMDD')).map((gearItem) => (
      <tbody key={gearItem.id}>
        <tr>
            <th scope="row">{gearItem.item}</th>
            <td className="d-none d-md-table-cell"><img className="gearPhoto photoBorder" src={gearItem.imageUrl} alt={gearItem.item} /></td>
            <td>{gearItem.brand}</td>
            <td className="d-none d-md-table-cell">{gearItem.model}</td>
          </tr>
        </tbody>
    ));

    return (
      <div className="SingleTrip col-12 pageDisplay mt-5">
        <h1 className="heading textShadow">Details about Your Trip to {trip.destination}</h1>
        <h6>{trip.startDate} - {trip.endDate}</h6>
        <Link to='/trips' className="btn btn-lg blueButtons col-sm-2 p-1"><i className="fas fa-chevron-left"></i></Link>

        <div className="container col-12">

          <div className="row col-12 justify-content-center">
            <p className="question col-sm-4">How many people going:</p>
            {
              selectedParty
                ? (<div className="row col-sm-4 justify-content-center"><img src={selectedParty.imageUrl} alt="icon" className="gearIcon mx-3" /><p>{selectedParty.name}</p></div>)
                : (<p className="col-sm-4">N/A</p>)
            }

          <div className="row col-12 justify-content-center">
            <p className="question col-sm-4">What kind of weather:</p>
            {
              selectedWeather
                ? (<div className="row col-sm-4 justify-content-center"><img src={selectedWeather.imageUrl} alt="icon" className="gearIcon mx-3" /><p>{selectedWeather.name}</p></div>)
                : (<p className="col-sm-4">N/A</p>)
            }
          </div>

          <div className="row col-12 justify-content-center">
            <p className="question col-sm-4">Time of year:</p>
            {
              selectedSeason
                ? (<div className="row col-sm-4 justify-content-center"><img src={selectedSeason.imageUrl} alt="icon" className="gearIcon mx-3" /><p>{selectedSeason.name}</p></div>)
                : (<p className="col-sm-4">N/A</p>)
            }
          </div>
          <div className="row col-12 justify-content-center">
            {
              trip.isEstablishedCampsite ? (
                <p className="question">This site is an established campsite.</p>
              ) : (
                <p className="question">Please note that this site is NOT an established campsite. You may want to take your hammock!</p>
              )
            }
          </div>
          <div className="row col-12 justify-content-center">
            <img src={trip.imageUrl} alt={trip.destination} className="photoBorder tripSinglePhoto" />
          </div>

          <div>
            <h3 className="heading textShadow pt-5">Your Packing List for This Trip</h3>
            <Table hover className="inputBorder">
              <thead>
                <tr>
                  <th>Item</th>
                  <th className="d-none d-md-table-cell">Image</th>
                  <th>Brand</th>
                  <th className="d-none d-md-table-cell">Model</th>
                  {/* <th className="d-none d-sm-table-cell">Function</th>
                  <th className="d-none d-sm-table-cell">Seasons</th>
                  <th className="d-none d-sm-table-cell">Weather</th>
                  <th className="d-none d-sm-table-cell">Party</th>
                  {/* <th>Weight (gr.)</th> */}
                  {/* <th className="d-none d-md-table-cell">Available?</th> */}
                  {/* <th>Exp. Yr.</th> */}
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
                {buildGearGrid()}
            </Table>
          </div>

          <div className="row col-12 justify-content-center">
            <Link to={editPath} className="btn btn-lg greenButtons col-sm-2 p-1"><i className="fas fa-pencil-alt"></i></Link>
            <button className="btn btn-lg redButtons col-sm-2 pointerHand p-1" onClick={this.deleteConfirmationMessage}><i className="fas fa-trash-alt"></i></button>
          </div>

        </div>
      </div>
      </div>
    );
  }
}

export default SingleTrip;
