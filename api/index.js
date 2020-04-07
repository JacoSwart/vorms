const express = require('express')
const mariadb = require('mariadb');

const app = express()
const port = 3000
const pool = mariadb.createPool({
  host: '127.0.0.1', 
  user:'vorms', 
  password: 'myPassword',
  connectionLimit: 5
});

app.use(express.static('../frontend'))
app.use(express.json());

app.post('/api/fuel', (req, res) => {
  saveFuelTransaction(req.body);
  res.send();
})

app.get('/api/fuel', (req, res) => {
  getFuelTransactions()
    .then(sqlRes => {
      console.log(sqlRes);
      res.send(sqlRes);
    });
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


// ___________________________________________________________
async function saveFuelTransaction(fuel) {
  let date = jsDatetoSQLDate(new Date(fuel.date));
  console.log(date)
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(
      "INSERT INTO `vorms`.`fuel` (`liters`, `amount`, `vehicle`, `date`, `jobcard`) VALUES (?, ?, ?, ?, ?);", 
      [fuel.liters, fuel.amount, fuel.vehicle, date, fuel.jobcard]
      );
    } catch (err) {
      console.log(err)
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  }

async function getFuelTransactions() {
  return new Promise(async resolve => {
    try {
      conn = await pool.getConnection();
      const res = await conn.query(
        "SELECT * FROM vorms.fuel ORDER BY date asc LIMIT 30;"
        );
      resolve(JSON.stringify(res));
    } catch (err) {
      console.log(err)
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  });
}
  
  function jsDatetoSQLDate(date) {
    return date.getFullYear() + "/" + padZeros((date.getMonth() + 1)) + "/" + padZeros(date.getDate());
  }
  
  function padZeros(str_p) {
    if (str_p > 9) {
      return str_p;
    } else {
      return "0" + str_p;
    }
  }