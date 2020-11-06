import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import {
  Button,
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
} from 'reactstrap';

import GearItem from '../../shared/GearItem/GearItem';
import Switch from '../../shared/Switch/Switch';

import authData from '../../../helpers/data/authData';
import functionsData from '../../../helpers/data/functionsData';
import gearData from '../../../helpers/data/gearData';
import partyData from '../../../helpers/data/partyData';
import seasonsData from '../../../helpers/data/seasonsData';
import smashData from '../../../helpers/data/smashData';
import weatherData from '../../../helpers/data/weatherData';

import '../../../styles/index.scss';
import './Gear.scss';

class Gear extends React.Component {
  state = {
    gear: [],
    isOpen: false,
    dropdownFunctionOpen: false,
    dropdownPartyOpen: false,
    dropdownSeasonOpen: false,
    dropdownExpYearOpen: false,
    functionsList: [],
    partyList: [],
    seasonsList: [],
    weatherList: [],
    yearsList: [],
    selectedFunction: '',
    selectedWeather: '',
    selectedExpYear: 0,
    valueAvailable: true,
  }

  componentDidMount() {
    this.buildGearPage();
  }

  buildGearPage = () => {
    const { valueAvailable } = this.state;
    this.getFunctionsList();
    this.getWeatherList();
    this.getPartyList();
    this.getSeasonsList();
    if (valueAvailable === true) {
      this.getAvailableGear();
    } else {
      this.getUnavailableGear();
    }
  }
  // Initial function I used to get all the gear to this page was getGear below:
  // getGear = () => {
  //   const uid = authData.getUid();
  //   gearData.getGearByUid(uid)
  //     .then((gear) => this.setState({ gear }))
  //     .catch((err) => console.error('could not get gear from firebase', err));
  // }

  getAvailableGear = () => {
    const uid = authData.getUid();
    const { gear } = this.state;
    gearData.getGearByUid(uid)
      .then((fbData) => {
        const availableFilteredGearItemsOnly = fbData.filter((gearItem) => gearItem.isAvailable === true).sort((a, b) => moment(b.timestamp).format('YYYYMMDD') - moment(a.timestamp).format('YYYYMMDD'));
        this.setState({ gear: availableFilteredGearItemsOnly });
      })
      .catch((err) => console.error('could not get only available gear from firebase', err));
  }

  getUnavailableGear = () => {
    const uid = authData.getUid();
    const { gear } = this.state;
    gearData.getGearByUid(uid)
      .then((fbData) => {
        const unavailableFilteredGearItems = fbData.filter((gearItem) => gearItem.isAvailable === false).sort((a, b) => moment(b.timestamp).format('YYYYMMDD') - moment(a.timestamp).format('YYYYMMDD'));
        this.setState({ gear: unavailableFilteredGearItems });
      })
      .catch((err) => console.error('could not get only available gear from firebase', err));
  }

  // All the toggle change functions called by changes in the filters' selections are below:

  toggleAvailableSwitch = (e) => {
    this.setState({ valueAvailable: e });
    this.getFunctionsList();
    this.getWeatherList();
    this.getPartyList();
    this.getSeasonsList();
    if (e === true) {
      this.getAvailableGear();
    } else {
      this.getUnavailableGear();
    }
  }

  toggleAccordion = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  toggleDropdownFunction = () => {
    this.setState({ dropdownFunctionOpen: !this.state.dropdownFunctionOpen });
  }

  toggleDropdownWeather = () => {
    this.setState({ dropdownWeatherOpen: !this.state.dropdownWeatherOpen });
  }

  toggleDropdownParty = () => {
    this.setState({ dropdownPartyOpen: !this.state.dropdownPartyOpen });
  }

  toggleDropdownSeason = () => {
    this.setState({ dropdownSeasonOpen: !this.state.dropdownSeasonOpen });
  }

