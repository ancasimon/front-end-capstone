import PropTypes from 'prop-types';

const gearShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  isAvailable: PropTypes.bool.isRequired,
  functionId: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  manufactureYear: PropTypes.number.isRequired,
  expirationYear: PropTypes.number.isRequired,
  weatherId: PropTypes.string.isRequired,
  forEstablishedCampsite: PropTypes.bool.isRequired,
  weightInGrams: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
});

export default { gearShape };
