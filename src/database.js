<<<<<<< HEAD
const mysql = require('mysql2');

const mysqlConnection = mysql.createConnection({
    host: 'grp6m5lz95d9exiz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'y8xou81fpvhxueyg',
    password: 'iddp8prwfss26k9u',
    database: 'sij2vou7a0rrqrs9',
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

=======
const mysql = require('mysql2');

const mysqlConnection = mysql.createConnection({
    host: 'grp6m5lz95d9exiz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'y8xou81fpvhxueyg',
    password: 'iddp8prwfss26k9u',
    database: 'sij2vou7a0rrqrs9',
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

>>>>>>> 2772ec34df411192a5976936a63c4a06e9930022
module.exports = mysqlConnection;