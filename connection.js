var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10, 
    host: "hostname",
    user: "username",
    password: "password",
    database: "databasename"
});


// Make sure to export the 'pool' object so you can use it in other modules
module.exports = pool;

pool.getConnection((err, connection) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL server');
  
  // ... Use the 'connection' object to query the database ...
  
  connection.release(); // Release the connection back to the pool when you're done with it
});
