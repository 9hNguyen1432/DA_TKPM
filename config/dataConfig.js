// information to connect to database
var config = {
    server: "TOAINGUYEN\\SQLEXPRESS",
    user: "toainguyenvan",
    password: "toainguyenvan",
    database: "QLHSC3",
    options: {
        trustedConnection: true,
    },
    driver: "msnodesqlv8",
}

//password
//NB: PANDA\\SQLEXPRESS01 - 1
//HC: 123456
//TT: 123
module.exports = config;