const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const localDBName = "weather-forecast-app-test";
const url = 'mongodb://localhost:27017/' + localDBName;

module.exports = MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to " + localDBName);
  db.close();
});
