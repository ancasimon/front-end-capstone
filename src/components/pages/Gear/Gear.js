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
import gearData from '../../../helpers/data/gearData';
import smashData from '../../../helpers/data/smashData';

import '../../../styles/index.scss';
import './Gear.scss';

class Gear extends React.Component {
  state = {
    gear: [],
    isOpen: false,
    dropdownOpen: false,
    dropdownFunctionOpen: false,
    dropdownPartyOpen: false,
    dropdownSeasonOpen: false,
    dropdownExpYearOpen: false,
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

  getGear = () => {
    const uid = authData.getUid();
    gearData.getGearByUid(uid)
      .then((gear) => this.setState({ gear }))
      .catch((err) => console.error('could not get gear from firebase', err));
  }

  componentDidMount() {
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
      dropdownOpen,
      dropdownFunctionOpen,
      dropdownPartyOpen,
      dropdownSeasonOpen,
      dropdownExpYearOpen,
    } = this.state;

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
          <Button className="blueButtons" onClick={this.toggleAccordion}>Filter Your List</Button>
          <Collapse className="m-2" isOpen={isOpen}>
            <div className="row">
              <div className="col-sm-3">
                <Dropdown isOpen={dropdownFunctionOpen} toggle={this.toggleDropdownFunction}>
                  <DropdownToggle caret>
                    By Function
                    </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Clear Filter</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Foo Action</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="col-sm-3">
                <Dropdown isOpen={dropdownPartyOpen} toggle={this.toggleDropdownParty}>
                  <DropdownToggle caret>
                    By Party
                    </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Clear Filter</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Foo Action</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="col-sm-3">
                <Dropdown isOpen={dropdownSeasonOpen} toggle={this.toggleDropdownSeason}>
                  <DropdownToggle caret>
                    By Season
                    </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Clear Filter</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Foo Action</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="col-sm-3">
                <Dropdown isOpen={dropdownExpYearOpen} toggle={this.toggleDropdownExpYear}>
                  <DropdownToggle caret>
                    By Expiration Year
                    </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Clear Filter</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Foo Action</DropdownItem>
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
