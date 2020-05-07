const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kekhuek123",
  database: "developer_test"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("MySQL Connected!");
});

module.exports = function myQuery(sql, post = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, post, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
});
};
