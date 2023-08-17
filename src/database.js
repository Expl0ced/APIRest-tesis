const mysql = require('mysql2');

const mysqlConnection = mysql.createConnection({
    // host: 'grp6m5lz95d9exiz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    // user: 'y8xou81fpvhxueyg',
    // password: 'iddp8prwfss26k9u',
    // database: 'sij2vou7a0rrqrs9',
    // multipleStatements: true

    host: 'u6354r3es4optspf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'iz5z3aedeezw1yim',
    password: 'w4xmhu43rb5jqgzc',
    database: 'btg6twx38yp1xdwm',
    multipleStatements: true

});

mysqlConnection.connect(function (err) {
    if (err) {
        console.error(err);
        return;
    } else {
        console.log('db is connected');
    }
});

module.exports = mysqlConnection;