import React from 'react';

class Pills extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
        <ul className="options nav nav-pills">
          <li className="active">
            <a href="#forecast" data-toggle="tab">Forecast</a>
          </li>

          <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#"
              role="button" aria-haspopup="true" aria-expanded="false">
              Visualizations<span className="caret"></span>
            </a>

            <ul className="dropdown-menu">
              <li><a href="#forecast_viz" data-toggle="tab">Forecast</a></li>
              <li><a href="#day1_viz" data-toggle="tab">Day 1</a></li>
              <li><a href="#day2_viz" data-toggle="tab">Day 2</a></li>
              <li><a href="#day3_viz" data-toggle="tab">Day 3</a></li>
              <li><a href="#day4_viz" data-toggle="tab">Day 4</a></li>
              <li><a href="#day5_viz" data-toggle="tab">Day 5</a></li>
            </ul>
          </li>
        </ul>
    );
  }
}

export default Pills;
