const rp = require('request-promise'); //Make HTTP resuest on the back-end to external API's

function postcodeGeocode( req, res, next ){

  rp({
    method: 'GET',
    url: 'http://api.postcodes.io/postcodes/sw62tg'
  })
    .then(response => res.json(response))
    .catch(next);
}
module.exports = {
  encodePC: postcodeGeocode
};
