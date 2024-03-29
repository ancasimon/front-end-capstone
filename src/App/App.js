import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import About from '../components/pages/About/About';
import Auth from '../components/pages/Auth/Auth';
import EditGear from '../components/pages/EditGear/EditGear';
import EditTrip from '../components/pages/EditTrip/EditTrip';
import Footer from '../components/shared/Footer/Footer';
import Gear from '../components/pages/Gear/Gear';
import Home from '../components/pages/Home/Home';
import NewGear from '../components/pages/NewGear/NewGear';
import NewTrip from '../components/pages/NewTrip/NewTrip';
import Reports from '../components/pages/Reports/Reports';
import SingleGear from '../components/pages/SingleGear/SingleGear';
import SingleTrip from '../components/pages/SingleTrip/SingleTrip';
import Trips from '../components/pages/Trips/Trips';

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

                    <PrivateRoute path='/reports' component={Reports} authed={authed} />

                    <PrivateRoute path='/trips/edit/:tripId' component={EditTrip} authed={authed} />
                    <PrivateRoute path='/trips/new' component={NewTrip} authed={authed} />
                    <PrivateRoute path='/trips/:tripId' component={SingleTrip} authed={authed} />
                    <PrivateRoute path='/trips' component={Trips} authed={authed} />

                    <Route path='/about' component={About} authed={authed} />
                    <PublicRoute path='/auth' component={Auth} authed={authed} />

                    <Redirect from="*" to='/home' />
                  </Switch>
                </div>
              </div>

          </React.Fragment>
        </BrowserRouter>

        <Footer />

      </div>
    );
  }
}

export default App;
