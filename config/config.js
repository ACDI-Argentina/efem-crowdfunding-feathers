const path = require('path');
const dotenv = require('dotenv');

const configPath = path.resolve(__dirname, `./.env`)
dotenv.config({ path: configPath });

module.exports = {
  mongodb: process.env.MONGO_DB,
};
