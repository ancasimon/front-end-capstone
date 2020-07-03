import PropTypes from 'prop-types';

const countObjectShape = PropTypes.shape({
  functionName: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
});

export default { countObjectShape };
