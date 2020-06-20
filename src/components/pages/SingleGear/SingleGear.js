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
    const { gearItemId } = this.props.match.params;
    smashData.getGearProperties(gearItemId)
      .then((response) => this.setState({
        gearItem: response.data,
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
        <h1>Single Gear Details Page</h1>

        <Link to='/gear' className="btn-lg btn-danger"><i class="far fa-window-close"></i></Link>

        <h2>{gearItem.item}</h2>
        <img className="gearPhoto" src={gearItem.imageUrl} alt={gearItem.item} />

        <div className="row justify-content-center col-12">
          <h4>{gearItem.brand}</h4> - <h4>{gearItem.model}</h4>
        </div>

        <div className="row justify-content-center col-12">
          <h4>Function: </h4>
          <h4><img className="gearIcon" src={gearFunction.imageUrl} alt={gearFunction.name} /> - {gearFunction.name}</h4>
        </div>

        <div className="row justify-content-center col-12">
          <h4>Seasons: </h4>
          {
            gearSeasons
              ? <h4>{gearSeasons.map((item) => <div className="row col-12"><img className="gearIcon" key={item.id} src={item.imageUrl} alt={item.name} />{item.name}</div>)}</h4>
              : <h4>N/A</h4>
          }
        </div>

        <div className="row justify-content-center col-12">
          <h4>Weather: </h4>
          <h4><img className="gearIcon" src={gearWeather.imageUrl} alt={gearWeather.name} />{gearWeather.name}</h4>
        </div>

        <div className="row justify-content-center col-12">
          <h4>Parties: </h4>
          {
            gearParties
              ? <div>{gearParties.map((item) => <div className="row"><img className="gearIcon" key={item.id} src={item.imageUrl} alt={item.name} />{item.name}</div>)}</div>
              : <h4>N/A</h4>
          }
        </div>

        <h4>Weight: {gearItem.weightInGrams * 1 } grams</h4>

        <div className="row col-12">
          <h5>Can you use it only at established campsites? </h5>{ gearItem.forEstablishedCampsite ? <h5>Indeed!</h5> : <h5>Nope, can use it anytime anywhere!</h5> }
        </div>

        <div className="row col-12">
          <h5>Available? </h5>{ gearItem.isAvailable ? <h5>Ready to go!</h5> : <h5>Sorry, you killed it a long time ago!</h5> }
        </div>

        <div className="row col-12">
          <h5>When it was made: </h5><h5> Year {gearItem.manufactureYear}</h5>
        </div>

        <div className="row col-12">
          <h5>When you may have to replace it: </h5><h5> Year {gearItem.expirationYear}</h5>
        </div>

        <div className="row col-12 justify-content-center">
          <Link to={editLink} className="btn btn-lg p-1"><i className="fas fa-pencil-alt"></i></Link>
          <button className="btn-lg pointerHand p-1"><i className="fas fa-trash-alt"></i></button>
        </div>

      </div>
    );
  }
}

export default SingleGear;
