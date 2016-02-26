import React from "react";
import classNames from "classnames";
import SearchBar from "../search/search_bar.jsx";

class NavBar extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const blurbGridSizes = "col-md-8 col-sm-7 col-xs-12";
    const searchBarGridSizes = "col-md-4 col-sm-5 col-xs-12";

    const locBlurbClass = classNames("curr-loc-blurb", "navbar-text", "pull-left",
      blurbGridSizes);

    return (
      <div className="navbar navbar-inverse navbar-static-top">
        <div className="container">
          <div className="row">
            <h4 className={ locBlurbClass }>{ this.props.location }</h4>

            <SearchBar gridSizes={ searchBarGridSizes }
              loading={ this.props.loading }/>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
