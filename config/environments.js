const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost/nice-rocks'; //the address to the mongoDataBase
const PORT = process.env.PORT || 8000;
const GE_API  = process.env.GOOGLE_EARTH_API_KEY;

module.exports = {
  DB_URI, PORT, GE_API
};
