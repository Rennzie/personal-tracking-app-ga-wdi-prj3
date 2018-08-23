const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'dev'; //production or dev
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/resolut-${env}`;
const secret = process.env.SECRET || 'sean&sophie-resolut-app';

//API KEYS
const darkskyApiKey = process.env.DARKSKY_API_KEY;
const cityMapperApiKey = process.env.CITY_MAPPER_API_KEY;
// console.log('the city mapper key is', cityMapperApiKey);

module.exports = { port, dbURI, secret, darkskyApiKey, cityMapperApiKey };
