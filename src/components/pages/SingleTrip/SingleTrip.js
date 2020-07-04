import React from 'react';
import { Link } from 'react-router-dom';

import tripsData from '../../../helpers/data/tripsData';

import './SingleTrip.scss';

class SingleTrip extends React.Component {
  state = {
    trip: {},
  }

  buildSingleTripView = () => {
    const { tripId } = this.props.match.params;
    console.log('id in params??', this.props);
    tripsData.getSingleTrip(tripId)
      .then((fbData) => this.setState({ trip: fbData.data }))
      .catch((err) => console.error('could not get trip details from firebase', err));

  }

  componentDidMount() {
    const { tripId } = this.props.match.params;
    this.buildSingleTripView(tripId);
  }

  render() {
    const { trip } = this.state;
    return (
      <div className="SingleTrip col-12 pageDisplay mt-5">
        <h1 className="heading textShadow">Details about your trip to {trip.destination}</h1>
        <h3>{trip.startDate} - {trip.endDate}</h3>
        <Link to='/trips' className="btn btn-lg blueButtons col-sm-2 p-1"><i className="fas fa-chevron-left"></i></Link>
        <div className="container col-12">
          <p>Party: tbd</p>
          <p>Weather: tbd</p>
          <p>Season: tbd</p>
          {
            trip.isEstablishedCampsite ? (
              <p>This site is an established campsite.</p>
            ) : (
              <p>Please note that this site is NOT an established campsite. You may want to take your hammock!</p>
            )
          }
          <img src={trip.imageUrl} alt={trip.destination} className="tripSinglePhoto photoBorder" />

        </div>
      </div>
    );
  }
}

export default SingleTrip;
