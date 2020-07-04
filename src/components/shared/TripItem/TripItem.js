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
    const { singleLink } = `/trips/${trip.id}`;
    return (
      <div className="TripItem">

        <div
          class="card"
          onMouseEnter={() => this.setIsShown(true)}
          onMouseLeave={() => this.setIsShown(false)}
          >
            {
              isShown ? (
                <div>
                  <div class="card-img" style={{ backgroundImage: `url(${trip.imageUrl})` }}>
                  </div>
                  <div class="card-content">
                  <Link to={singleLink}>
                    <h2>{trip.destination}</h2>
                    <p>{trip.startDate} - {trip.endDate}</p>
                  </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <div class="card-img hover" style={{ backgroundImage: `url(${trip.imageUrl})` }}>
                    <div class="overlay hover">
                      <div class="overlay-content hover">
                        <Link class="hover" to={singleLink}>View Details</Link>
                    </div>
                  </div>
                </div>
                <div class="card-content">
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
