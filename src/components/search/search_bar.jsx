import React from 'react';
import classNames from "classnames";
import WeatherApiUtil from "../../apiutil/weather_api_util.js";
import weatherStore from "../../stores/weather_store.js";

class SearchBar extends React.Component {
  constructor (props) {
    super(props);
    this.addAutocompleteListener = this.addAutocompleteListener.bind(this);
    this.handleSearchSubmission = this.handleSearchSubmission.bind(this);
  }

  componentDidMount () {
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'), {
      types: ['(cities)']
    });

    this.addAutocompleteListener(this.autocomplete);

    weatherStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    google.maps.event.removeListener(this.autocompleteListener);

    weatherStore.removeChangeListener(this._onChange);
  }

  addAutocompleteListener (autocomplete) {
    this.autocompleteListener = google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const getPlace = new Promise((resolve, reject) => {
        const place = autocomplete.getPlace();

        if (typeof place !== "undefined" && place.geometry) { resolve(place); }
        else { reject("Place not found!"); }
      });

      getPlace.then((result) => this.handleSearchSubmission(result),
        (err) => this.handleSearchError(err));
    });
  }

  handleSearchSubmission (result) {
    const lat = result.geometry.location.lat();
    const lng = result.geometry.location.lng();

    WeatherApiUtil.getForecastData(lat, lng);
  }

  handleSearchError (err) {
    console.log(err);
  }

  render () {
    const searchBarClass = classNames("search-bar", "pull-right", this.props.gridSizes);

    return (
      <div className={ searchBarClass }>
        <div className="input-group">
          <span className="input-group-addon">
            <i className="fa fa-search"></i>
          </span>

          <input type="text"
            id="autocomplete"
            className="form-control"
            placeholder="Type in a city"
            onKeyDown={ this.handleKeyDown }/>
        </div>
      </div>
    );
  }
}

export default SearchBar;
