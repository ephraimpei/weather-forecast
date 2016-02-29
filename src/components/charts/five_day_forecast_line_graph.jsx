import React from 'react';
import { separateForecastByDay, consolidateToDailyForecast } from '../../utilities/forecast.js';

class FiveDayForecast extends React.Component {
  constructor (props) {
    super(props);
    this.updateGraph = this.updateGraph.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    const forecastSplitByDay = separateForecastByDay(nextProps.forecast);
    const consolidatedDailyForecasts = forecastSplitByDay.map( (forecast) => {
      return consolidateToDailyForecast(forecast);
    });

    var width = 1000,
        height = 600,
        padding = 50;

    this.updateGraph(consolidatedDailyForecasts, width, height, padding);
  }

  componentDidMount () {
    const forecastSplitByDay = separateForecastByDay(this.props.forecast);
    const consolidatedDailyForecasts = forecastSplitByDay.map( (forecast) => {
      return consolidateToDailyForecast(forecast);
    });

    var width = 1000,
        height = 600,
        padding = 50;

    // create an svg container
    var svg = d3.select(".five-day-forecast").append("svg:svg")
      .attr("width", width)
      .attr("height", height);

    this.svg = svg;

    // define the y scale  (vertical)
    this.yScale = d3.scale.linear()
      .domain([0, 100])
      .range([height - padding, padding]);

    // define the x scale (horizontal)
    var mindate = new Date();
    var now = new Date();
    var maxdate = new Date(now.setDate(now.getDate() + 5));

    this.xScale = d3.time.scale()
      .domain([mindate, maxdate])
      .range([padding, width - padding * 2]);

    // define the y axis
    var yAxis = d3.svg.axis()
        .orient("left")
        .scale(this.yScale)
        .tickPadding(10);

    // define the y axis
    var xAxis = d3.svg.axis()
        .orient("bottom")
        .scale(this.xScale)
        .ticks(d3.time.days, 1)
        .tickFormat(d3.time.format('%a %d'))
        .tickPadding(8);

    // draw y axis with labels and move in from the size by the amount of padding
    // label the x axis
    svg.append("g")
        .attr("transform", "translate("+padding+",0)")
        .call(yAxis)
        .append("text");

    // draw x axis with labels and move to the bottom of the chart area
    svg.append("g")
        .attr("class", "xaxis")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis);

    // label the y axis
    svg.append("text")
       .attr("text-anchor", "middle")
       .attr("transform", "translate("+ (padding/8) +","+(padding * 2)+")rotate(-90)")
       .text("Temp (F)");

    this.svg = svg;

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

    this.updateGraph(consolidatedDailyForecasts, width, height, padding);
  }

  updateGraph (consolidatedDailyForecasts, width, heigh, padding) {
    d3.selectAll(".line").remove();
    d3.selectAll(".line-label").remove();

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
    	.attr("transform", "translate(" + (width+3) + "," + this.yScale(consolidatedDailyForecasts[4].high) + ")")
      .attr("class", "line-label")
    	.attr("dy", ".35em")
      .attr("dx", "-10em")
    	.attr("text-anchor", "start")
    	.style("fill", "red")
    	.text("High");

    this.svg.append("text")
  		.attr("transform", "translate(" + (width+3) + "," + this.yScale(consolidatedDailyForecasts[4].ave) + ")")
      .attr("class", "line-label")
  		.attr("dy", ".35em")
      .attr("dx", "-10em")
  		.attr("text-anchor", "start")
  		.style("fill", "green")
  		.text("Ave");

  	this.svg.append("text")
  		.attr("transform", "translate(" + (width+3) + "," + this.yScale(consolidatedDailyForecasts[4].low) + ")")
      .attr("class", "line-label")
  		.attr("dy", ".35em")
      .attr("dx", "-10em")
  		.attr("text-anchor", "start")
  		.style("fill", "steelblue")
  		.text("Low");
  }

  render () {
    return (
      <div className="five-day-forecast"></div>
    );
  }
}

export default FiveDayForecast;
