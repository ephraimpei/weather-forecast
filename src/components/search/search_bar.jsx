import React from 'react';
import classNames from "classnames";
import WeatherApiUtil from "../../apiutil/weather_api_util.js";
import weatherStore from "../../stores/weather_store.js";

class SearchBar extends React.Component {
  constructor (props) {
    super(props);
    this.addAutocompleteListener = this.addAutocompleteListener.bind(this);
    this.handleSearchSubmission = this.handleSearchSubmission.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.triggerMapsEvent = this.triggerMapsEvent.bind(this);
  }

  componentDidMount () {
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'), {
      types: ['(cities)']
    });

    this.addAutocompleteListener(this.autocomplete);

    document.getElementById('submit').onclick = () => this.triggerMapsEvent();

    weatherStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    google.maps.event.removeListener(this.autocompleteListener);

    weatherStore.removeChangeListener(this._onChange);
  }

  addAutocompleteListener (autocomplete) {
    const reactivateBtn = () => {
      document.getElementById("submit").classList.remove('active', 'disabled');
      document.getElementById("submit").disabled = false;
    };

    this.autocompleteListener = google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const getPlace = new Promise((resolve, reject) => {
        const place = autocomplete.getPlace();

        if (typeof place !== "undefined" && place.geometry) { resolve(place); }
        else { reject("Place not found!"); }
      });

      getPlace.then((placesObj) => this.handleSearchSubmission(placesObj, reactivateBtn),
        (err) => this.handleSearchError(err, reactivateBtn));
    });
  }

  triggerMapsEvent () {
    document.getElementById("submit").classList.add('active', 'disabled');
    google.maps.event.trigger(this.autocomplete, 'place_changed');
  }

  handleSearchSubmission (placesObj, reactivateBtn) {
    const lat = placesObj.geometry.location.lat();
    const lng = placesObj.geometry.location.lng();

    WeatherApiUtil.getForecastData(lat, lng, reactivateBtn);
  }

  handleSearchError (err, reactivateBtn) {
    console.log(err);
    reactivateBtn();
  }

  handleKeyDown (e) {
    if (e.keyCode === 13 && e.currentTarget.value.length > 0) {
      document.getElementById("submit").classList.add('active', 'disabled');
      document.getElementById("submit").disabled = true;
    }
  }

  render () {
    const searchBarClass = classNames("search-bar", "pull-right", this.props.gridSizes);

    return (
      <div className={ searchBarClass }>
        <div className="input-group">
          <input type="text"
            id="autocomplete"
            className="form-control"
            placeholder="Type in a city"
            onKeyDown={ this.handleKeyDown }/>

          <span className="input-group-btn">
            <button id="submit" className="btn btn-default">
              <i className="fa fa-search"></i>
            </button>
          </span>
        </div>
      </div>
    );
  }
}

export default SearchBar;
