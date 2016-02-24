import React from 'react';
import NavBar from '../nav/navbar.jsx';

class WeatherForecastApp extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
        <div className="main-app">
          <NavBar />
        </div>
     );
  }
}

export default WeatherForecastApp;
