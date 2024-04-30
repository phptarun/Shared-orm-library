const pool = require("./db.connection");

const listuser = () => {
  console.log('listuser ')
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) reject(err);

      connection.query(
        "SELECT * FROM `users`",
        function (error, results, fields) {
          connection.release();
          console.log(results,error)
          resolve(results);

          if (error) reject(error);
        }
      );
    });
  });
};

const getSettings = () => {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        if (err) throw err;
  
        connection.query(
          "SELECT * FROM `settings`",
          function (error, results, fields) {
            connection.release();
            resolve(results);
  
            if (error) reject(error);
          }
        );
      });
    });
  };

  module.exports = {
    getSettings,
    listuser
  };
