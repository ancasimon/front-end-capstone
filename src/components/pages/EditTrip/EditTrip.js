import React from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

import authData from '../../../helpers/data/authData';
import tripsData from '../../../helpers/data/tripsData';
import weatherData from '../../../helpers/data/weatherData';
import seasonsData from '../../../helpers/data/seasonsData';
import partyData from '../../../helpers/data/partyData';

import './EditTrip.scss';
import smashData from '../../../helpers/data/smashData';
import tripGearData from '../../../helpers/data/tripGearData';

class EditTrip extends React.Component {
  state = {
    weatherList: [],
    seasonsList: [],
    partyList: [],
    tripParty: '',
    tripSeason: '',
    tripWeather: '',
    tripEndDate: '',
    tripStartDate: '',
    tripImageUrl: '',
    tripEstablishedCampsite: false,
    tripDestination: '',
    tripGear: [],
  };

  componentDidMount() {
    this.getWeatherList();
    this.getPartyList();
    this.getSeasonsList();
    this.buildEditTripPage();
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

  buildEditTripPage = () => {
    const editId = this.props.match.params.tripId;
    console.log('trip id form params', editId);
    smashData.getTripWithDetails(editId)
      .then((fbResponse) => {
        const currentTrip = fbResponse;
        console.log('fb response in edit page', fbResponse);
        this.setState({
          tripParty: currentTrip.selectedParty.id,
          tripSeason: currentTrip.selectedSeason.id,
          tripWeather: currentTrip.selectedWeather.id,
          tripEndDate: currentTrip.endDate,
          tripStartDate: currentTrip.startDate,
          tripImageUrl: currentTrip.imageUrl,
          tripEstablishedCampsite: currentTrip.isEstablishedCampsite,
          tripDestination: currentTrip.destination,
          tripGear: currentTrip.allGearWithChecks,
        });
      })
      .catch((err) => console.error('could not update trip info', err));
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

  changeTripGearSelection = (e) => {
    const editTripId = this.props.match.params.tripId;
    console.log('etarget', e.target);
    const newTripGearCheckedValue = e.target.checked;
    // const currentGearId = e.target.getAttribute('parentgear');
    const currentGearId = e.target.id;
    console.log('gear id for new trip gear', currentGearId);
    const currentTripGearId = e.target.getAttribute('parenttripgear');
    if (newTripGearCheckedValue !== true) {
      this.deleteTripGearRecord(currentTripGearId);
    } else if (newTripGearCheckedValue === true) {
      this.createNewTripGearRecord(editTripId, currentGearId);
    }
  }

  createNewTripGearRecord = (tripId, gearId) => {
    const newTripGearRecord = {
      tripId,
      gearId,
    };
    tripGearData.postTripGear(newTripGearRecord)
      .then(() => {
        this.buildEditTripPage();
        console.log('new trip gear', newTripGearRecord);
      })
      .catch((err) => console.error('could not create a new trip gear record for this trip', err));
  };

  deleteTripGearRecord = (tripGearId) => {
    tripGearData.deleteTripGear(tripGearId)
      .then(() => {
        this.buildEditTripPage();
        console.log('deleted trip gear', tripGearId);
      })
      .catch((err) => console.error('could not delete this trip gear record', err));
  }

  validationAlert = () => {
    Swal.fire('You must specify required details to add this item to your list: Destination & Start/End Dates!');
  }

  updateTrip = (e) => {
    e.preventDefault();
    const editId = this.props.match.params.tripId;
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
      const updatedTrip = {
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
      tripsData.putTrip(editId, updatedTrip)
        .then(() => {
          this.props.history.push(`/trips/${editId}`);
        })
        .catch((err) => console.error('unable to save changes to trip record', err));
    }
  }

  render() {
    const editId = this.props.match.params.tripId;
    const singleTripPath = `/trips/${editId}`;
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
      tripGear,
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

    const buildGearList = () => tripGear.map((gearObject) => (
      <tbody key={gearObject.id}>
        <tr>
          <td className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={gearObject.isChecked}
              id={gearObject.id}
              value={gearObject.id}
              parentgear={gearObject.parentGear}
              parenttripgear={gearObject.parentTripGear}
              onChange={this.changeTripGearSelection}
            />
            <label className="form-check-label" htmlFor={gearObject.id}>
              {gearObject.item}
              </label>
          </td>
          <td className="d-none d-md-table-cell"><img className="gearPhoto photoBorder" src={gearObject.imageUrl} alt={gearObject.item} /></td>
          <td>{gearObject.brand}</td>
          <td className="d-none d-md-table-cell">{gearObject.model}</td>
        </tr>
      </tbody>
    ));

    return (
      <div className="EditTrip col-12 pageDisplay">
        <h1 className="heading textShadow">Update Trip Info</h1>

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
                    checked={tripEstablishedCampsite}
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
              {buildGearList()}
            </Table>
          </div>

          <button type="submit" className="btn greenButtons" onClick={this.updateTrip}>Save Your Changes</button>
          <Link to={singleTripPath} className="btn redButtons">Cancel</Link>

        </form>

      </div>
    );
  }
}

export default EditTrip;
