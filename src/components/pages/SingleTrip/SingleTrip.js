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
    const { trip, selectedParty, selectedWeather, selectedSeason } = this.state;
    console.log('trip when rendering the single view', trip);
    return (
      <div className="SingleTrip col-12 pageDisplay mt-5">
        <h1 className="heading textShadow">Details about your trip to {trip.destination}</h1>
        <h3>{trip.startDate} - {trip.endDate}</h3>
        <Link to='/trips' className="btn btn-lg blueButtons col-sm-2 p-1"><i className="fas fa-chevron-left"></i></Link>
        <div className="container col-12">
          <p>How many people went: {selectedParty.name}</p>
          <p>What kind of weather did you expect: {selectedWeather.name}</p>
          <p>Time of year: {selectedSeason.name}</p>
          {
            trip.isEstablishedCampsite ? (
              <p>This site is an established campsite.</p>
            ) : (
              <p>Please note that this site is NOT an established campsite. You may want to take your hammock!</p>
            )
          }
          <img src={trip.imageUrl} alt={trip.destination} className="photoBorder" />

        </div>
      </div>
    );
  }
}

export default SingleTrip;
