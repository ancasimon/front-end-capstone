import React from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import smashData from '../../../helpers/data/smashData';

import './SingleGear.scss';

class SingleGear extends React.Component {
  state = {
    gearItem: {},
    gearFunction: {},
    gearWeather: {},
    gearSeasons: [],
    gearParties: [],
    currentpath: '',
    gearTrips: [],
  }

  buildSingleView = () => {
    const { gearItemId } = this.props.match.params;
    smashData.getGearWithProperties(gearItemId)
      .then((response) => this.setState({
        gearItem: response,
        gearFunction: response.selectedFunction,
        gearWeather: response.selectedWeather,
        gearSeasons: response.selectedGearSeasons,
        gearParties: response.selectedGearParties,
        currentpath: this.props.location.pathname,
        gearTrips: response.priorTrips,
      }))
      .catch((err) => console.error('unable to get gear record', err));
  }

  componentDidMount() {
    const { gearItemId } = this.props.match.params;
    this.buildSingleView(gearItemId);
  }

  removeGearItem = () => {
    const { gearItemId } = this.props.match.params;
    smashData.completelyRemoveGearItemAndChildren(gearItemId)
      .then(() => this.props.history.push('/gear'))
      .catch((err) => console.error('unable to delete this gear record', err));
  }

  deleteConfirmationMessage = (gearId) => {
    const { gearItemId } = this.props.match.params;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#32471E',
      cancelButtonColor: '#8b0000',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success',
        );
        this.removeGearItem(gearItemId);
      }
    });
  }

  render() {
    const {
      gearItem,
      gearFunction,
      gearWeather,
      gearSeasons,
      gearParties,
      currentpath,
      gearTrips,
    } = this.state;

    const { gearItemId } = this.props.match.params;

    // Note: I used the editLink variable below initially when this is all I had to pass down to the Edit Page component. Once I wantted to make changes to return the user to the exact page that he left when he staretd editing, then I had to pass 2 pieces of info - this route as well as the path they came from - so newroute replaced and included the edit path - hence the variable below was no longer needed.
    // const editLink = `/gear/edit/${gearItemId}`;

    const newRoute = { pathname: `/gear/edit/${gearItemId}`, previouspath: { currentpath } };

    return (
      <div className="SingleGear col-12 pageDisplay mt-5">
        <h1 className="heading textShadow">Details about your <span className="caps">{gearItem.item}</span> ( {gearItem.brand} - {gearItem.model} ) </h1>

        <div className="row justify-content-center">
          <Link to='/gear' className="btn btn-lg blueButtons col-sm-2 p-1"><i className="fas fa-chevron-left"></i></Link>
        </div>

        <div className="container col-12">
          <div className="row">
            <div className="col-sm">
              <img className="gearSinglePhoto photoBorder" src={gearItem.imageUrl} alt={gearItem.item} />
              <h5 className="mt-5 question">Trips it's been on:</h5>
              {
                gearTrips.length == 0
                  ? <p>None yet!</p>
                  : <div className="col-sm align-middle">{gearTrips.map((trip) => <div className="row justify-content-center" key={trip.id}>{trip.destination}</div>)}</div>
              }
            </div>

            <div className="col-sm">
              <div className="row p-2">
                <h6 className="col-sm align-middle question">Function: </h6>
                <p className="col-sm align-middle"><img className="gearIcon pr-2" src={gearFunction.imageUrl} alt={gearFunction.name} />{gearFunction.name}</p>
              </div>

              <div className="row p-2">
                <h6 className="col-sm align-middle question">Seasons: </h6>
                {
                  gearSeasons
                    ? <div className="col-sm align-middle">{gearSeasons.map((item) => <div className="row justify-content-center" key={item.id}><img className="gearIcon pr-2" src={item.imageUrl} alt={item.name} />{item.name}</div>)}</div>
                    : <p className="col-sm align-middle">N/A</p>
                }
              </div>

              <div className="row p-2">
                <h6 className="col-sm align-middle question">Weather: </h6>
                <p className="col-sm align-middle"><img className="gearIcon pr-2" src={gearWeather.imageUrl} alt={gearWeather.name} />   {gearWeather.name}</p>
              </div>

              <div className="row p-2">
                <h6 className="col-sm align-middle question">Parties: </h6>
                {
                  gearParties
                    ? <div className="col-sm align-middle">{gearParties.map((item) => <div className="row justify-content-center" key={item.id}><img className="gearIcon pr-2" src={item.imageUrl} alt={item.name} />   {item.name}</div>)}</div>
                    : <p className="col-sm align-middle">N/A</p>
                }
              </div>

              <div className="row p-2">
                <h6 className="col-sm align-middle question">Weight: </h6>
                <h6 className="col-sm align-middle">{gearItem.weightInGrams * 1 } grams</h6>
              </div>

              <div className="row p-2">
                <h6 className="col-sm align-middle question">Can you use it only at established campsites? </h6>{ gearItem.forEstablishedCampsite ? <p className="col-sm align-middle">Indeed!</p> : <p className="col-sm align-middle">Nope, you can use it anytime, anywhere!</p> }
              </div>

              <div className="row p-2">
                <h6 className="col-sm align-middle question">Available? </h6>{ gearItem.isAvailable ? <p className="col-sm align-middle">Ready to go!</p> : <p className="col-sm align-middle">Sorry, you killed it a long time ago!</p> }
              </div>

              <div className="row p-2">
                <h6 className="col-sm align-middle question">Year when it was made: </h6><p className="col-sm align-middle"> {gearItem.manufactureYear}</p>
              </div>

              <div className="row p-2">
                <h6 className="col-sm align-middle question">Year when you may have to replace it: </h6><p className="col-sm align-middle"> {gearItem.expirationYear}</p>
              </div>

              <div className="row p-2">
                <h6 className="col-sm align-middle question">Details: </h6><p className="col-sm align-middle"> {gearItem.details}</p>
              </div>

            </div>
          </div>

        {/* <div className="row justify-content-center col-12">
          <h4>{gearItem.brand}</h4> - <h4>{gearItem.model}</h4>
        </div> */}

          <div className="row col-12 justify-content-center">
            <Link to={newRoute} className="btn btn-lg greenButtons col-sm-2 p-1"><i className="fas fa-pencil-alt"></i></Link>
            <button className="btn btn-lg redButtons col-sm-2 pointerHand p-1" onClick={this.deleteConfirmationMessage}><i className="fas fa-trash-alt"></i></button>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleGear;
