import React from 'react';

import './NewGear.scss';

class NewGear extends React.Component {
  render() {
    return (
      <div className="NewGear col-12">
        <h1>Add a New Gear Item Page</h1>
        <div className="justify-content-center">
        <form>
          <div className="row">
          <div className="col-4">
          <div class="form-group">
            <label for="gear-item">Item</label>
            <input type="text" class="form-control" id="gear-item" placeholder="What is it?" />
          </div>
          <div class="form-group">
            <label for="gear-brand">Brand</label>
            <input type="text" class="form-control" id="gear-brand" placeholder="Who made it?" />
          </div>
          <div class="form-group">
            <label for="gear-model">Model</label>
            <input type="text" class="form-control" id="gear-model" placeholder="What type?" />
          </div>
          <div class="form-group">
            <label for="gear-details">Details</label>
            <textarea class="form-control" id="gear-details" rows="3" placeholder="What do you like about it?"></textarea>
          </div>
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="gear-estCampsite" />
            <label class="form-check-label" for="gear-estCampsite">Can it be used only at an established campsite?</label>
          </div>
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="gear-available" />
            <label class="form-check-label" for="gear-available">Is it available?</label>
          </div>
          </div>
          <div className="col-4">
          <div class="form-group">
            <label for="gear-manYr">Manufacture Year</label>
            <input type="number" class="form-control" id="gear-manYr" placeholder="When was it made?" />
          </div>
          <div class="form-group">
            <label for="gear-expYr">Expiration Year</label>
            <input type="number" class="form-control" id="gear-expYr" placeholder="When do you think you will need to replace it?" />
          </div>
          <div class="form-group">
            <label for="gear-weight">What is the weight? (in grams)</label>
            <input type="number" class="form-control" id="gear-weight" placeholder="How much does it weigh?" />
          </div>
          <div class="form-group">
            <label for="gear-function">Function</label>
            <select class="form-control" id="gear-function">
              {/* XXX NEED to get functions list to display here! */}
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div class="form-group">
            <label for="gear-weather">Weather</label>
            <select class="form-control" id="gear-weather">
              {/* XXX NEED to get weather list to display here! */}
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div class="form-group">
            <label for="gear-image">Photo URL</label>
            <input type="text" class="form-control" id="gear-image" placeholder="Take a pic!" />
          </div>
          </div>
          </div>
        </form>
        </div>

      </div>
    );
  }
}

export default NewGear;
