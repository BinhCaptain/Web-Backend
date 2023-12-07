const mysql = require('mysql');



const db = mysql.createConnection({
    host: 'db4free.net',
    user: 'phucnhan0406',
    password: 'phucnhan0406@',
    database: 'sales_clock',
  });



  db.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL_Database:', err);
      return;
    }
    console.log('Connected to MySQL_Database');
  });

  
  module.exports = db;