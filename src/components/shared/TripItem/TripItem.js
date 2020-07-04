import React from 'react';
import { Link } from 'react-router-dom';

import tripShape from '../../../helpers/propz/tripShape';

import './TripItem.scss';

class TripItem extends React.Component {
  state = {
    isShown: false,
  }

  static propTypes = {
    trip: tripShape.tripShape,
  }

  setIsShown = () => {
    this.setState({ isShown: !this.state.isShown });
  }

  render() {
    const { trip, isShown } = this.props;
    const singleLink = `/trips/${trip.id}`;
    return (
      <div className="TripItem">

        <div
          className="card"
          onMouseEnter={() => this.setIsShown(true)}
          onMouseLeave={() => this.setIsShown(false)}
          >
            {
              isShown ? (
                <div>
                  <div className="card-img" style={{ backgroundImage: `url(${trip.imageUrl})` }}>
                  </div>
                  <div className="card-content">
                  <Link to={singleLink}>
                    <h2>{trip.destination}</h2>
                    <p>{trip.startDate} - {trip.endDate}</p>
                  </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="card-img hover" style={{ backgroundImage: `url(${trip.imageUrl})` }}>
                    <div className="overlay hover">
                      <div className="overlay-content hover">
                        <Link to={singleLink} className="hover">View Details</Link>
                    </div>
                  </div>
                </div>
                <div className="card-content">
                  <Link to={singleLink}>
                    <h2>{trip.destination}</h2>
                    <p>{trip.startDate} - {trip.endDate}</p>
                  </Link>
              </div>
            </div>
              )
            }

        </div>

      </div>
    );
  }
}

export default TripItem;
