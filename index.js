const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000; // Run on 5000 locally, but use Heroku's port in production

app.use(express.static(path.join(__dirname, 'static')));

app.listen(PORT, () => console.log('Example app listening on port 5000!'));