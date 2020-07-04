import PropTypes from 'prop-types';

const tripShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired, 
  destination: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  partyId: PropTypes.string.isRequired,
  weatherId: PropTypes.string.isRequired,
  seasonId: PropTypes.string.isRequired,
  isEstablishedCampsite: PropTypes.bool.isRequired,
  imageUrl: PropTypes.string.isRequired,
});

export default { tripShape };
