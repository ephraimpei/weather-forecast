import React from 'react';
import classNames from "classnames";
import WeatherApiUtil from "../../apiutil/weather_api_util.js";

class SearchBar extends React.Component {
  constructor (props) {
    super(props);
    this.addAutocompleteListener = this.addAutocompleteListener.bind(this);
    this.handleSearchSubmission = this.handleSearchSubmission.bind(this);
    this.handleSearchError = this.handleSearchError.bind(this);
  }

  componentDidMount () {
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'), {
      types: ['(cities)']
    });

    this.addAutocompleteListener(this.autocomplete);
  }

  componentWillUnmount () {
    google.maps.event.removeListener(this.autocompleteListener);
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
    const location = result.formatted_address;
    const lat = result.geometry.location.lat();
    const lng = result.geometry.location.lng();

    WeatherApiUtil.getForecastData(lat, lng, location);
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
            placeholder="Search for a city..."/>
        </div>
      </div>
    );
  }
}

export default SearchBar;
