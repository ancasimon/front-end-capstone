import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import PropTypes from 'prop-types';

import firebase from 'firebase/app';
import 'firebase/auth';

import logo from '../../../img-capstone/gearup_logo.png';
import '../../../styles/index.scss';
import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  state = {
    isOpen: false,
    logo,
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  logoutClickEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { isOpen } = this.state;

    const buildNavbar = () => {
      const { authed } = this.props;
      if (authed) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem className="NavItem">
              <NavLink tag={RRNavLink} to="/home">Home</NavLink>
            </NavItem>
            <NavItem className="NavItem">
              <NavLink tag={RRNavLink} to="/gear">Gear</NavLink>
            </NavItem>
            <NavItem className="NavItem">
              <NavLink tag={RRNavLink} to="/trips">Trips</NavLink>
            </NavItem>
            <NavItem className="NavItem">
              <NavLink tag={RRNavLink} to="/reports">Reports</NavLink>
            </NavItem>
            <NavItem className="NavItem">
              <NavLink tag={RRNavLink} to="/about">About Us</NavLink>
            </NavItem>
            <NavItem className="NavItem">
              <NavLink className="pointerHand" onClick={this.logoutClickEvent}>Log Out</NavLink>
            </NavItem>
          </Nav>
        );
      }
      return <Nav className="ml-auto" navbar>
        <NavItem className="NavItem">
          <NavLink className="pointerHand" onClick={this.loginClickEvent}>Log In</NavLink>
        </NavItem>
        <NavItem className="NavItem">
          <NavLink tag={RRNavLink} to="/about">About Us</NavLink>
        </NavItem>
      </Nav>;
    };

    return (
      <div className="MyNavbar">
        <Navbar className="nav pt-0 pb-0" dark expand="md">
          <NavbarBrand href="/">
          < img src={logo} width="75" alt="logo" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            { buildNavbar() }
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
