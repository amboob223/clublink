const POOl = require("pg").Pool;
const pool = new POOl({
    password: "8896",
    database: "club",
    host: "localhost",
    port: 5432,
    user: "playabook"
});
module.exports = pool;