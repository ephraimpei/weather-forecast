import React from 'react';
import Tabs from '../tabs/tabs.jsx';
import TabsContent from '../tabs/tabs_content.jsx';

class ForecastMain extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="forecast-main container">
        <Tabs />

        <TabsContent forecast={ this.props.forecast } />
      </div>
    );
  }
}

export default ForecastMain;
