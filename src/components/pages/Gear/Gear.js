import React from 'react';
import { Link } from 'react-router-dom';

import './Gear.scss';

class Gear extends React.Component {
  render() {
    return (
      <div className="Gear">
        <h1>Gear List Page</h1>
        <Link to='gear/:gearItemId'>View</Link>
        <Link to='gear/new'>Add</Link>
        <Link to='gear/edit/:gearItemId'>Edit</Link>
      </div>
    );
  }
}

export default Gear;
