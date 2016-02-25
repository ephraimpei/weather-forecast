import React from 'react';

class ForecastIndexItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        { this.props.forecast }
      </div>
    );
  }
}

export default ForecastIndexItem;
