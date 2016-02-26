import React from 'react';
import classNames from "classnames";
import WeatherApiUtil from "../../apiutil/weather_api_util.js";

class SearchBar extends React.Component {
  constructor (props) {
    super(props);
    this.addAutocompleteListener = this.addAutocompleteListener.bind(this);
    this.handleSearchSubmission = this.handleSearchSubmission.bind(this);
    this.handleSearchError = this.handleSearchError.bind(this);
    this.removeError = this.removeError.bind(this);
    this.state = { error: false, errMsg: null };
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
        else { reject("Please pick from the autocomplete!"); }
      });

      getPlace.then((result) => this.handleSearchSubmission(result),
        (err) => this.handleSearchError(err));
    });
  }

  handleSearchSubmission (result) {
    this.props.startLoading();

    const location = result.formatted_address;
    const lat = result.geometry.location.lat();
    const lng = result.geometry.location.lng();

    WeatherApiUtil.getForecastData(lat, lng, location);
  }

  handleSearchError (err) {
    this.setState({ error: true, errMsg: err });
  }

  removeError () {
    if (this.state.error) { this.setState({ error: false, errMsg: null }); }
  }

  render () {
    const searchBarClass = classNames("search-bar", "pull-right", this.props.gridSizes);
    let errMsg;

    if (this.state.error) {
      errMsg = (
        <div className="search-error alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          <span className="sr-only">Error:</span>
          <span>   { this.state.errMsg }</span>
        </div>
      );
    }

    return (
      <div className={ searchBarClass }>
        <div className="input-group">
          <span className="input-group-addon">
            <i className="fa fa-search"></i>
          </span>

          <input type="text"
            id="autocomplete"
            className="form-control"
            placeholder="Search for a city..."
            onFocus={ this.removeError }
            onChange={ this.removeError }
            onBlur={ this.removeError }/>
        </div>

        { errMsg }

      </div>
    );
  }
}

export default SearchBar;
