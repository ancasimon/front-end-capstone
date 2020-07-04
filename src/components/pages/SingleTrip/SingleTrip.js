import React from 'react';
import { Link } from 'react-router-dom';

import smashData from '../../../helpers/data/smashData';
import tripsData from '../../../helpers/data/tripsData';

import './SingleTrip.scss';

class SingleTrip extends React.Component {
  state = {
    trip: {},
    selectedParty: '',
    selectedWeather: '',
    selectedSeason: '',

  }

  buildSingleTripView = () => {
    const { tripId } = this.props.match.params;
    smashData.getTripWithDetails(tripId)
      .then((fbData) => this.setState({ 
        trip: fbData,
        selectedParty: fbData.selectedParty,
        selectedWeather: fbData.selectedWeather,
        selectedSeason: fbData.selectedSeason,
      }))
      .catch((err) => console.error('could not get trip details from firebase', err));

  }

  componentDidMount() {
    const { tripId } = this.props.match.params;
    this.buildSingleTripView(tripId);
  }

  render() {
    const {
      trip,
      selectedParty,
      selectedWeather,
      selectedSeason,
    } = this.state;
    const { tripId } = this.props.match.params;
    const editPath = `/trips/edit/${tripId}`;
    console.log('trip when rendering the single view', trip);
    return (
      <div className="SingleTrip col-12 pageDisplay mt-5">
        <h1 className="heading textShadow">Details about your trip to {trip.destination}</h1>
        <h6>{trip.startDate} - {trip.endDate}</h6>
        <Link to='/trips' className="btn btn-lg blueButtons col-sm-2 p-1"><i className="fas fa-chevron-left"></i></Link>

        <div className="container col-12">

          <div className="row col-12 justify-content-center">
            <p className="question">How many people going:</p><img src={selectedParty.imageUrl} alt="icon" className="gearIcon mx-3" /><p>{selectedParty.name}</p>
          </div>

          <div className="row col-12 justify-content-center">
            <p className="question">What kind of weather:</p><img src={selectedWeather.imageUrl} alt="icon" className="gearIcon mx-3" /><p>{selectedWeather.name}</p>
          </div>

          <div className="row col-12 justify-content-center">
            <p className="question">Time of year:</p><img src={selectedSeason.imageUrl} alt="icon" className="gearIcon mx-3" /><p>{selectedSeason.name}</p>
          </div>

          {
            trip.isEstablishedCampsite ? (
              <p className="question">This site is an established campsite.</p>
            ) : (
              <p className="question">Please note that this site is NOT an established campsite. You may want to take your hammock!</p>
            )
          }

          <img src={trip.imageUrl} alt={trip.destination} className="photoBorder tripSinglePhoto" />

          <div className="row col-12 justify-content-center">
            <Link to={editPath} className="btn btn-lg greenButtons col-sm-2 p-1"><i className="fas fa-pencil-alt"></i></Link>
            <button className="btn btn-lg redButtons col-sm-2 pointerHand p-1" onClick={this.deleteConfirmationMessage}><i className="fas fa-trash-alt"></i></button>
          </div>

        </div>
      </div>
    );
  }
}

export default SingleTrip;
