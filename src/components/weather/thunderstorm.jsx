import React from 'react';

class Thunderstorm extends React.Component {
  render () {
    return (
      <div className="icon thunder-storm">
        <div className="cloud"></div>
        <div className="lightning">
          <div className="bolt"></div>
          <div className="bolt"></div>
        </div>
      </div>
    );
  }
}

export default Thunderstorm;