  toggleDropdownExpYear = () => {
    this.setState({ dropdownExpYearOpen: !this.state.dropdownExpYearOpen });
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

  getPartyList = () => {
    partyData.getPartyValues()
      .then((partyList) => this.setState({ partyList }))
      .catch((err) => console.error('could not get list of parties', err));
  }

  getSeasonsList = () => {
    seasonsData.getSeasons()
      .then((seasonsList) => this.setState({ seasonsList }))
      .catch((err) => console.error('could not get list of seasons', err));
  }

  removeGearItem = (gearId) => {
    smashData.completelyRemoveGearItemAndChildren(gearId)
      .then(() => this.buildGearPage())
      .catch((err) => console.error('could not delete this gear item', err));
  }

  render() {
    const {
      gear,
      isOpen,
      dropdownFunctionOpen,
      dropdownWeatherOpen,
      dropdownPartyOpen,
      dropdownSeasonOpen,
      dropdownExpYearOpen,
      functionsList,
      weatherList,
      partyList,
      seasonsList,
      valueAvailable,
      selectedExpYear,
      selectedFunction,
      selectedWeather,
    } = this.state;

    const filterByFunction = (functionId) => {
      this.setState({ selectedFunction: functionId });
      const uid = authData.getUid();
      gearData.getGearByUid(uid)
        .then((fbData) => {
          if (this.state.valueAvailable === true) {
            const filteredlist = fbData.filter((gearItem) => gearItem.functionId === this.state.selectedFunction && gearItem.isAvailable === true).sort((a, b) => moment(b.timestamp).format('YYYYMMDD') - moment(a.timestamp).format('YYYYMMDD'));
            this.setState({ gear: filteredlist });
          } else {
            const filteredlist = fbData.filter((gearItem) => gearItem.functionId === this.state.selectedFunction && gearItem.isAvailable === false).sort((a, b) => moment(b.timestamp).format('YYYYMMDD') - moment(a.timestamp).format('YYYYMMDD'));
            this.setState({ gear: filteredlist });
          }
          // INITIAL CODE for the function filter - before I added the availability check into the mix - is below:
          // const filteredlist = fbData.filter((gearItem) => gearItem.functionId === this.state.selectedFunction);
          // this.setState({ gear: filteredlist });
          gear.map((gearItem) => (
        <GearItem key={gearItem.id} gearItem={gearItem} removeGearItem={this.removeGearItem} />
          ));
        })
        .catch((err) => console.error('could not get gear for filtering from firebase', err));
    };

    const filterByWeather = (weatherId) => {
      this.setState({ selectedWeather: weatherId });
      const uid = authData.getUid();
      gearData.getGearByUid(uid)
        .then((fbData) => {
          if (this.state.valueAvailable === true) {
            const filteredlist = fbData.filter((gearItem) => gearItem.weatherId === this.state.selectedWeather && gearItem.isAvailable === true).sort((a, b) => moment(b.timestamp).format('YYYYMMDD') - moment(a.timestamp).format('YYYYMMDD'));
            this.setState({ gear: filteredlist });
          } else {
            const filteredlist = fbData.filter((gearItem) => gearItem.weatherId === this.state.selectedWeather && gearItem.isAvailable === false).sort((a, b) => moment(b.timestamp).format('YYYYMMDD') - moment(a.timestamp).format('YYYYMMDD'));
            this.setState({ gear: filteredlist });
          }
          // INITIAL CODE for the weather filter - before I added the availability check into the mix - is below:
          // const filteredlist = fbData.filter((gearItem) => gearItem.weatherId === this.state.selectedWeather);
          // this.setState({ gear: filteredlist });
          gear.map((gearItem) => (
        <GearItem key={gearItem.id} gearItem={gearItem} removeGearItem={this.removeGearItem} />
          ));
        })
        .catch((err) => console.error('could not get gear for filtering by weather from firebase', err));
    };

    const filterByYear = (yearValue) => {
      this.setState({ selectedExpYear: yearValue });
      const uid = authData.getUid();
      gearData.getGearByUid(uid)
        .then((fbData) => {
          if (this.state.valueAvailable === true) {
            const filteredlist = fbData.filter((gearItem) => gearItem.expirationYear === this.state.selectedExpYear && gearItem.isAvailable === true).sort((a, b) => moment(b.timestamp).format('YYYYMMDD') - moment(a.timestamp).format('YYYYMMDD'));
            this.setState({ gear: filteredlist });
          } else {
            const filteredlist = fbData.filter((gearItem) => gearItem.expirationYear === this.state.selectedExpYear && gearItem.isAvailable === false).sort((a, b) => moment(b.timestamp).format('YYYYMMDD') - moment(a.timestamp).format('YYYYMMDD'));
            this.setState({ gear: filteredlist });
          }
          // INITIAL CODE for the year filter - before I added the availability check into the mix - is below:
          // const filteredlist = fbData.filter((gearItem) => gearItem.expirationYear === this.state.selectedExpYear);
          // this.setState({ gear: filteredlist });
          gear.map((gearItem) => (
            <GearItem key={gearItem.id} gearItem={gearItem} removeGearItem={this.removeGearItem} />
          ));
        })
        .catch((err) => console.error('could not filter data by exp year', err));
    };

    const buildFunctionsList = () => functionsList.map((functionValue) => (
      <DropdownItem key={functionValue.id} value={functionValue.id} onClick={() => filterByFunction(functionValue.id)}>{functionValue.name}</DropdownItem>
    ));

    const buildWeatherList = () => weatherList.map((weatherValue) => (
      <DropdownItem key={weatherValue.id} value={weatherValue.id} onClick={() => filterByWeather(weatherValue.id)}>{weatherValue.name}</DropdownItem>
    ));
  
    const buildPartyList = () => partyList.map((partyValue) => (
      <DropdownItem key={partyValue.id} value={partyValue.id}>{partyValue.name}</DropdownItem>
    ));

    const buildSeasonsList = () => seasonsList.map((seasonValue) => (
      <DropdownItem key={seasonValue.id} value={seasonValue.id}>{seasonValue.name}</DropdownItem>
    ));

    const buildYearsList = () => {
      const year = 2010;
      return (
        Array.from(new Array(40), (v, i) => (
          <DropdownItem key={i} value={year + i} onClick={() => filterByYear(year + i)}>{year + i}</DropdownItem>
        ))
      );
    };

    const buildGearGrid = () => gear.map((gearItem) => (
      <GearItem key={gearItem.id} gearItem={gearItem} removeGearItem={this.removeGearItem} />
    ));

    return (
      <div className="Gear col-12 pt-0 pageDisplay">
        <h1 className="heading textShadow">Check Out All Your Gear</h1>

        <div className="p-1 mt-1 d-flex flex-wrap justify-content-center">
          <Link to='gear/new' className="greenButtons mt-1"><i className="fas fa-plus"></i> Did you buy some new gear? Add it to your list!</Link>
        </div>

        {/* COLLAPSE ACCORDION FOR FILTERS BELOW */}
        <div>
          <Button className="blueButtons" onClick={this.toggleAccordion}>Filter your list</Button>
          <Collapse className="m-2" isOpen={isOpen}>

            <div className="row justify-content-center col-12">
                <div>
                  <div>Available gear only (by default):
                  <Switch
                  isOn={valueAvailable}
                  handleToggle={() => this.toggleAvailableSwitch(!valueAvailable)}
                  />
                  </div>
                </div>
            </div>

            <div className="row justify-content-center col-12">
              <div className="col-sm-4">
                <Dropdown isOpen={dropdownFunctionOpen} toggle={this.toggleDropdownFunction}>
                  <DropdownToggle caret className="blueButtons p-1">
                    By Function
                    </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.buildGearPage}>Clear Filter</DropdownItem>
                    <DropdownItem divider />
                    {buildFunctionsList()}
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="col-sm-4">
                <Dropdown isOpen={dropdownWeatherOpen} toggle={this.toggleDropdownWeather}>
                  <DropdownToggle caret className="blueButtons p-1">
                    By Weather
                    </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.buildGearPage}>Clear Filter</DropdownItem>
                    <DropdownItem divider />
                    {buildWeatherList()}
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="col-sm-4">
                <Dropdown isOpen={dropdownExpYearOpen} toggle={this.toggleDropdownExpYear}>
                  <DropdownToggle caret className="blueButtons p-1">
                    By Expiration Year
                    </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.buildGearPage}>Clear Filter</DropdownItem>
                    <DropdownItem divider />
                    {buildYearsList()}
                  </DropdownMenu>
                </Dropdown>
              </div>

            </div>
          </Collapse>
        </div>
        {/* COLLAPSE DIV ENDS HERE */}

        <Table hover>
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
              {/* <th>Weight (gr.)</th> */}
              <th className="d-none d-md-table-cell">Available?</th>
              {/* <th>Exp. Yr.</th> */}
              <th>Actions</th>
            </tr>
          </thead>
            {buildGearGrid()}
        </Table>
      </div>
    );
  }
}

export default Gear;
