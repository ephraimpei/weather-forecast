import React from "react";
import classNames from "classnames";
import SearchBar from "../search/search_bar.jsx";

class NavBar extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const blurbGridSizes = "col-md-6 col-sm-5 col-xs-8";
    const btnGridSizes = "col-md-2 col-sm-2 col-xs-4";
    const searchBarGridSizes = "col-md-4 col-sm-5 col-xs-12";

    // Navigator geolocate only works over HTTPS in Chrome v50+
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    const locBlurbClass = classNames(
      "curr-loc-blurb",
      "navbar-text",
      "pull-left",
      blurbGridSizes
    );

    const btnClass = classNames(
      "my-loc-btn",
      "btn",
      "btn-default",
      { "hide": isChrome ? true : false },
      btnGridSizes
    );

    return (
      <div className="navbar navbar-inverse navbar-static-top">
        <div className="container">
          <div className="row">
            <h4 className={ locBlurbClass }>{ this.props.location }</h4>

            <button className={ btnClass } disabled={ this.props.loading }
              onClick={ this.props.getCurrentPosition }>
              My location <i className="fa fa-globe"></i></button>

            <SearchBar gridSizes={ searchBarGridSizes }
              startLoading={ this.props.startLoading }/>
          </div>

          <div id="forecast-success" className="alert alert-success fade">
            <strong>Yay!</strong> Forecast loaded successfully!
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
