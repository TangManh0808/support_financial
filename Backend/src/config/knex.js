const knex = require("knex");
const config = require("../../knexfile");
let db = knex(config.development);

module.exports = db;
