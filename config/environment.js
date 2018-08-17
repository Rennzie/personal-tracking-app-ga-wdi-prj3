const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'dev'; //production or dev
const dbURI = process.env.DB_URI || `mongodb://localhost/resolut-${env}`;
const { secret } = process.env.SECRET || 'sean&sophie-resolut-app';

module.exports = { port, dbURI, secret };
