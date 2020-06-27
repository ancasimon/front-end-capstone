import React from 'react';
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

import authData from '../../../helpers/data/authData';
import functionsData from '../../../helpers/data/functionsData';
import gearData from '../../../helpers/data/gearData';
import partyData from '../../../helpers/data/partyData';
import seasonsData from '../../../helpers/data/seasonsData';
import smashData from '../../../helpers/data/smashData';

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
  }

  toggleAccordion = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  toggleDropdownFunction = () => {
    this.setState({ dropdownFunctionOpen: !this.state.dropdownFunctionOpen });
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

  getGear = () => {
    const uid = authData.getUid();
    gearData.getGearByUid(uid)
      .then((gear) => this.setState({ gear }))
      .catch((err) => console.error('could not get gear from firebase', err));
  }

  componentDidMount() {
    this.getFunctionsList();
    this.getPartyList();
    this.getSeasonsList();
    this.getGear();
  }

  removeGearItem = (gearId) => {
    smashData.completelyRemoveGearItemAndChildren(gearId)
      .then(() => this.getGear())
      .catch((err) => console.log('could not delete this gear item', err));
  }

  render() {
    const {
      gear,
      isOpen,
      dropdownFunctionOpen,
      dropdownPartyOpen,
      dropdownSeasonOpen,
      dropdownExpYearOpen,
      functionsList,
      partyList,
      seasonsList,
    } = this.state;

    const buildFunctionsList = () => functionsList.map((functionValue) => (
      <DropdownItem key={functionValue.id} value={functionValue.id}>{functionValue.name}</DropdownItem>
    ));

    const buildPartyList = () => partyList.map((partyValue) => (
      <DropdownItem key={partyValue.id} value={partyValue.id}>{partyValue.name}</DropdownItem>
    ));

    const buildSeasonsList = () => seasonsList.map((seasonValue) => (
      <DropdownItem key={seasonValue.id} value={seasonValue.id}>{seasonValue.name}</DropdownItem>
    ));

    const buildYearsList = () => {
      const year = 2000;
      return (
        Array.from(new Array(50), (v, i) => (
          <DropdownItem key={i} value={year + i}>{year + i}</DropdownItem>
        ))
      );
    };

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
            <div className="row">
              <div className="col-sm-3">
                <Dropdown isOpen={dropdownFunctionOpen} toggle={this.toggleDropdownFunction}>
                  <DropdownToggle caret className="blueButtons p-1">
                    By Function
                    </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Clear Filter</DropdownItem>
                    <DropdownItem divider />
                    {buildFunctionsList()}
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="col-sm-3">
                <Dropdown isOpen={dropdownPartyOpen} toggle={this.toggleDropdownParty}>
                  <DropdownToggle caret className="blueButtons p-1">
                    By Party
                    </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Clear Filter</DropdownItem>
                    <DropdownItem divider />
                    {buildPartyList()}
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="col-sm-3">
                <Dropdown isOpen={dropdownSeasonOpen} toggle={this.toggleDropdownSeason}>
                  <DropdownToggle caret className="blueButtons p-1">
                    By Season
                    </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Clear Filter</DropdownItem>
                    <DropdownItem divider />
                    {buildSeasonsList()}
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="col-sm-3">
                <Dropdown isOpen={dropdownExpYearOpen} toggle={this.toggleDropdownExpYear}>
                  <DropdownToggle caret className="blueButtons p-1">
                    By Expiration Year
                    </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Clear Filter</DropdownItem>
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
              <th className="d-none d-sm-table-cell">Image</th>
              <th>Brand</th>
              <th className="d-none d-sm-table-cell">Model</th>
              <th className="d-none d-sm-table-cell">Function</th>
              <th className="d-none d-sm-table-cell">Seasons</th>
              <th className="d-none d-sm-table-cell">Weather</th>
              <th className="d-none d-sm-table-cell">Party</th>
              {/* <th>Weight (gr.)</th> */}
              <th className="d-none d-sm-table-cell">Available?</th>
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
