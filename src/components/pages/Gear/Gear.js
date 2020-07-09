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
    filteredList: [],
    filteredListByFunction: [],
    filteredListByWeather: [],
    filteredListByYear: [],
    // ANCA: CROSS-FILTERS attempt:
    functionFilter: false,
    weatherFilter: false,
    expYearFilter: false,
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
    // console.log('running buildGearPage');
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
    const { gear, filteredList } = this.state;
    gearData.getGearByUid(uid)
      .then((fbData) => {
        const availableFilteredGearItemsOnly = fbData.filter((gearItem) => gearItem.isAvailable === true).sort((a, b) => moment(b.timestamp).format('YYYYMMDD') - moment(a.timestamp).format('YYYYMMDD'));
        this.setState({ gear: availableFilteredGearItemsOnly, filteredList: availableFilteredGearItemsOnly });
      })
      .catch((err) => console.error('could not get only available gear from firebase', err));
  }

  getUnavailableGear = () => {
    const uid = authData.getUid();
    const { gear } = this.state;
    gearData.getGearByUid(uid)
      .then((fbData) => {
        const unavailableFilteredGearItems = fbData.filter((gearItem) => gearItem.isAvailable === false).sort((a, b) => moment(b.timestamp).format('YYYYMMDD') - moment(a.timestamp).format('YYYYMMDD'));
        this.setState({ gear: unavailableFilteredGearItems, filteredList: unavailableFilteredGearItems });
        // console.log('UNavailable gear only???', gear);
      })
      .catch((err) => console.error('could not get only available gear from firebase', err));
  }

  // > All the toggle change functions called by changes in the filters' selections are below:

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
  // >This is where the toggle functions for the filters ends.

  // ANCA: CROSS-FILTERS attempt:  - FROM SAMUEL'S EX: ADDED A NEW OBJECT FOR ALL
  // getFunctionsList = () => {
  //   functionsData.getFunctions()
  //     .then((functionsList) => {
  //       const allFunctionsValue = {
  //         id: functionsList.length + 1,
  //         name: 'All',
  //         imageUrl: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/svgs/solid/universal-access.svg',
  //       };
  //       functionsList.push(allFunctionsValue);
  //       this.setState({ functionsList });
  //       console.log('func list with new ALL value');
  //     })
  //     .catch((err) => console.error('unable to get list of function values', err));
  // }

  getFunctionsList = () => {
    functionsData.getFunctions()
      .then((functionsList) => this.setState({ functionsList }))
      .catch((err) => console.error('unable to get list of function values', err));
  }

  // ANCA: CROSS-FILTERS attempt: - FROM SAMUEL'S EX: set the value for the selected function;

  // getWeatherList = () => {
  //   weatherData.getWeatherValues()
  //     .then((weatherList) => {
  //       const allWeatherValue = {
  //         id: weatherList.length + 1,
  //         name: 'All',
  //         imageUrl: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/svgs/solid/universal-access.svg',
  //       };
  //       weatherList.push(allWeatherValue);
  //       this.setState({ weatherList });
  //       console.log('weather list with new ALL value');
  //     })
  //     .catch((err) => console.error('unable to get list of weather values', err));
  // }

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
      // ANCA: CROSS-FILTERS attempt:
      filteredList,
      functionFilter,
      weatherFilter,
      expYearFilter,
      filteredListByFunction,
      filteredListByWeather,
      filteredListByYear,
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

    // ANCA: CROSS-FILTERS attempt:
    const setFunctionFilterValue = (value) => {
      this.setState({ selectedFunction: value, functionFilter: true }, (() => {
        filterAll();
        console.log('filt list  in function filter call', filteredList);
      }));
    };
    // The function above will do 3 things: 1 - set the state for the boolean for this filter check 2 - set the state for selected function value chosen in the Function filter; ; 3 - run filterAll big function. (AND - in the filterAll: I will reset `gear` to state and then refilter it based on the boolean checks for each filter and then set the state for the `filteredList` array again and display that.

    // ANCA: CROSS-FILTERS attempt:
    const setWeatherFilterValue = (value) => {
      this.setState({ weatherFilter: true, selectedWeather: value }, (() => {
        filterAll();
        console.log('filt list  in weather filter call', filteredList);
      }));
    };

    // ANCA: CROSS-FILTERS attempt:
    const setExpYearFilterValue = (value) => {
      this.setState({ expYearFilter: true, selectedExpYear: value }, (() => {
        filterAll();
        console.log('filt list  in exp year filter call', filteredList);
      }));
    };

    // ANCA: CROSS-FILTERS attempt:
    const clearFunctionFilter = () => {
      this.setState({ functionFilter: false });
      filterAll();
    };

    // ANCA: CROSS-FILTERS attempt:
    const clearWeatherFilter = () => {
      this.setState({ weatherFilter: false });
      filterAll();
    };

    // ANCA: CROSS-FILTERS attempt:
    const clearExpYearFilter = () => {
      this.setState({ expYearFilter: false });
      filterAll();
    };

    const findCommonArray = () => {
      console.log('running commonArray check');
      const commonArray = [];
      for (let x = 0; x < filteredListByFunction.length; x += 1) {
        for (let y = 0; y < filteredListByWeather.length; y += 1) {
          for (let z = 0; z < filteredListByYear.length; z += 1) {
            if ((filteredListByFunction[x] === filteredListByWeather[y]) && (filteredListByFunction[x] === filteredListByYear[z])) {
              // if (filteredListByWeather[y].id === filteredListByFunction[x].id) {
              commonArray.push(filteredListByFunction[x]);
              console.log(filteredListByFunction[x]);
              console.log('common array', commonArray);
              this.setState({ filteredList: commonArray }, (() => console.log('filt list at the end of findcommonarray', filteredList)));
            }
            // } else {
            //   console.log('no filter results!!!!');
            // }
          }
        }
      }
      this.state.filteredList.map((gearItem) => (
        <GearItem key={gearItem.id} gearItem={gearItem} removeGearItem={this.removeGearItem} />
      ));
    };

    // ANCA - CROSS-Filteres plan as of July 9:
    // 1. When user clicks on a filter, we run the setXFilter funciton - which sets the appropriate boolean to true and grabs the selected value. And then runs the filterAll() function.
    // 2. filterAll() function sets the state of 3 new arrays I have declared in state to the filtered list array as it si currentrly - so that each of these arrays has all the items in them from the beginnign and hten get filtered if that specific boolean check is set to true; otherwise, each of these arrays should stay with all the gear data from filtered list.
    // 3. filterAll() checks if each of those filter booleans are true and for each one that is true,it runs a filter according to selected value and resets the filteredListByX array to the refiltered list!
    // 4. filtereAll() then runs the findCommonArray()funciton which goes through all  those 3 arrays and finds the commong gear objects and pushes  them into the commonArray list.
    // 5. Last - findCommonArray() resets filteredList from state to the  commonArray it found and  maps over the updated filteredList array in order to reprint the gear grid.
    // ISSUES!!!!!!!!!:
    // I cannot seem to be able to trigger a refresh of the UI after I reset a filter - for ex form weather2 to weather3 - the selected weather value changes in the components, but the UI does not get refreshed (this is even before I apply cross-filtering / just when I try to apply only one filter - like weather - and change values within it).


    // ANCA: CROSS-FILTERS attempt:
    const filterAll = () => {
      this.setState({ filteredListByFunction: filteredList, filteredListByWeather: filteredList, filteredListByYear: filteredList }, (() => console.log('filteredListByFunction', this.state.filteredListByFunction, 'filteredListByWeather', this.state.filteredListByWeather, 'filteredListByYear', this.state.filteredListByYear)));
      // gearData.getGearByUid(uid)
      //   .then((fbData) => {
      // if (functionFilter === true && weatherFilter === false && expYearFilter === false) {
      // const newFilteredList = fbData.filter((gearItem) => gearItem.functionId === this.state.selectedFunction);
      // this.setState({ gear: newFilteredList });
      // buildGearGrid();
      // gear.map((gearItem) => (
      //       <GearItem key={gearItem.id} gearItem={gearItem} removeGearItem={this.removeGearItem} />
      // ));
      if (this.state.functionFilter === true) {
        const filter1 = this.state.filteredList.filter((gearItem) => gearItem.functionId === this.state.selectedFunction);
        this.setState({ filteredListByFunction: filter1 }, (() => console.log('filt 1 list by function', this.state.filteredListByFunction)));
        findCommonArray();
      }

      if (this.state.weatherFilter === true) {
        const filter2 = this.state.filteredList.filter((gearItem) => gearItem.weatherId === this.state.selectedWeather || gearItem.weatherId === 'weather1');
        this.setState({ filteredListByWeather: filter2 }, (() => console.log('filt 2 list by weather', this.state.filteredListByWeather)));
        findCommonArray();
      }
      if (this.state.expYearFilter === true) {
        const filter3 = this.state.filteredList.filter((gearItem) => gearItem.expirationYear === this.state.selectedExpYear);
        this.setState({ filteredListByYear: filter3 }, (() => console.log('filt 3 list by exp year', this.state.filteredListByYear)));
        findCommonArray();
      }
      // findCommonArray();
      // const commonArray = [];
      // for (let x = 0; x < filteredListByFunction.length; x += 1) {
      //   for (let y = 0; y < filteredListByWeather.length; y += 1) {
      //     for (let z = 0; z < filteredListByYear.length; z += 1) {
      //       if ((filteredListByFunction[x] === filteredListByWeather[y]) && (filteredListByFunction[x] === filteredListByYear[z])) {
      //         // if (filteredListByWeather[y].id === filteredListByFunction[x].id) {
      //         commonArray.push(filteredListByFunction[x]);
      //         console.log(filteredListByFunction[x]);
      //         console.log('common array', commonArray);
      //         this.setState({ filteredList: commonArray }, ((
      //           console.log('filt list at the end of filterall', filteredList),
      //           this.state.filteredList.map((gearItem) => (
      //             <GearItem key={gearItem.id} gearItem={gearItem} removeGearItem={this.removeGearItem} />
      //           ))
      //         )));
      //         console.log('ran commonArray check');
      //       }
      //     }
      //   }
      // }

      // this.setState({ filteredList });
      // console.log('filt list at the end of filterall', filteredList);
      // filteredList.map((gearItem) => (
      //   <GearItem key={gearItem.id} gearItem={gearItem} removeGearItem={this.removeGearItem} />
      // ));
      // this.setState({ filteredList: commonArray });
      // console.log('common array', commonArray);
      // console.log('filteredlist after duplicates check', filteredList);

      // GREG SUGGESTION!!: every time this runs: get all the arrays and then check for duplicates - > if the object ID matches > return an array of duplicates!

      // this.state.filteredList.map((gearItem) => (
      //   <GearItem key={gearItem.id} gearItem={gearItem} removeGearItem={this.removeGearItem} />
      // ));
    };

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

    // INITIAL FUNCTION TO FILTER BY YEAR!!!! BEFORE CROSS-FILTERS ATTEMPT
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

    // ANCA: CROSS-FILTERS attempt:
    const buildFunctionsList = () => functionsList.map((functionValue) => (
      <DropdownItem key={functionValue.id} value={functionValue.id} onClick={() => setFunctionFilterValue(functionValue.id, true)}>{functionValue.name}</DropdownItem>
    ));

    // ANCA: CROSS-FILTERS attempt:
    const buildWeatherList = () => weatherList.map((weatherValue) => (
      <DropdownItem key={weatherValue.id} value={weatherValue.id} onClick={() => setWeatherFilterValue(weatherValue.id, true)}>{weatherValue.name}</DropdownItem>
    ));

    const buildPartyList = () => partyList.map((partyValue) => (
      <DropdownItem key={partyValue.id} value={partyValue.id}>{partyValue.name}</DropdownItem>
    ));

    const buildSeasonsList = () => seasonsList.map((seasonValue) => (
      <DropdownItem key={seasonValue.id} value={seasonValue.id}>{seasonValue.name}</DropdownItem>
    ));

    // ANCA: CROSS-FILTERS attempt:
    const buildYearsList = () => {
      const year = 2010;
      return (
        Array.from(new Array(40), (v, i) => (
          <DropdownItem key={i} value={year + i} onClick={() => setExpYearFilterValue(year + i)}>{year + i}</DropdownItem>
        ))
      );
    };

    // const buildYearsList = () => {
    //   const year = 2010;
    //   return (
    //     Array.from(new Array(40), (v, i) => (
    //       <DropdownItem key={i} value={year + i} onClick={() => filterByYear(year + i)}>{year + i}</DropdownItem>
    //     ))
    //   );
    // };

    const buildGearGrid = () => this.state.filteredList.map((gearItem) => (
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
                  {/* ANCA: CROSS-FILTERS attempt!  */}
                    <DropdownItem onClick={this.clearFunctionFilter}>All</DropdownItem>
                    {/* <DropdownItem onClick={this.buildGearPage}>Clear Filter</DropdownItem> */}
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
                  {/* ANCA: CROSS-FILTERS attempt! */}
                    <DropdownItem onClick={this.clearWeatherFilter}>Clear Filter</DropdownItem>
                    {/* <DropdownItem onClick={this.buildGearPage}>Clear Filter</DropdownItem> */}
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
                  {/* ANCA: CROSS-FILTERS attempt! */}
                    <DropdownItem onClick={this.clearExpYearFilter}>Clear Filter</DropdownItem>
                    {/* <DropdownItem onClick={this.buildGearPage}>Clear Filter</DropdownItem> */}
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
