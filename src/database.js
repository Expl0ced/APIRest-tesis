const mysql = require('mysql2');

const mysqlConnection = mysql.createConnection({
    // host: 'grp6m5lz95d9exiz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    // user: 'y8xou81fpvhxueyg',
    // password: 'iddp8prwfss26k9u',
    // database: 'sij2vou7a0rrqrs9',
    // multipleStatements: true

    host: 'sql10.freemysqlhosting.net',
    user: 'sql10640232',
    password: 'i5lXVdmqrk',
    database: 'sql10640232',
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