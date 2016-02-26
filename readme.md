# Weather Forecast App

[Live Site][live] - Make sure you are using http not https (OpenWeatherMap's free API service does not support SSL)

[live]: http://ephraimpei-weather-forecast.herokuapp.com



## Summary

The Weather Forecast app is a single page app that utilizes the OpenWeatherMap API from http://openweathermap.org/api to extract weather data and display a 5 day forecast.  It also uses the autocomplete service from the Google Places API to extract the coordinates that will be used to make the call to the OpenWeatherMap API.

### Languages

* JavaScript
* HTML5/CSS3
* SASS

### Frameworks and Technologies

* Node.js
* Express
* React and Flux
* Bootstrap (v3)
* d3.js
* Webpack
* jQuery

### Vendor Technologies

* FontAwesome

### Third-party APIs

* OpenWeatherMap API
* Google Places API

### App features

* Automatically gets local weather data upon loading
* Google Place API's autocomplete feature allows you to search for any city in the world
* Queries and processes OpenWeatherMap API's data into a five day forecast
* Mobile, tablet, and desktop responsive courtesy of Bootstrap features

### Trade-off decisions

* I wanted to implement an auto complete feature that will allow the user to easily search for a location.  At first I looked into loading the provided JSON file of city data into MongoDB.  From there I would set up a simple controller/action/model structure that would query the database and get a list of matches.  However, I noticed that state is not one of the data elements that's captured in the provided JSON file.  Since being able to search by city AND state was a requirement, I tossed this approach and decided to implement Google Place's Autocomplete feature.  With these services I was easily able to provide an autocomplete feature that satisfied the requirement and provided coordinates to be used to make a request to OpenWeatherMap's API.

### Challenges

* Due to some attributes of the data provided by OpenWeatherMap's free API service (3-hour time slots, number of data elements can vary depending on time of request), I was required to create several functions that parsed and processed the raw data into a daily forecasts. Check out [`forecast.js`](./src/utilities/forecast.js) for how I was able to do this.  The code is commented and will shed some light on my thought process.
