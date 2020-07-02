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
  // Added a callback in toggle below so that the page loads only after and as soon as we get the new toggle value.

  toggleAvailableSwitch = (e) => {
    console.log('e when toggling', e);
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
// ANCA - FROM SAMUEL'S EX: ADDED A NEW OBJECT FOR ALL

  getFunctionsList = () => {
    functionsData.getFunctions()
      .then((functionsList) => {
        const allFunctionsValue = {
          id: functionsList.length + 1,
          name: 'All',
          imageUrl: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/svgs/solid/universal-access.svg',
        };
        functionsList.push(allFunctionsValue);
        this.setState({ functionsList });
        console.log('func list with new ALL value');
      })
      .catch((err) => console.error('unable to get list of function values', err));
  }

  // ANCA - FROM SAMUEL'S EX: set the value for the selected function;

  getWeatherList = () => {
    weatherData.getWeatherValues()
      .then((weatherList) => {
        const allWeatherValue = {
          id: weatherList.length + 1,
          name: 'All',
          imageUrl: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/svgs/solid/universal-access.svg',
        };
        weatherList.push(allWeatherValue);
        this.setState({ weatherList });
        console.log('weather list with new ALL value');
      })
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

  setFunction = (value) => this.setState({ selectedFunction: value });

  setWeather = (value) => this.setState({ selectedWeather: value });

  setExpYear = (value) => this.setState({ selectedExpYear: value });

  getGear = () => {
    const uid = authData.getUid();
    gearData.getGearByUid(uid)
      .then((gear) => this.setState({ gear }))
      .catch((err) => console.error('could not get gear from firebase', err));
  }

  getAvailableGear = () => {
    const uid = authData.getUid();
    gearData.getGearByUid(uid)
      .then((gear) => {
        const availableFilteredGearItemsOnly = gear.filter((gearItem) => gearItem.isAvailable === true && gearItem.functionId === this.state.selectedFunction && gearItem.weatherId === this.state.selectedWeather && gearItem.expirationYear === this.state.selectedExpYear).sort((a, b) => moment(b.timestamp).format('YYYYMMDD') - moment(a.timestamp).format('YYYYMMDD'));
        this.setState({ gear: availableFilteredGearItemsOnly });
        console.log('available gear only???', gear);
      })
      .catch((err) => console.error('could not get only available gear from firebase', err));
  }

  getUnavailableGear = () => {
    const uid = authData.getUid();
    gearData.getGearByUid(uid)
      .then((gear) => {
        const unavailableFilteredGearItems = gear.filter((gearItem) => gearItem.isAvailable === false && gearItem.functionId === this.state.selectedFunction && gearItem.weatherId === this.state.selectedWeather && gearItem.expirationYear === this.state.selectedExpYear).sort((a, b) => moment(b.timestamp).format('YYYYMMDD') - moment(a.timestamp).format('YYYYMMDD'));
        this.setState({ gear: unavailableFilteredGearItems });
        console.log('UNavailable gear only???', gear);
      })
      .catch((err) => console.error('could not get only available gear from firebase', err));
  }

  // filterAll = (gear) => {
  //   let searchMatch = false;
  //   let functionCheck = false;
  //   let weatherCheck = false;
  //   let expYearCheck = false;

  //   const { selectedFunction, selectedWeather, selectedExpYear } = this.state;

  //   if (selectedFunction.name !== "All") {}
  // }

  // filterAllFunction = (functionId, weatherId, yearValue) => {
  //   const { selectedFunction } = this.state;
  //   // this.setState({ selectedFunction: functionId, selectedWeather: weatherId, selectedExpYear: yearValue });
  //   console.log('running filter all function!!!!');
  //   console.log('sel function in filter all', selectedFunction);
  //   // console.log('sel weather in filter all', selectedWeather);
  //   // console.log('sel exp year in filter all', selectedExpYear);
  //   // console.log('e', e);
  //   const uid = authData.getUid();
  //   gearData.getGearByUid(uid)
  //     .then((fbData) => {
  //       const filteredlist = fbData.filter((gearItem) => gearItem.functionId === this.state.selectedFunction && gearItem.weatherId === this.state.selectedWeather && gearItem.expirationYear === this.state.selectedExpYear);
  //       this.setState({ gear: filteredlist });
  //       filteredlist.map((gearItem) => (
  //     <GearItem key={gearItem.id} gearItem={gearItem} removeGearItem={this.removeGearItem} />
  //       ));
  //     })
  //     .catch((err) => console.error('could not get gear for filtering from firebase', err));
  // };

  buildGearPage = () => {
    console.log('running buildGearPage');
    const { valueAvailable } = this.state;
    this.getFunctionsList();
    console.log('current func list', this.state.functionsList);
    this.getWeatherList();
    this.getPartyList();
    this.getSeasonsList();
    // console.log('e when calling gear data', e);
    if (valueAvailable === true) {
      this.getAvailableGear();
    } else {
      this.getUnavailableGear();
    }
  }

  componentDidMount() {
    this.buildGearPage();
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

    // const filterByFunction = (functionId) => {
    //   this.setState({ selectedFunction: functionId });
    //   const uid = authData.getUid();
    //   gearData.getGearByUid(uid)
    //     .then((fbData) => {
    //       const filteredlist = fbData.filter((gearItem) => gearItem.functionId === this.state.selectedFunction);
    //       this.setState({ gear: filteredlist });
    //       gear.map((gearItem) => (
    //     <GearItem key={gearItem.id} gearItem={gearItem} removeGearItem={this.removeGearItem} />
    //       ));
    //     })
    //     .catch((err) => console.error('could not get gear for filtering from firebase', err));
    // };

    // const filterByWeather = (weatherId) => {
    //   this.setState({ selectedWeather: weatherId });
    //   const uid = authData.getUid();
    //   gearData.getGearByUid(uid)
    //     .then((fbData) => {
    //       const filteredlist = fbData.filter((gearItem) => gearItem.weatherId === this.state.selectedWeather);
    //       this.setState({ gear: filteredlist });
    //       gear.map((gearItem) => (
    //     <GearItem key={gearItem.id} gearItem={gearItem} removeGearItem={this.removeGearItem} />
    //       ));
    //     })
    //     .catch((err) => console.error('could not get gear for filtering by weather from firebase', err));
    // };

    // const filterByYear = (yearValue) => {
    //   this.setState({ selectedExpYear: yearValue });
    //   const uid = authData.getUid();
    //   gearData.getGearByUid(uid)
    //     .then((fbData) => {
    //       const filteredlist = fbData.filter((gearItem) => gearItem.expirationYear === this.state.selectedExpYear);
    //       this.setState({ gear: filteredlist });
    //       gear.map((gearItem) => (
    //         <GearItem key={gearItem.id} gearItem={gearItem} removeGearItem={this.removeGearItem} />
    //       ));
    //     })
    //     .catch((err) => console.error('could not filter data by exp year', err));
    // };

    // const buildFunctionsList = () => functionsList.map((functionValue) => (
    //   <DropdownItem key={functionValue.id} value={functionValue.id} onClick={() => filterByFunction(functionValue.id)}>{functionValue.name}</DropdownItem>
    // ));

    // const buildWeatherList = () => weatherList.map((weatherValue) => (
    //   <DropdownItem key={weatherValue.id} value={weatherValue.id} onClick={() => filterByWeather(weatherValue.id)}>{weatherValue.name}</DropdownItem>
    // ));
    // ANCA - from Samuel's examlple; mayeb onClickc alsl the setFunction value instead of the filter funciton - and then we call tthe filter every time??
  
    const buildFunctionsList = () => functionsList.map((functionValue) => (
      <DropdownItem key={functionValue.id} value={functionValue.id} onClick={() => this.setFunction(functionValue.id)}>{functionValue.name}</DropdownItem>
    ));

    // const buildFunctionsList = () => functionsList.map((functionValue) => (
    //   <DropdownItem key={functionValue.id} value={functionValue.id} onClick={() => filterAllFunction(selectedFunction, selectedWeather, selectedExpYear)}>{functionValue.name}</DropdownItem>
    // ));

    const buildWeatherList = () => weatherList.map((weatherValue) => (
      <DropdownItem key={weatherValue.id} value={weatherValue.id} onClick={() => this.setWeather(weatherValue.id)}>{weatherValue.name}</DropdownItem>
    ));
  
    const buildPartyList = () => partyList.map((partyValue) => (
      <DropdownItem key={partyValue.id} value={partyValue.id}>{partyValue.name}</DropdownItem>
    ));

    const buildSeasonsList = () => seasonsList.map((seasonValue) => (
      <DropdownItem key={seasonValue.id} value={seasonValue.id}>{seasonValue.name}</DropdownItem>
    ));

    // const buildYearsList = () => {
    //   const year = 2015;
    //   return (
    //     Array.from(new Array(20), (v, i) => (
    //      this.setState({ yearsList: Array }),
    //      console.log('years list', yearsList),
    //     )
    //     )}
    //   // const yearsArray = Array.from(new Array(40), (v, i));
    //   // const all = '';
    //   // yearsArray.push(all);
    //   // this.setState({ yearsList: yearsArray });
    //   // this.state.yearsList.map((item) => (
    //   //   <DropdownItem key={item} value={year + i} onClick={() => this.setExpYear(year + i)}>{year + i}</DropdownItem>
    //   // ));
    // };

    const buildGearGrid = gear.map((gearItem) => (
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
                    <DropdownItem key={12345} value={''} onClick={() => this.setFunction('')}>All</DropdownItem>
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
                    {/* {buildWeatherList()} */}
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
                    {/* {buildYearsList()} */}
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
            {buildGearGrid}
        </Table>
      </div>
    );
  }
}

export default Gear;
