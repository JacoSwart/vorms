const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000 // Run on 80 locally, but use Heroku's port in production

app.get('/hello', (req, res) => {
	res.sendFile('User damage.htm');
});

app.listen(PORT, () => console.log('Example app listening on port 5000!'))