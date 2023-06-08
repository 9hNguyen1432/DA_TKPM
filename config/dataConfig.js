var sql = require('mssql/msnodesqlv8');
// information to connect to database
var config = {
    server: "localhost",
    user: "sa",
    password: "123456",
    database: "QLDeTai",
    driver: "msnodesqlv8"
}

const conn = new sql.ConnectionPool(config).connect().then(pool => {return pool});

module.exports = {
    conn: conn,
    sql: sql
}