const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'project',
})

const Check = (sql, callback) => {
  con.connect((err) => {
    con.query(sql, (err, result) => callback(result))
  })
}

const Insert = (tbl, fields, values, callback) => {
  const sql = `INSERT INTO ${tbl} (${fields.join(',')}) VALUES('${values.join("','")}')`;
  Check(sql, callback)
}

const Select = (tbl, field, where, callback) => {
  if (where == '' || where == null || where == undefined) {
    const sql = `SELECT ${field} FROM ${tbl}`;
    Check(sql, callback)
  }else {
    if (where.length == 1) {
      const sql = `SELECT ${field} FROM ${tbl} WHERE ${where[0][0]} = '${where[0][1]}'`;
      Check(sql, callback)
    }else{
      const sql = `SELECT ${field} FROM ${tbl} WHERE ${where[0][0]} = '${where[0][1]}' AND ${where[1][0]} = '${where[1][1]}'`;
      Check(sql, callback)
    }
  }
}

const Update = (tbl, value, where, callback) => {
  const sql = `UPDATE ${tbl} SET ${value[0]} = '${value[1]}' WHERE ${where[0]} = '${where[1]}'`;
  Check(sql, callback)
}

const Delete = (tbl, value, where, callback) => {
  const sql = `DELETE FROM ${tbl} WHERE id = '${value}'`;
  Check(sql, callback)
}

module.exports = { Insert, Select, Update, Delete };
