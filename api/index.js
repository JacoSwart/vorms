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
      res.send(sqlRes);
    });
});

app.post('/api/trips', (req, res) => {
  saveTripTransaction(req.body);
  res.send();
});

app.get('/api/trips', (req, res) => {
  getTripTransactions()
    .then(sqlRes => {
      res.send(sqlRes);
    });
});

app.get('/api/trips/download', (req, res) => {
  getTripTransactions()
    .then(sqlRes => {
      res.setHeader('Content-disposition', 'attachment; filename=ritstaat.csv');
      res.send(jsonToCSV(sqlRes));
    });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));


async function saveFuelTransaction(fuel) {
  let date = jsDatetoShortDate(new Date(fuel.date));
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
        "SELECT * FROM vorms.fuel ORDER BY date asc;"
        );
      resolve(JSON.stringify(res));
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  });
}

async function saveTripTransaction(trip) {
  let date = jsDatetoShortDate(new Date(trip.date));
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(
      "INSERT INTO `vorms`.`trips` (\
        `date`, \
        `departure`, \
        `destination`,\
        `startodo`,\
        `endodo`,\
        `totalkm`,\
        `pvtkm`,\
        `client`,\
        `tollgates`,\
        `vehicle`\
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", 
      [
        date, 
        trip.departure, 
        trip.destination, 
        trip.startodo, 
        trip.endodo, 
        trip.endodo - trip.startodo, 
        trip.pvtkm, 
        trip.client, 
        trip.tollgates, 
        trip.vehicle
      ]
      );
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  }  

  async function getTripTransactions() {
    return new Promise(async resolve => {
      try {
        conn = await pool.getConnection();
        let res = await conn.query(
          "SELECT \
          `date`, \
          `departure`, \
          `destination`,\
          `startodo`,\
          `endodo`,\
          `totalkm`,\
          `pvtkm`,\
          `client`,\
          `tollgates`,\
          `vehicle`\
          FROM vorms.trips ORDER BY date asc;"
          );
          res = res.map(line => {
            line.date = jsDatetoShortDate(line.date);
            return line;
          });
        resolve(JSON.stringify(res));
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        if (conn) return conn.end();
      }
    });
  }

  function jsDatetoShortDate(date) {
    return date.getFullYear() + "/" + padZeros((date.getMonth() + 1)) + "/" + padZeros(date.getDate());
  }

  function jsonToCSV(data) {
    const items = JSON.parse(data);
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(items[0]);
    let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    csv = csv.join('\r\n');
    return csv;
  }
  
  function padZeros(str_p) {
    if (str_p > 9) {
      return str_p;
    } else {
      return "0" + str_p;
    }
  }