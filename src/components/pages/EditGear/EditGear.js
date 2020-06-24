import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import authData from '../../../helpers/data/authData';
import functionsData from '../../../helpers/data/functionsData';
import gearData from '../../../helpers/data/gearData';
import gearPartyData from '../../../helpers/data/gearPartyData';
import gearSeasonData from '../../../helpers/data/gearSeasonData';
import partyData from '../../../helpers/data/partyData';
import seasonsData from '../../../helpers/data/seasonsData';
import smashData from  '../../../helpers/data/smashData';
import weatherData from '../../../helpers/data/weatherData';

import '../../../styles/index.scss';
import './EditGear.scss';

class EditGear extends React.Component {
  state = {
    gearItem: '',
    gearBrand: '',
    gearModel: '',
    gearDetails: '',
    gearEstCampsite: false,
    gearAvailable: false,
    gearManYr: 2000,
    gearExpYr: 2050,
    gearWeight: 0,
    gearFunction: '',
    gearWeather: '',
    gearImageUrl: '',
    functionsList: [],
    weatherList: [],
    // seasonsList: [],
    // partyList: [],
    // gearSeasonsList: [],
    // gearPartyList: [],
    allPartiesWithChecks: [],
    allSeasonsWithChecks: [],
  }

  static propTypes = {
    previouspath: PropTypes.string,
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

  // getSeasonsList = () => {
  //   seasonsData.getSeasons()
  //     .then((seasonsList) => this.setState({ seasonsList }))
  //     .catch((err) => console.error('unable to get list of seasons', err));
  // }

  // getPartyList = () => {
  //   partyData.getPartyValues()
  //     .then((partyList) => this.setState({ partyList }))
  //     .catch((err) => console.error('unable to get list of parties', err));
  // }

  componentDidMount() {
    this.getFunctionsList();
    this.getWeatherList();
    // console.log('props', this.props);
    // console.log('this!!!', this);
    const editId = this.props.match.params.gearItemId;
    smashData.getGearWithProperties(editId)
      .then((fbResponse) => {
        const currentGear = fbResponse;
        console.log('curr gear', currentGear);
        this.setState({
          gearItem: currentGear.item,
          gearBrand: currentGear.brand,
          gearModel: currentGear.model,
          gearDetails: currentGear.details,
          gearEstCampsite: currentGear.forEstablishedCampsite,
          gearAvailable: currentGear.isAvailable,
          gearManYr: currentGear.manufactureYear,
          gearExpYr: currentGear.expirationYear,
          gearWeight: currentGear.weightInGrams,
          gearFunction: currentGear.functionId,
          gearWeather: currentGear.weatherId,
          gearImageUrl: currentGear.imageUrl,
          gearSeasonsList: currentGear.selectedSeasons,
          gearPartyList: currentGear.selectedParties,
          allPartiesWithChecks: currentGear.allPartiesWithChecks,
          allSeasonsWithChecks: currentGear.allSeasonsWithChecks,
        });
      })
      .catch((err) => console.error('could not get edit id', err));
  }

  changeGearSeason = (event) => {
    // const gearSeasonsArr = this.state.gearSeasonsList;
    const editId = this.props.match.params.gearItemId;
    const currentGearSeasonCheckedValue = event.target.checked;
    const currentSeasonId = event.target.id;
    const currentGearSeasonId = event.target.getAttribute('relatedgearseasonid');
    const currentGearId = event.target.getAttribute('relatedgearid');
    console.log('new checked value of target - after clicking it', currentGearSeasonCheckedValue);
    console.log('gearid', currentGearId);
    console.log('gearseasonid', currentGearSeasonId);
    console.log('seasonid', currentSeasonId);
    // console.log('whole e', event);
    if (currentGearSeasonCheckedValue === false) {
      // gearSeasonsArr.push(e.target.value);
      console.log('need to delete current gear season');
      console.log('gearSeasonId to be deleted', currentGearSeasonId);
      this.deleteGearSeasonRecord(currentGearSeasonId);
      // this.createNewGearSeasonRecord(this.editId);
    } else {
      console.log('need to create new gear season');
      console.log('gearId in creating new gear season function', editId);
      this.createNewGearSeasonRecord(editId, currentSeasonId);
      // console.log('current array', gearSeasonsArr);
      // const selSeasonIndex = gearSeasonsArr.indexOf(e.target.value);
      // console.log('index', selSeasonIndex);
      // gearSeasonsArr.splice(selSeasonIndex, 1);
      // console.log('updated array', gearSeasonsArr);
    // }
    // // this.setState({ gearSeasonsList: gearSeasonsArr });
    // console.log('state', this.state);
    }
  }

  createNewGearSeasonRecord = (gearId, seasonId) => {
    // const { gearSeasonsList } = this.state;
    // gearSeasonsList.forEach((seasonId) => {
    const newGearSeason = {
      gearId,
      seasonId,
    };
    console.log('new gearseason', newGearSeason);
    gearSeasonData.postGearSeason(newGearSeason)
      .then(() => console.log('created new gearseason'))
      .catch((err) => console.error('could not create new gearSeason record'));
  };

  deleteGearSeasonRecord = (gearSeasonId) => {
    gearSeasonData.deleteGearSeason(gearSeasonId)
      .then(() => console.log('deleted this gear season record', gearSeasonId))
      .catch((err) => console.error('could not delete the gear season record', err));
  }

  changeGearParty = (e) => {
    const gearPartyArr = this.state.allPartiesWithChecks;
    if (e.target.isChecked === true) {
      gearPartyArr.push(e.target.value);
    // if (e.target.checked) {
    //   gearPartyArr.push(e.target.value);
    } else {
      console.log('unchecked', e.target.value);
      const selPartyIndex = gearPartyArr.indexOf(e.target.value);
      console.log('index', selPartyIndex);
      gearPartyArr.splice(selPartyIndex, 1);
      console.log('updated party list', gearPartyArr);
    }
    this.setState({ gearPartyList: gearPartyArr });
    // ALSO figure out: was the checkbox checked before? if yes, run a delete when it gets unchecked; if not, run a create
    console.log('state', this.state);
  }

  createNewGearPartyRecord = (gearId) => {
    const { gearPartyList } = this.state;
    gearPartyList.forEach((partyId) => {
      const newGearParty = {
        gearId,
        partyId,
      };
      console.log('new gear party record', newGearParty);
      gearPartyData.postGearParty(newGearParty)
        .then(() => console.log('created new gearParty'))
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

  updateGear = (e) => {
    e.preventDefault();
    const { gearItemId } = this.props.match.params;
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

    const updatedGearItem = {
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
    };

    gearData.putGear(gearItemId, updatedGearItem)
      .then(() => {
        const { previouspath } = this.props.location;
        // this.createNewGearSeasonRecord(updatedGearId);
        // this.createNewGearPartyRecord(gearItemId);
        // console.log('created new gearparty record', this.createNewGearPartyRecord());
        previouspath === '/gear' ? this.props.history.push('/gear') : this.props.history.push(previouspath.currentpath);
      })
      .catch((err) => console.error('unable to save new gear', err));
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
      // seasonsList,
      // partyList,
      allPartiesWithChecks,
      allSeasonsWithChecks,
    } = this.state;

    const buildFunctionsList = () => functionsList.map((functionValue) => (
      <option key={functionValue.id} value={functionValue.id}>{functionValue.name}</option>
    ));

    const buildWeatherList = () => weatherList.map((weatherValue) => (
      <option key={weatherValue.id} value={weatherValue.id}>{weatherValue.name}</option>
    ));

    const buildSeasonsList = () => allSeasonsWithChecks.map((seasonValue) => (
      console.log('is gearSeason checked in seasons list', seasonValue),
      <div className="form-check col-2" key={seasonValue.id}>
        <input
          className="form-check-input gearSeasonCheckbox"
          type="checkbox"
          name="gearSeason"
          id={seasonValue.id}
          value={seasonValue.id}
          checked = {seasonValue.isChecked}
          relatedgearid={seasonValue.relatedGearId}
          relatedgearseasonid={seasonValue.relatedGearSeasonId}
          onChange={this.changeGearSeason}
        />
        <label className="form-check-label" htmlFor={seasonValue.id}>
          {seasonValue.name}
        </label>
      </div>
    ));

    const buildPartyList = () => allPartiesWithChecks.map((partyValue) => (
      <div className="form-check col-2" key={partyValue.id}>
        <input
          className="form-check-input"
          type="checkbox"
          name="gearParty"
          id={partyValue.id}
          value={partyValue.id}
          checked={partyValue.isChecked}
          onChange={this.changeGearParty}
        />
        <label className="form-check-label" htmlFor={partyValue.id}>
          {partyValue.name}
        </label>
      </div>
    ));

    return (
      <div className="NewGear col-12">
        <h1>Edit Your Gear</h1>
        <div>
          <img className="singleGearPhoto" src={gearImageUrl} alt={gearItem} />
        </div>

        <form>
{/* This is the row of radio buttons for the Seasons collection. */}
          <div className="container col-12 inputBorder">
            <p>Season: Is this to be used all the time or only during a specific season?</p>
            <div
              className="row justify-content-center p-3"
            >
              { buildSeasonsList() }
            </div>
          </div>

{/* This is the row of radio buttons for the Party collection. */}
          <div className="container col-12 inputBorder">
            <p>Party: Will you use this all the time or only when going as a couple, with the family, or solo?</p>
            <div className="row justify-content-center p-3">
              { buildPartyList() }
            </div>
          </div>

          <div className="row justify-content-center">
          <div className="col-sm-4">
          <div className="form-group">
            <label htmlFor="gear-item">Item</label>
            <input
              type="text"
              className="form-control"
              id="gear-item"
              placeholder="What is it?"
              value={gearItem}
              onChange={this.changeGearItem}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gear-brand">Brand</label>
            <input
            type="text"
            className="form-control"
            id="gear-brand"
            placeholder="Who made it?"
            value={gearBrand}
            onChange={this.changeGearBrand}
          />
          </div>
          <div className="form-group">
            <label htmlFor="gear-model">Model</label>
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
            <label htmlFor="gear-details">Details</label>
            <textarea
              className="form-control"
              id="gear-details"
              rows="3"
              placeholder="What do you like about it?"
              value={gearDetails}
              onChange={this.changeGearDetails}
            ></textarea>
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="gear-estCampsite"
              // value={gearEstCampsite}
              checked={gearEstCampsite}
              onChange={this.changeGearEstCampsite}
            />
            <label className="form-check-label" htmlFor="gear-estCampsite">Can it be used only at an established campsite?</label>
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="gear-available"
              checked={gearAvailable}
              onChange={this.changeGearAvailable}
            />
            <label className="form-check-label" htmlFor="gear-available">Is it available?</label>
          </div>
          </div>
          <div className="col-sm-4">
          <div className="form-group">
            <label htmlFor="gear-manYr">Manufacture Year</label>
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
            <label htmlFor="gear-expYr">Expiration Year</label>
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
            <label htmlFor="gear-weight">What is the weight? (in grams)</label>
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
            <label htmlFor="gear-function">Function</label>
            <select
              className="form-control"
              id="gear-function"
              value={gearFunction}
              onChange={this.changeGearFunction}
            >
              {/* NEED to get the list of function values from Firebase to display here! */}
              { buildFunctionsList() }
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="gear-weather">Weather</label>
            <select
              className="form-control"
              id="gear-weather"
              value={gearWeather}
              onChange={this.changeGearWeather}
            >
              {/* NEED to get the list of weather values from Firebase to display here! */}
              {buildWeatherList()}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="gear-image">Photo URL</label>
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
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.updateGear}>Save Your Changes</button>
          <Link className="btn btn-danger" to='/gear'>Cancel</Link>
        </form>

      </div>
    );
  }
}

export default EditGear;
