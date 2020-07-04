import React from 'react';
import moment from 'moment';

import TripItem from '../../shared/TripItem/TripItem';

import authData from '../../../helpers/data/authData';
import tripsData from '../../../helpers/data/tripsData';

import './Trips.scss';
import { database } from 'firebase';

class Trips extends React.Component {
  state = {
    trips: [],
    pastTrips: [],
    futureTrips: [],
  }
  // Initial function to get all trips below:

  getTrips = () => {
    const uid = authData.getUid();
    tripsData.getTripsByUid(uid)
      .then((fbTrips) => this.setState({ trips: fbTrips }))
      .catch((err) => console.error('could not get list of trips from firebase', err));
  }

  // Alternate function I attempted to get 2 sets of trips grouped by past or future start dates - I was able to update the arrays correctly - and check that in React Components - but could not render the trips in the UI.
  // getTrips = () => {
  //   const uid = authData.getUid();
  //   const currentDate = new Date(); OR:
  //   const currentDate = moment().format('L');
  //   tripsData.getTripsByUid(uid)
  //     .then((fbTrips) => {
  //       const past = fbTrips.filter((trip) => moment(trip.startDate).format('YYYMMDD') < moment(currentDate).format('YYYMMDD')).sort((a, b) => moment(b.startDate).format('YYYMMDD') - moment(a.startDate).format('YYYYMMDD'));
  //       const future = fbTrips.filter((trip) => moment(trip.startDate).format('YYYMMDD') > moment(currentDate).format('YYYMMDD') || moment(trip.startDate).format('YYYMMDD') === moment(currentDate).format('YYYMMDD')).sort((a, b) => moment(b.startDate).format('YYYMMDD') - moment(a.startDate).format('YYYYMMDD'));
  //       this.setState({ pastTrips: past, futureTrips: future });
  //     })
  //     .catch((err) => console.error('unable to get list of trips', err));
  // }

  componentDidMount() {
    this.getTrips();
  }

  render() {
    const { trips } = this.state;

    const buildTrips = () => trips.map((trip) => (
      <TripItem key={trip.id} trip={trip} />
    ));

    // Alternate functions for past and future trips below:
    // const { pastTrips, futureTrips } = this.state;

    // const buildFutureTrips = () => {
    //   futureTrips.map((trip) => (
    //     <TripItem key={trip.id} trip={trip} />
    //   ));
    //   console.log('future trips running');
    // };

    // const buildPastTrips = () => {
    //   pastTrips.map((trip) => (
    //     <TripItem key={trip.id} trip={trip} />
    //   ));
    //   console.log('past trips running');
    // };

    return (
      <div className="Trips col-12 pt-0 pageDisplay">
        <h1 className="heading textShadow">Your Past and Future Trips</h1>
        <div className="d-flex flex-wrap">
          {buildTrips()}
        </div>

        {/* <div>
          <h3 className="heading textShadow">Future Trips</h3>
          <div className="d-flex flex-wrap">
            {buildFutureTrips()}
          </div>
        </div> */}
        {/* <div>
          <h3 className="heading textShadow">Past Trips</h3>
          <div className="d-flex flex-wrap">
            {buildPastTrips()}
          </div>
        </div> */}

      </div>
    );
  }
}

export default Trips;
