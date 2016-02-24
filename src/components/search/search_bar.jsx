import React from 'react';
import classNames from "classnames";

class SearchBar extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const searchBarClass = classNames("search-bar", "pull-right", this.props.gridSizes);

    return (
      <div className={ searchBarClass }>
        <input type="text" className="form-control" placeholder="Type in a city"/>
      </div>
    );
  }
}

export default SearchBar;
