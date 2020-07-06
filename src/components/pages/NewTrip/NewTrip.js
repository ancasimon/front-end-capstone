import React from 'react';
import Swal from 'sweetalert2';

import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

import GearItem from '../../shared/GearItem/GearItem';

import authData from '../../../helpers/data/authData';
import tripsData from '../../../helpers/data/tripsData';
import weatherData from '../../../helpers/data/weatherData';
import seasonsData from '../../../helpers/data/seasonsData';
import partyData from '../../../helpers/data/partyData';

import './NewTrip.scss';

class NewTrip extends React.Component {
  state = {
    weatherList: [],
    seasonsList: [],
    partyList: [],
    tripParty: 'party1',
    tripSeason: 'season1',
    tripWeather: 'weather1',
    tripEndDate: '',
    tripStartDate: '',
    tripImageUrl: '',
    tripEstablishedCampsite: true,
    tripDestination: '',
  };

  componentDidMount() {
    this.getWeatherList();
    this.getPartyList();
    this.getSeasonsList();
  }

  getWeatherList = () => {
    weatherData.getWeatherValues()
      .then((weatherList) => this.setState({ weatherList }))
      .catch((err) => console.error('unable to get list of weather values', err));
  }

  getSeasonsList = () => {
    seasonsData.getSeasons()
      .then((seasonsList) => this.setState({ seasonsList }))
      .catch((err) => console.error('unable to get list of seasons', err));
  }

  getPartyList = () => {
    partyData.getPartyValues()
      .then((partyList) => this.setState({ partyList }))
      .catch((err) => console.error('unabel to get list of parties', err));
  }

  changeTripDestination = (e) => {
    e.preventDefault();
    this.setState({ tripDestination: e.target.value });
  }

  changeTripEstablishedCampsite = (e) => {
    this.setState({ tripEstablishedCampsite: e.target.checked });
  }

  changeTripImageUrl = (e) => {
    e.preventDefault();
    this.setState({ tripImageUrl: e.target.value });
  }

  changeTripStartDate = (e) => {
    e.preventDefault();
    this.setState({ tripStartDate: e.target.value });
  }

  changeTripEndDate = (e) => {
    e.preventDefault();
    this.setState({ tripEndDate: e.target.value });
  }

  changeTripWeather = (e) => {
    e.preventDefault();
    this.setState({ tripWeather: e.target.value });
  }

  changeTripSeason = (e) => {
    e.preventDefault();
    this.setState({ tripSeason: e.target.value });
  }

  changeTripParty = (e) => {
    e.preventDefault();
    this.setState({ tripParty: e.target.value });
  }

  validationAlert = () => {
    Swal.fire('You must specify required details to add this item to your list: Destination & Start/End Dates!');
  }

  saveNewTrip = (e) => {
    e.preventDefault();
    const {
      tripParty,
      tripSeason,
      tripWeather,
      tripEndDate,
      tripStartDate,
      tripImageUrl,
      tripEstablishedCampsite,
      tripDestination,
    } = this.state;
    if (tripDestination === '' && tripStartDate === '' && tripEndDate === '') {
      this.validationAlert();
    } else {
      const newTrip = {
        uid: authData.getUid(),
        partyId: tripParty,
        seasonId: tripSeason,
        weatherId: tripWeather,
        endDate: tripEndDate,
        startDate: tripStartDate,
        imageUrl: tripImageUrl,
        isEstablishedCampsite: tripEstablishedCampsite,
        destination: tripDestination,
      };
      tripsData.postNewTrip(newTrip)
        .then(() => {
          this.props.history.push('/trips');
        })
        .catch((err) => console.error('unable to create new trip record', err));
    }
  }

