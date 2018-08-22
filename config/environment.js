const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'dev'; //production or dev
const dbURI = process.env.DB_URI || `mongodb://localhost/resolut-${env}`;
const secret = process.env.SECRET || 'sean&sophie-resolut-app';

//API KEYS
const darkskyApiKey = process.env.DARKSKY_API_KEY;

module.exports = { port, dbURI, secret, darkskyApiKey };
