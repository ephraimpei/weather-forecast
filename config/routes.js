const path = require('path');

const appDir = path.dirname(require.main.filename);
const index = path.join(appDir + '/static/views/index.html');

module.exports = function(app) {
  app.get('/', function(req, res){
    res.sendFile(index);
  });
};
