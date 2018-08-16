const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'dev'; //production or dev
const dbURI = process.env.DB_URI || `mongodb://localhost/whiskease-${env}`;

module.exports = { port, dbURI };
