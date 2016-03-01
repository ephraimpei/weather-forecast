import React from 'react';
import { separateForecastByDay, consolidateToDailyForecast } from '../../utilities/forecast.js';

class FiveDayForecast extends React.Component {
  constructor (props) {
    super(props);
    this.updateGraph = this.updateGraph.bind(this);
    this.drawGridLines = this.drawGridLines.bind(this);
    this.makeXAxisGrid = this.makeXAxisGrid.bind(this);
    this.makeYAxisGrid = this.makeYAxisGrid.bind(this);

    // svg dimension
    this.width = 1000;
    this.height = 600;
    this.padding = 50;
  }

  componentWillReceiveProps (nextProps) {
    const forecastSplitByDay = separateForecastByDay(nextProps.forecast);
    const consolidatedDailyForecasts = forecastSplitByDay.map( (forecast) => {
      return consolidateToDailyForecast(forecast);
    });

    // this.updateGraph(consolidatedDailyForecasts, width, height, padding);
    this.updateGraph(consolidatedDailyForecasts);
  }

  componentDidMount () {
    const forecastSplitByDay = separateForecastByDay(this.props.forecast);
    const consolidatedDailyForecasts = forecastSplitByDay.map( (forecast) => {
      return consolidateToDailyForecast(forecast);
    });

    // create tooltip container
    let tip = d3.tip()
      .attr('class', 'd3-tip')
      .html(function(d) {
        let date = d.date;
        let temp = d.low || d.ave || d.high;
        let tooltip = (
          <div>
            <div>
              <div>Date</div>
              <div>Temp</div>
            </div>
            <div>
              <div>{ date }</div>
              <div>{ temp }</div>
            </div>
          </div>
        );

        return tooltip;
      });

    // create an svg container
    let svg = d3.select("#five-day-forecast").append("svg:svg")
      .attr("viewBox", "0 0 1000 600")
      .attr("perserveAspectRatio", "xMaxYMax")
      .attr("class", "col-lg-12 col-md-12 col-sm-12 col-xs-12")
      .attr("width", this.width)
      .attr("height", this.height);

    this.svg = svg;

    // invoke the tool tip
    svg.call(tip);

    // define the y scale  (vertical)
    this.yScale = d3.scale.linear()
      .domain([0, 100])
      .range([this.height - this.padding, this.padding]);

    // define the x scale (horizontal)
    let mindate = new Date();
    let now = new Date();
    let maxdate = new Date(now.setDate(now.getDate() + 5));

    this.xScale = d3.time.scale()
      .domain([mindate, maxdate])
      .range([this.padding, this.width - this.padding * 2]);

    // define the y axis
    let yAxis = d3.svg.axis()
      .orient("left")
      .scale(this.yScale)
      .ticks(10);

    // define the y axis
    let xAxis = d3.svg.axis()
      .orient("bottom")
      .scale(this.xScale)
      .ticks(d3.time.days, 1)
      .tickFormat(d3.time.format('%a %d'));

    // draw y axis
    svg.append("g")
      .attr("class", "yaxis")
      .attr("transform", "translate(" + this.padding + ",0)")
      .call(yAxis);

    // draw x axis
    svg.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + (this.height - this.padding) + ")")
      .call(xAxis);

    // label the y axis
    svg.append("text")
     .attr("text-anchor", "middle")
     .attr("transform", "translate("+ (this.padding / 8) + "," + (this.padding * 2) + ")rotate(-90)")
     .text("Temp (F)");

    this.drawHiTempLine = d3.svg.line()
      .interpolate("linear")
      .x( (d) => this.xScale(d.date) )
      .y( (d) => this.yScale(d.high) );

    this.drawLowTempLine = d3.svg.line()
      .interpolate("linear")
      .x( (d) => this.xScale(d.date) )
      .y( (d) => this.yScale(d.low) );


    this.drawAveTempLine = d3.svg.line()
      .interpolate("linear")
      .x( (d) => this.xScale(d.date) )
      .y( (d) => this.yScale(d.ave) );

    this.drawGridLines();
    this.updateGraph(consolidatedDailyForecasts);
  }

  drawGridLines () {
    this.svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + (this.height - this.padding) + ")")
      .call(this.makeXAxisGrid()
          .tickSize(-(this.height - (this.padding * 2)), 0, 0)
          .tickFormat(""));

    this.svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(" + this.padding + ",0)")
      .call(this.makeYAxisGrid()
          .tickSize(-(this.width - (this.padding * 3)), 0, 0)
          .tickFormat(""));
  }

  updateGraph (consolidatedDailyForecasts) {
    d3.selectAll(".line").remove();
    d3.selectAll(".line-label").remove();
    d3.selectAll(".d3-tip").remove();

    // draw high temp lines
    this.svg.append('svg:path')
      .attr('d', this.drawHiTempLine(consolidatedDailyForecasts))
      .attr('class', 'line')
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    // draw low temp lines
    this.svg.append('svg:path')
      .attr('d', this.drawLowTempLine(consolidatedDailyForecasts))
      .attr('class', 'line')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    // draw ave temp lines
    this.svg.append('svg:path')
      .attr('d', this.drawAveTempLine(consolidatedDailyForecasts))
      .attr('class', 'line')
      .attr('stroke', 'green')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    // create labels for each line
    this.svg.append("text")
    	.attr("transform", "translate(" + (this.width + 3) + "," +
        this.yScale(consolidatedDailyForecasts.slice(-1)[0].high) + ")")
      .attr("class", "line-label")
    	.attr("dy", ".35em")
      .attr("dx", "-10em")
    	.attr("text-anchor", "start")
    	.style("fill", "red")
    	.text("High");

    this.svg.append("text")
  		.attr("transform", "translate(" + (this.width + 3) + "," +
        this.yScale(consolidatedDailyForecasts.slice(-1)[0].ave) + ")")
      .attr("class", "line-label")
  		.attr("dy", ".35em")
      .attr("dx", "-10em")
  		.attr("text-anchor", "start")
  		.style("fill", "green")
  		.text("Ave");

  	this.svg.append("text")
  		.attr("transform", "translate(" + (this.width + 3) + "," +
        this.yScale(consolidatedDailyForecasts.slice(-1)[0].low) + ")")
      .attr("class", "line-label")
  		.attr("dy", ".35em")
      .attr("dx", "-10em")
  		.attr("text-anchor", "start")
  		.style("fill", "steelblue")
  		.text("Low");
  }

  makeXAxisGrid () {
    return d3.svg.axis()
      .scale(this.xScale)
      .orient("bottom")
      .ticks(5);
  }

  makeYAxisGrid () {
    return d3.svg.axis()
      .scale(this.yScale)
      .orient("left")
      .ticks(10);
  }

  render () {
    return (
      <div id="five-day-forecast-container" className="container">
        <div id="five-day-forecast" className="row"></div>
      </div>
    );
  }
}

export default FiveDayForecast;
