const pool = require("../db.connection");

const execQuery = (sql) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) reject(err);

      connection.query(sql, function (error, results, fields) {
        connection.release();
        console.log(results, error);
        resolve(results);

        if (error) reject(error);
      });
    });
  });
};

const sql = async () => {
  let promises = [];
  promises.push(
    execQuery(
      "CREATE TABLE settings(id int(11) UNSIGNED NOT NULL,IsNotificationEnabled enum('0','1') NOT NULL DEFAULT '1' COMMENT '1=Enabled, 0=Disabled',IsNewDashboardEnabled enum('0','1') NOT NULL DEFAULT '0' COMMENT '1=Enabled, 0=Disabled',Timezone varchar(100) NOT NULL DEFAULT 'Asia/Calcutta',addedOn datetime NOT NULL DEFAULT current_timestamp(),updatedOn timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;"
    )
  );
  promises.push(
    execQuery(
      "CREATE TABLE users(id int(11) UNSIGNED NOT NULL,FirstName varchar(100) NOT NULL,LastName varchar(100) DEFAULT NULL,Email varchar(320) NOT NULL,Password varchar(62) NOT NULL,status enum('0','1') NOT NULL DEFAULT '1' COMMENT '1=Active, 0=InActive',addedOn datetime NOT NULL DEFAULT current_timestamp(),updatedOn timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;"
    )
  );

  await Promise.all(promises).catch((err) => {
    console.log(err);
  });

  let promises1 = [];
  promises1.push(
    execQuery(
      "INSERT INTO settings(id, IsNotificationEnabled, IsNewDashboardEnabled, Timezone, addedOn, updatedOn) VALUES(1, '1', '1', 'Asia/Calcutta', '2024-04-30 15:58:16', '2024-04-30 10:28:16');"
    )
  );
  promises1.push(
    execQuery(
      "INSERT INTO users(id, FirstName, LastName, Email, Password, status, addedOn, updatedOn) VALUES(1, 'Tarun Kumar', 'Sharma', 'phptarun@gmail.com', 'test', '1', '2024-04-30 15:58:53', '2024-04-30 10:28:53');"
    )
  );

  await Promise.all(promises1).catch((err) => {
    console.log(err);
  });

  let promises2 = [];

  promises2.push(execQuery("ALTER TABLE settings ADD PRIMARY KEY (id);"));
  promises2.push(execQuery("ALTER TABLE users ADD PRIMARY KEY (id);"));

  await Promise.all(promises2).catch((err) => {
    console.log(err);
  });

  await Promise.all([
    execQuery(
      "ALTER TABLE settings MODIFY id int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;"
    ),
    execQuery(
      "ALTER TABLE users MODIFY id int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2"
    ),
  ]).catch((err) => {
    console.log(err);
  });
  
  process.exit();
};
const up = () => {
  sql();
};

module.exports = up();