  render() {
    const {
      weatherList,
      seasonsList,
      partyList,
      tripParty,
      tripSeason,
      tripWeather,
      tripEndDate,
      tripStartDate,
      tripImageUrl,
      tripEstablishedCampsite,
      tripDestination,
    } = this.state;

    const buildWeatherList = () => weatherList.map((weatherValue) => (
      <option key={weatherValue.id} value={weatherValue.id}>{weatherValue.name}</option>
    ));

    const buildSeasonsList = () => seasonsList.map((seasonValue) => (
      <option key={seasonValue.id} value={seasonValue.id}>{seasonValue.name}</option>
    ));

    const buildPartyList = () => partyList.map((partyValue) => (
      <option key={partyValue.id} value={partyValue.id}>{partyValue.name}</option>
    ));

    const buildGearList = () => gear.map((gearItem) => (
      <GearItem key={gearItem.id} gearItem={gearItem} removeGearItem={this.removeGearItem} />
    ));

    return (
      <div className="NewTrip col-12 pageDisplay">
        <h1 className="heading textShadow">Plan a New Trip</h1>

        <form className="pt-5">
          <div className="row p-2">

            <div className="form-group col-md-4">
              <label htmlFor="tripDestination" className="question">Where to?</label>
              <input
                id="tripDestination"
                type="text"
                className="form-control" placeholder="Destination"
                value={tripDestination}
                onChange={this.changeTripDestination}
              />
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="tripStartDate" className="question">Start Date:</label>
              <input
                id="tripStartDate"
                type="text"
                className="form-control"
                placeholder="MM/DD/YYYY"
                value={tripStartDate}
                onChange={this.changeTripStartDate}
                />
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="tripEndDate" className="question">End Date:</label>
              <input
                id="tripEndDate"
                type="text"
                className="form-control"
                placeholder="MM/DD/YYYY"
                value={tripEndDate}
                onChange={this.changeTripEndDate}
              />
            </div>

          </div>

          <div className="row justify-content-around p-2">

          <div className="form-group col-md-6 pt-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="tripEstablishedCampsite"
                    value={tripEstablishedCampsite}
                    onChange={this.changeTripEstablishedCampsite}
                  />
                  <label className="form-check-label question" htmlFor="tripEstablishedCampsite">
                  Is this an established campsite?
                  </label>
                </div>
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="tripImage" className="question">Photo URL</label>
                <input
                  type="text"
                  className="form-control"
                  id="tripImage"
                  placeholder="Find a pic!"
                  value={tripImageUrl}
                  onChange={this.changeTripImageUrl}
                />
              </div>

          </div>

          <div className="row justify-content-around col-12 p-5">

            <div className="form-group col-md-4">
              <label htmlFor="tripWeather" className="question">What do you expect the weather to be like?</label>
              <select
                className="form-control"
                id="tripWeather"
                value={tripWeather}
                onChange={this.changeTripWeather}
              >
                {buildWeatherList()}
              </select>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="tripSeason" className="question">What season?</label>
              <select
                className="form-control"
                id="tripSeason"
                value={tripSeason}
                onChange={this.changeTripSeason}
              >
                {buildSeasonsList()}
              </select>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="tripParty" className="question">How many people are going?</label>
              <select
                className="form-control"
                id="tripParty"
                value={tripParty}
                onChange={this.changeTripParty}
              >
                {buildPartyList()}
              </select>
            </div>

          </div>

          <div>
            <h3 className="heading textShadow">Create Your Packing List for This Trip</h3>
            <Table hover className="inputBorder">
              <thead>
                <tr>
                  <th>Item</th>
                  <th className="d-none d-md-table-cell">Image</th>
                  <th>Brand</th>
                  <th className="d-none d-md-table-cell">Model</th>
                  <th className="d-none d-sm-table-cell">Function</th>
                  <th className="d-none d-sm-table-cell">Seasons</th>
                  <th className="d-none d-sm-table-cell">Weather</th>
                  <th className="d-none d-sm-table-cell">Party</th>
                  <th>Weight (gr.)</th>
                  <th className="d-none d-md-table-cell">Available?</th>
                  <th>Exp. Yr.</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {buildGearList()}
            </Table>
          </div>

          <button type="submit" className="btn greenButtons" onClick={this.saveNewTrip}>Save New Trip</button>
          <Link className="btn redButtons" to='/trips'>Cancel</Link>

        </form>

      </div>
    );
  }
}

export default NewTrip;
