const rp = require('request-promise'); //Make HTTP resuest on the back-end to external API's
const { cityMapperApiKey } = require('../../config/environment');

function citymapTravelTime( req, res, next){
  const qs = req.query;
  console.log('the city mapper key is', cityMapperApiKey);
  rp({
    method: 'GET',
    url: `https://developer.citymapper.com/api/1/traveltime/?startcoord=${qs.startLat}%2C${qs.startLon}&endcoord=${qs.endLat}%2C${qs.endLon}&key=${cityMapperApiKey}`,
    json: true
  })
    .then(response => res.json(response))
    .catch(next);
}

module.exports = {
  citymapper: {
    travelTime: citymapTravelTime
  }
};
