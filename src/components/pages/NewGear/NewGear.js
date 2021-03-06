import React from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import authData from '../../../helpers/data/authData';
import functionsData from '../../../helpers/data/functionsData';
import gearData from '../../../helpers/data/gearData';
import gearPartyData from '../../../helpers/data/gearPartyData';
import gearSeasonData from '../../../helpers/data/gearSeasonData';
import partyData from '../../../helpers/data/partyData';
import seasonsData from '../../../helpers/data/seasonsData';
import weatherData from '../../../helpers/data/weatherData';

import '../../../styles/index.scss';
import './NewGear.scss';

class NewGear extends React.Component {
  state = {
    gearItem: '',
    gearBrand: '',
    gearModel: '',
    gearDetails: '',
    gearEstCampsite: false,
    gearAvailable: true,
    gearManYr: 2020,
    gearExpYr: 2030,
    gearWeight: 0,
    gearFunction: 'function13',
    gearWeather: 'weather1',
    gearImageUrl: '',
    functionsList: [],
    weatherList: [],
    seasonsList: [],
    partyList: [],
    gearSeasonsList: [],
    gearPartyList: [],
  }

  getFunctionsList = () => {
    functionsData.getFunctions()
      .then((functionsList) => this.setState({ functionsList }))
      .catch((err) => console.error('unable to get list of function values', err));
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

  componentDidMount() {
    this.getFunctionsList();
    this.getWeatherList();
    this.getSeasonsList();
    this.getPartyList();
  }

  changeGearSeason = (e) => {
    const gearSeasonsArr = this.state.gearSeasonsList;
    if (e.target.checked) {
      gearSeasonsArr.push(e.target.value);
    } else {
      const selSeasonIndex = gearSeasonsArr.indexOf(e.target.value);
      gearSeasonsArr.splice(selSeasonIndex, 1);
    }
    this.setState({ gearSeasonsList: gearSeasonsArr });
  }

  createNewGearSeasonRecord = (gearId) => {
    const { gearSeasonsList } = this.state;
    gearSeasonsList.forEach((seasonId) => {
      const newGearSeason = {
        gearId,
        seasonId,
      };
      gearSeasonData.postGearSeason(newGearSeason)
        .then()
        .catch((err) => console.error('could not create new gearSeason record'));
    });
  }

  changeGearParty = (e) => {
    const gearPartyArr = this.state.gearPartyList;
    if (e.target.checked) {
      gearPartyArr.push(e.target.value);
    } else {
      const selPartyIndex = gearPartyArr.indexOf(e.target.value);
      gearPartyArr.splice(selPartyIndex, 1);
    }
    this.setState({ gearPartyList: gearPartyArr });
  }

  createNewGearPartyRecord = (gearId) => {
    const { gearPartyList } = this.state;
    gearPartyList.forEach((partyId) => {
      const newGearParty = {
        gearId,
        partyId,
      };
      gearPartyData.postGearParty(newGearParty)
        .then()
        .catch((err) => console.error('could not create new gearParty record'));
    });
  }

  changeGearItem = (e) => {
    e.preventDefault();
    this.setState({ gearItem: e.target.value });
  }

  changeGearBrand = (e) => {
    e.preventDefault();
    this.setState({ gearBrand: e.target.value });
  }

  changeGearModel = (e) => {
    e.preventDefault();
    this.setState({ gearModel: e.target.value });
  }

  changeGearDetails = (e) => {
    e.preventDefault();
    this.setState({ gearDetails: e.target.value });
  }

  changeGearEstCampsite = (e) => {
    this.setState({ gearEstCampsite: e.target.checked });
  }

  changeGearAvailable = (e) => {
    this.setState({ gearAvailable: e.target.checked });
  }

  changeGearManYr = (e) => {
    e.preventDefault();
    this.setState({ gearManYr: e.target.value * 1 });
  }

  changeGearExpYr = (e) => {
    e.preventDefault();
    this.setState({ gearExpYr: e.target.value * 1 });
  }

  changeGearWeight = (e) => {
    e.preventDefault();
    this.setState({ gearWeight: e.target.value * 1 });
  }

  changeGearFunction = (e) => {
    e.preventDefault();
    this.setState({ gearFunction: e.target.value });
  }

  changeGearWeather = (e) => {
    e.preventDefault();
    this.setState({ gearWeather: e.target.value });
  }

  changeGearImageUrl = (e) => {
    e.preventDefault();
    this.setState({ gearImageUrl: e.target.value });
  }

  validationAlert = () => {
    Swal.fire('You must specify required details to add this item to your list: Item & Brand!');
  }

  saveNewGear = (e) => {
    e.preventDefault();
    const {
      gearItem,
      gearBrand,
      gearModel,
      gearDetails,
      gearEstCampsite,
      gearAvailable,
      gearManYr,
      gearExpYr,
      gearWeight,
      gearFunction,
      gearWeather,
      gearImageUrl,
    } = this.state;
    if (gearItem === '' && gearBrand === '') {
      this.validationAlert();
    } else {
      const newGear = {
        uid: authData.getUid(),
        item: gearItem,
        isAvailable: gearAvailable,
        functionId: gearFunction,
        brand: gearBrand,
        model: gearModel,
        details: gearDetails,
        manufactureYear: gearManYr,
        expirationYear: gearExpYr,
        weatherId: gearWeather,
        forEstablishedCampsite: gearEstCampsite,
        weightInGrams: gearWeight,
        imageUrl: gearImageUrl,
        timestamp: new Date(),
      };

      gearData.postGear(newGear)
        .then((fbResponse) => {
          const newGearId = fbResponse.data.name;
          this.createNewGearSeasonRecord(newGearId);
          this.createNewGearPartyRecord(newGearId);
          this.props.history.push('/gear');
        })
        .catch((err) => console.error('unable to save new gear', err));
    }
  }

  render() {
    const {
      gearItem,
      gearBrand,
      gearModel,
      gearDetails,
      gearEstCampsite,
      gearAvailable,
      gearManYr,
      gearExpYr,
      gearWeight,
      gearFunction,
      gearWeather,
      gearImageUrl,
      functionsList,
      weatherList,
      seasonsList,
      partyList,
    } = this.state;

    const buildFunctionsList = () => functionsList.map((functionValue) => (
      <option key={functionValue.id} value={functionValue.id}>{functionValue.name}</option>
    ));

    const buildWeatherList = () => weatherList.map((weatherValue) => (
      <option key={weatherValue.id} value={weatherValue.id}>{weatherValue.name}</option>
    ));

    const buildSeasonsList = () => seasonsList.map((seasonValue) => (
      <div className="form-check col-md-2" key={seasonValue.id}>
        <input
          className="form-check-input gearSeasonCheckbox"
          type="checkbox"
          name="gearSeason"
          id={seasonValue.id}
          value={seasonValue.id}
          onChange={this.changeGearSeason}
        />
        <label className="form-check-label" htmlFor={seasonValue.id}>
          {seasonValue.name}
        </label>
      </div>
    ));

    const buildPartyList = () => partyList.map((partyValue) => (
      <div className="form-check col-md-2" key={partyValue.id}>
        <input
          className="form-check-input"
          type="checkbox"
          name="gearParty"
          id={partyValue.id}
          value={partyValue.id}
          onChange={this.changeGearParty}
        />
        <label className="form-check-label" htmlFor={partyValue.id}>
          {partyValue.name}
        </label>
      </div>
    ));

    return (
      <div className="NewGear col-12 pageDisplay">
        <h1 className="heading textShadow">Track a New Piece of Gear</h1>

        <form className="mt-5">
        <div className="container col-12 mb-3 inputBorder">
            <p className="question">Required Information</p>
            <div
              className="row justify-content-around"
            >
              <div className="form-group col-md-4">
                <label htmlFor="gear-function" className="question">Function</label>
                <select
                  className="form-control"
                  id="gear-function"
                  value={gearFunction}
                  onChange={this.changeGearFunction}
                >
                  {/* This is the list of function values from Firebase: */}
                  { buildFunctionsList() }
                </select>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="gear-item" className="question">Item</label>
                <input
                  type="text"
                  className="form-control"
                  id="gear-item"
                  placeholder="What is it?"
                  value={gearItem}
                  onChange={this.changeGearItem}
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="gear-brand" className="question">Brand</label>
                <input
                type="text"
                className="form-control"
                id="gear-brand"
                placeholder="Who made it?"
                value={gearBrand}
                onChange={this.changeGearBrand}
              />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-4">
            <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="gear-available"
                  value={gearAvailable}
                  onChange={this.changeGearAvailable}
                />
                <label className="form-check-label question" htmlFor="gear-available">Is it available?</label>
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="gear-estCampsite"
                  value={gearEstCampsite}
                  onChange={this.changeGearEstCampsite}
                />
                <label className="form-check-label question" htmlFor="gear-estCampsite">Can it be used only at an established campsite?</label>
              </div>
              <div className="form-group">
                <label htmlFor="gear-model" className="question">Model</label>
                <input
                  type="text"
                  className="form-control"
                  id="gear-model"
                  placeholder="What type?"
                  value={gearModel}
                  onChange={this.changeGearModel}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gear-details" className="question">Details</label>
                <textarea
                  className="form-control"
                  id="gear-details"
                  rows="3"
                  placeholder="What do you like about it?"
                  value={gearDetails}
                  onChange={this.changeGearDetails}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="gear-image" className="question">Photo URL</label>
                <input
                  type="text"
                  className="form-control"
                  id="gear-image"
                  placeholder="Take a pic!"
                  value={gearImageUrl}
                  onChange={this.changeGearImageUrl}
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="gear-manYr" className="question">Manufacture Year</label>
                <input
                  type="number"
                  className="form-control"
                  id="gear-manYr"
                  placeholder="When was it made?"
                  value={gearManYr}
                  onChange={this.changeGearManYr}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gear-expYr" className="question">Expiration Year</label>
                <input
                  type="number"
                  className="form-control"
                  id="gear-expYr"
                  placeholder="When do you think you will need to replace it?"
                  value={gearExpYr}
                  onChange={this.changeGearExpYr}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gear-weight" className="question">What is the weight? (in grams)</label>
                <input
                  type="number"
                  className="form-control"
                  id="gear-weight"
                  placeholder="How much does it weigh?"
                  value={gearWeight}
                  onChange={this.changeGearWeight}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gear-weather" className="question">Weather</label>
                <select
                  className="form-control"
                  id="gear-weather"
                  value={gearWeather}
                  onChange={this.changeGearWeather}
                >
                  {/* The list of weather values from Firebase gets displayed here! */}
                  {buildWeatherList()}
                </select>
              </div>
            </div>
          </div>

          {/* This is the row of radio buttons for the Seasons collection. */}
          <div className="container col-12 inputBorder">
            <p className="question">Season: Will you use this item all the time or only during a specific season?</p>
            <div
              className="row justify-content-center p-3"
            >
              { buildSeasonsList() }
            </div>
          </div>

{/* This is the row of radio buttons for the Party collection. */}
          <div className="container col-12 inputBorder">
            <p className="question">Party: Will you use this item all the time or only when going as a couple, with the family, or solo?</p>
            <div className="row justify-content-center p-3">
              { buildPartyList() }
            </div>
          </div>

          <button type="submit" className="btn greenButtons" onClick={this.saveNewGear}>Save New Gear</button>
          <Link className="btn redButtons" to='/gear'>Cancel</Link>
        </form>

      </div>
    );
  }
}

export default NewGear;
