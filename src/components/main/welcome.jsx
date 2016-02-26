import React from 'react';

class Welcome extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="welcome container">
      <div className="jumbotron">
        <h1>Welcome to Ephraim's Forecast Web App!</h1>
        <p>To get started, go ahead and <strong>search for a city</strong> or click on the button in the navigation bar to <strong>get your current location's weather.</strong> Or... just click here:</p>

        <p><button className="btn btn-primary btn-lg" disabled={ this.props.loading }
          onClick={ this.props.getCurrentPosition }>Get the weather!</button></p>
      </div>
      </div>
    );
  }
}

export default Welcome;
