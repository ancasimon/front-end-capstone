import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Auth from '../components/pages/Auth/Auth';
import EditGear from '../components/pages/EditGear/EditGear';
import Gear from '../components/pages/Gear/Gear';
import Home from '../components/pages/Home/Home';
import NewGear from '../components/pages/NewGear/NewGear';
import SingleGear from '../components/pages/SingleGear/SingleGear';

import MyNavbar from '../components/shared/MyNavbar/MyNavbar';

import fbConnection from '../helpers/data/connection';

import './App.scss';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed} />
              <div className="container">
                <div className="row">
                  <Switch>
                    <PrivateRoute path='/home' component={Home} authed={authed} />
                    <PrivateRoute path='/gear/edit/:gearItemId' component={EditGear} authed={authed} />
                    <PrivateRoute path='/gear/new' component={NewGear} authed={authed} />
                    <PrivateRoute path='/gear/:gearItemId' component={SingleGear} authed={authed} />
                    <PrivateRoute path='/gear' component={Gear} authed={authed} />

                    <PublicRoute path='/auth' component={Auth} authed={authed} />

                    <Redirect from="*" to='/home' />
                  </Switch>
                </div>
              </div>

          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
