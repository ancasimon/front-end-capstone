import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import TripItem from '../../shared/TripItem/TripItem';

import authData from '../../../helpers/data/authData';
import tripsData from '../../../helpers/data/tripsData';

import './Trips.scss';

class Trips extends React.Component {
  state = {
    trips: [],
    pastTrips: [],
    futureTrips: [],
    pastTripsExist: false,
    futureTripsExist: false,
  }
  // Initial function to get all trips below:
  // getTrips = () => {
  //   const uid = authData.getUid();
  //   tripsData.getTripsByUid(uid)
  //     .then((fbTrips) => this.setState({ trips: fbTrips }))
  //     .catch((err) => console.error('could not get list of trips from firebase', err));
  // }

  getFutureTrips = () => {
    const uid = authData.getUid();
    const currentDate = new Date();
    tripsData.getTripsByUid(uid)
      .then((fbTrips) => {
        const future = fbTrips.filter((trip) => moment(trip.startDate).format('YYYMMDD') >= moment(currentDate).format('YYYMMDD')).sort((a, b) => moment(b.startDate).format('YYYMMDD') - moment(a.startDate).format('YYYYMMDD'));
        this.setState({ futureTrips: future });
        if (this.state.futureTrips.length > 0) {
          this.setState({ futureTripsExist: true });
        }
      })
      .catch((err) => console.error('unable to get list of future trips', err));
  }

  getPastTrips = () => {
    const uid = authData.getUid();
    const currentDate = new Date();
    tripsData.getTripsByUid(uid)
      .then((fbTrips) => {
        const past = fbTrips.filter((trip) => moment(trip.startDate).format('YYYMMDD') < moment(currentDate).format('YYYMMDD')).sort((a, b) => moment(b.startDate).format('YYYMMDD') - moment(a.startDate).format('YYYYMMDD'));
        this.setState({ pastTrips: past });
        if (this.state.pastTrips.length > 0) {
          this.setState({ pastTripsExist: true });
        }
      })
      .catch((err) => console.error('unable to get list of past trips', err));
  }

  componentDidMount() {
    // this.getTrips();
    this.getFutureTrips();
    this.getPastTrips();
  }

  render() {
    const {
      futureTrips,
      pastTrips,
      futureTripsExist,
      pastTripsExist,
    } = this.state;

    const buildFutureTrips = () => futureTrips.map((trip) => (
      <TripItem key={trip.id} trip={trip} />
    ));

    const buildPastTrips = () => pastTrips.map((trip) => (
      <TripItem key={trip.id} trip={trip} />
    ));

    return (
      <div className="Trips col-12 pt-0 pageDisplay">
        <h1 className="heading textShadow">Your Trips</h1>

        <div className="p-1 mt-1 d-flex flex-wrap justify-content-center">
          <Link to='trips/new' className="greenButtons mt-1"><i className="fas fa-plus"></i> Planning a new trip? Add it here!</Link>
        </div>

        <div>
          <h2 className="heading textShadow p-3">Future Trips</h2>
          {
            futureTripsExist ? (
              <div className="d-flex flex-wrap">
                {buildFutureTrips()}
              </div>
            ) : (
              <h4>You have no upcoming trips planned yet.</h4>
            )
          }
        </div>

        <div>
          <h2 className="heading textShadow p-3">Past Trips</h2>
          {
            pastTripsExist ? (
              <div className="d-flex flex-wrap">
                {buildPastTrips()}
              </div>
            ) : (
              <h4>You have not recorded any previous trips.</h4>
            )
          }
        </div>

      </div>
    );
  }
}

export default Trips;
