import React from 'react';
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
  }

  buildSingleView = () => {
    console.log('props', this.props.match);
    const { gearItemId } = this.props.match.params;
    smashData.getGearWithProperties(gearItemId)
      .then((response) => this.setState({
        gearItem: response,
        gearFunction: response.function,
        gearWeather: response.weather,
        gearSeasons: response.seasons,
        gearParties: response.parties,
      }))
      .catch((err) => console.error('unable to get gear record', err));
  }

  componentDidMount() {
    const { gearItemId } = this.props.match.params;
    this.buildSingleView(gearItemId);
  }

  render() {
    const {
      gearItem,
      gearFunction,
      gearWeather,
      gearSeasons,
      gearParties,
    } = this.state;

    const { gearItemId } = this.props.match.params;

    const editLink = `/gear/edit/${gearItemId}`;

    return (
      <div className="SingleGear col-12">
        <h1>Details about your <span className="caps">{gearItem.item}</span>: {gearItem.brand} - {gearItem.model}</h1>

        <Link to='/gear' className="btn-lg btn-danger"><i className="far fa-window-close"></i></Link>

        <div className="container col-12">
          <div className="row">
            <div className="col-sm">
              <img className="gearSinglePhoto" src={gearItem.imageUrl} alt={gearItem.item} />
            </div>
            <div className="col-sm">
              <div className="row">
                <h6 className="col-sm align-middle">Function: </h6>
                <p className="col-sm align-middle"><img className="gearIcon" src={gearFunction.imageUrl} alt={gearFunction.name} />   {gearFunction.name}</p>
              </div>

              <div className="row">
                <h6 className="col-sm align-middle">Seasons: </h6>
                {
                  gearSeasons
                    ? <div className="col-sm align-middle">{gearSeasons.map((item) => <div className="row justify-content-center" key={item.id}><img className="gearIcon" src={item.imageUrl} alt={item.name} />{item.name}</div>)}</div>
                    : <p className="col-sm align-middle">N/A</p>
                }
              </div>

              <div className="row">
                <h6 className="col-sm align-middle">Weather: </h6>
                <p className="col-sm align-middle"><img className="gearIcon" src={gearWeather.imageUrl} alt={gearWeather.name} />   {gearWeather.name}</p>
              </div>

              <div className="row">
                <h6 className="col-sm align-middle">Parties: </h6>
                {
                  gearParties
                    ? <div className="col-sm align-middle">{gearParties.map((item) => <div className="row justify-content-center" key={item.id}><img className="gearIcon" src={item.imageUrl} alt={item.name} />   {item.name}</div>)}</div>
                    : <p className="col-sm align-middle">N/A</p>
                }
              </div>

              <div className="row">
                <h6 className="col-sm align-middle">Weight: </h6>
                <h6 className="col-sm align-middle">{gearItem.weightInGrams * 1 } grams</h6>
              </div>

              <div className="row">
                <h6 className="col-sm align-middle">Can you use it only at established campsites? </h6>{ gearItem.forEstablishedCampsite ? <p className="col-sm align-middle">Indeed!</p> : <p className="col-sm align-middle">Nope, can use it anytime anywhere!</p> }
              </div>

              <div className="row">
                <h6 className="col-sm align-middle">Available? </h6>{ gearItem.isAvailable ? <p className="col-sm align-middle">Ready to go!</p> : <p className="col-sm align-middle">Sorry, you killed it a long time ago!</p> }
              </div>

              <div className="row">
                <h6 className="col-sm align-middle">When it was made: </h6><p className="col-sm align-middle"> Year {gearItem.manufactureYear}</p>
              </div>

              <div className="row">
                <h6 className="col-sm align-middle">When you may have to replace it: </h6><p className="col-sm align-middle"> Year {gearItem.expirationYear}</p>
              </div>

            </div>
          </div>

        {/* <div className="row justify-content-center col-12">
          <h4>{gearItem.brand}</h4> - <h4>{gearItem.model}</h4>
        </div> */}

          <div className="row justify-content-center">
            <Link to={editLink} className="col-sm-4 btn btn-lg p-1"><i className="fas fa-pencil-alt"></i></Link>
            <button className="col-sm-4 btn-lg pointerHand p-1"><i className="fas fa-trash-alt"></i></button>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleGear;
