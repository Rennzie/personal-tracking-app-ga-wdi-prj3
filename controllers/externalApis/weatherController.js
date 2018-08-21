const rp = require('request-promise'); //Make HTTP resuest on the back-end to external API's
const { darkskyApiKey } = require('../../config/environment');
const moment = require('moment');

function forecast( req, res, next ){
  console.log('req.query', req.query);
  const latLon = req.query;
  const time =  moment(`${req.query.time}`).unix();
  rp({
    method: 'GET',
    url: `https://api.darksky.net/forecast/${darkskyApiKey}/${latLon.lat},${latLon.lon}, ${time}`,
    json: true //format for the returned data
  })
    .then(response => res.json(response.daily.data[0])) //can limit which data actually makes it to the front end
    .catch(next);
}

module.exports = {
  forecast
};
