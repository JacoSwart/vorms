const express = require('express')
const app = express()

app.get('/hello', (req, res) => {
	res.sendFile('User damage.htm');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))