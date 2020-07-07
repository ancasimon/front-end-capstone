import React from 'react';
import Swal from 'sweetalert2';
import moment from 'moment';

import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

import authData from '../../../helpers/data/authData';
import functionsData from '../../../helpers/data/functionsData';
import gearData from '../../../helpers/data/gearData';
import tripsData from '../../../helpers/data/tripsData';
import weatherData from '../../../helpers/data/weatherData';
import seasonsData from '../../../helpers/data/seasonsData';
import partyData from '../../../helpers/data/partyData';
import smashData from '../../../helpers/data/smashData';
import tripGearData from '../../../helpers/data/tripGearData';

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
    gear: [],
    tripGearList: [],
    // gearFunction: {},
    // gearWeather: {},
    // gearSeasons: [],
    // gearParties: [],
  };

  componentDidMount() {
    this.getWeatherList();
    this.getPartyList();
    this.getSeasonsList();
    this.getAvailableGear();
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

  // ANCA note: I was trying to get the full object with all the properties formt he smash file but can't quite finish it ... so for now, I will just use the simple object from gearData.getGearByUid.
  // getAvailableGear = () => {
  //   const uid = authData.getUid();
  //   gearData.getGearByUid(uid)
  //     .then((allGear) => {
  //       allGear.forEach((eachPiece) => {
  //         smashData.getGearWithProperties(eachPiece.id)
  //           .then((fbData) => {
  //             this.setState({
  //               gearFunction: fbData.selectedFunction,
  //               gearWeather: fbData.selectedWeather,
  //               gearSeasons: fbData.selectedGearSeasons,
  //               gearParties: fbData.selectedGearParties,
  //             });
  //           });
  //       });
  //       const availableFilteredGearItemsOnly = [];
  //       availableFilteredGearItemsOnly.push(fbData);
  //       availableFilteredGearItemsOnly.filter((gearItem) => gearItem.isAvailable === true).sort((a, b) => moment(b.timestamp).format('YYYYMMDD') - moment(a.timestamp).format('YYYYMMDD'));
  //       this.setState({ gear: availableFilteredGearItemsOnly });
  //       console.log('single gear', fbData);
  //       console.log('gear array', availableFilteredGearItemsOnly);
  //     })
  //     .catch((err) => console.error('could not get only available gear from firebase', err));
  // }

  getAvailableGear = () => {
    const uid = authData.getUid();
    gearData.getGearByUid(uid)
      .then((fbData) => {
        const availableFilteredGearItemsOnly = fbData.filter((gearItem) => gearItem.isAvailable === true).sort((a, b) => moment(b.timestamp).format('YYYYMMDD') - moment(a.timestamp).format('YYYYMMDD'));
        this.setState({ gear: availableFilteredGearItemsOnly });
      })
      .catch((err) => console.error('could not get only available gear from firebase', err));
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
    const tripGearArr = this.state.tripGearList;
    const gearId = e.target.id;
    // console.log('target', e.target.id);
    // console.log('whole e', e);
    if (e.target.checked) {
      tripGearArr.push(e.target.value);
    } else {
      // console.log('unchecked', e.target.value);
      console.log('current array', tripGearArr);
      const selTripGearIndex = tripGearArr.indexOf(e.target.value);
      // console.log('index', selTripGearIndex);
      tripGearArr.splice(selTripGearIndex, 1);
      console.log('updated array', tripGearArr);
    }
    this.setState({ tripGearList: tripGearArr });
    console.log('state', this.state);
  }

  createNewTripGearRecord = (tripId) => {
    const { tripGearList } = this.state;
    tripGearList.forEach((tripGearPieceId) => {
      const newTripGearObject = {
        tripId,
        gearId: tripGearPieceId,
        notes: '',
      };
      console.log('new tripGear', newTripGearObject);
      tripGearData.postTripGear(newTripGearObject)
        .then(() => console.log('created new tripGear'))
        .catch((err) => console.error('could not create new tripGear record'));
    });
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
        .then((newTripObject) => {
          const newTripId = newTripObject.data.name;
          this.createNewTripGearRecord(newTripId);
          this.props.history.push('/trips');
        })
        .catch((err) => console.error('unable to create new trip record', err));
    }
  }

  render() {
    const {
      gear,
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
      gearFunction,
      gearWeather,
      gearSeasons,
      gearParties,
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

    const buildGearList = () => gear.map((gearObject) => (
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
          </td>
          <td>
            <label className="form-check-label" htmlFor={gearObject.id}>
              {gearObject.item}
              </label>
          </td>
          <td className="d-none d-md-table-cell"><img className="gearPhoto photoBorder" src={gearObject.imageUrl} alt={gearObject.item} /></td>
          <td>{gearObject.brand}</td>
          <td className="d-none d-md-table-cell">{gearObject.model}</td>

          {/* <td className="d-none d-md-table-cell"><img className="gearIcon" src={gearFunction.imageUrl} alt={gearFunction.name} /></td>

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
          } */}
          <td>{gearObject.weightInGrams * 1 }</td>
        </tr>
      </tbody>
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
            <h3 className="heading textShadow">Make Your Packing List for This Trip</h3>
            <Table hover className="inputBorder">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Item</th>
                  <th className="d-none d-md-table-cell">Image</th>
                  <th>Brand</th>
                  <th className="d-none d-md-table-cell">Model</th>
                  {/* <th className="d-none d-sm-table-cell">Function</th>
                  <th className="d-none d-sm-table-cell">Seasons</th>
                  <th className="d-none d-sm-table-cell">Weather</th>
                  <th className="d-none d-sm-table-cell">Party</th> */}
                  <th>Weight (gr.)</th>
                  {/* <th className="d-none d-md-table-cell">Available?</th> */}
                  {/* <th>Exp. Yr.</th> */}
                  {/* <th>Actions</th> */}
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
