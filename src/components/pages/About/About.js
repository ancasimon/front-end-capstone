import React from 'react';

import './About.scss';

class About extends React.Component {
  render() {
    return (
      <div className="About col-12 pageDisplay">
        <h1 className="heading textShadow">About GearUp</h1>

        <div className="container col-12">
          <ul>
            <li>How many times have you thought about going on a weekend backpacking trip and then felt overwhelmed at the thought of having to figure out everything you need to take?</li>
            <li>Why does it have to be so difficult to just get out in nature and away from it all or a few days? </li>
            <li>It doesn’t have to be!</li>
            <li>GearUp is here to help make your backpacking dreams come true effortlessly! </li>
            <li>Add all your current camping gear and snap, the next time you want to go on a trip, your packing list is ready in a sec!</li>

          </ul>
        </div>
      </div>
    );
  }
}

export default About;
