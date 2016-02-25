import React from 'react';

class Snow extends React.Component {
  render () {
    return (
      <div className="icon flurries">
        <div className="cloud"></div>
        <div className="snow">
          <div className="flake"></div>
          <div className="flake"></div>
        </div>
      </div>
    );
  }
}

export default Snow;
