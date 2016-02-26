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

    d3.selectAll("path").remove();

    this.updateGraph(consolidatedDailyForecasts);
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

    // define the y scale  (vertical)
    var yScale = d3.scale.linear()
      .domain([0, 100])    // values between 0 and 100
      .range([height - padding, padding]);   // map these to the chart height, less padding.
             //REMEMBER: y axis range has the bigger number first because the y value of zero is at the top of chart and increases as you go down.

    // define the x scale (horizontal)
    var mindate = new Date(),
        maxdate = new Date(this.props.forecast.slice(-1)[0].dt_txt.replace(/-/g, '/'));

    var xScale = d3.time.scale()
      .domain([mindate, maxdate])    // values between for month of january
      .range([padding, width - padding * 2]);   // map these the the chart width = total width minus padding at both sides

    // define the y axis
    var yAxis = d3.svg.axis()
        .orient("left")
        .scale(yScale)
        .tickPadding(10);

    // define the y axis
    var xAxis = d3.svg.axis()
        .orient("bottom")
        .scale(xScale)
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
        .attr("class", "xaxis")   // give it a class so it can be used to select only xaxis labels  below
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis);

    // label the y axis
    svg.append("text")
       .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
       .attr("transform", "translate("+ (padding/8) +","+(padding * 2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
       .text("Temp (F)");

    this.svg = svg;

    var lineHighFn = d3.svg.line()
        .interpolate("linear")
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale(d.high); });

    var lineLowFn = d3.svg.line()
        .interpolate("linear")
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale(d.low); });


    var lineAveFn = d3.svg.line()
        .interpolate("linear")
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale(d.ave); });


    this.drawHiTempLine = lineHighFn;
    this.drawLowTempLine = lineLowFn;
    this.drawAveTempLine = lineAveFn;

    // draw high temp lines
    svg.append('svg:path')
      .attr('d', lineHighFn(consolidatedDailyForecasts))
      .attr('class', 'line')
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    // draw low temp lines
    svg.append('svg:path')
      .attr('d', lineLowFn(consolidatedDailyForecasts))
      .attr('class', 'line')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    // draw ave temp lines
    svg.append('svg:path')
      .attr('d', lineAveFn(consolidatedDailyForecasts))
      .attr('class', 'line')
      .attr('stroke', 'green')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    // create labels for each line
    svg.append("text")
    	.attr("transform", "translate(" + (width+3) + "," + yScale(consolidatedDailyForecasts[4].high) + ")")
    	.attr("dy", ".35em")
      .attr("dx", "-17em")
    	.attr("text-anchor", "start")
    	.style("fill", "red")
    	.text("High");

    svg.append("text")
  		.attr("transform", "translate(" + (width+3) + "," + yScale(consolidatedDailyForecasts[4].ave) + ")")
  		.attr("dy", ".35em")
      .attr("dx", "-17em")
  		.attr("text-anchor", "start")
  		.style("fill", "green")
  		.text("Ave");

  	svg.append("text")
  		.attr("transform", "translate(" + (width+3) + "," + yScale(consolidatedDailyForecasts[4].low) + ")")
  		.attr("dy", ".35em")
      .attr("dx", "-17em")
  		.attr("text-anchor", "start")
  		.style("fill", "steelblue")
  		.text("Low");
  }

  updateGraph (consolidatedDailyForecasts) {
    // draw high temp lines
    this.svg.append('svg:path')
      .attr('d', this.drawHiTempLine(consolidatedDailyForecasts))
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    // draw low temp lines
    this.svg.append('svg:path')
      .attr('d', this.drawLowTempLine(consolidatedDailyForecasts))
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    // draw ave temp lines
    this.svg.append('svg:path')
      .attr('d', this.drawAveTempLine(consolidatedDailyForecasts))
      .attr('stroke', 'green')
      .attr('stroke-width', 2)
      .attr('fill', 'none');
  }

  render () {
    return (
      <div className="five-day-forecast"></div>
    );
  }
}

export default FiveDayForecast;
