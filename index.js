const db = require('./queries.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Pool = require('pg').Pool;

var PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/events', db.getEvents)
app.get('/events/:id', db.getEventById) 
app.get('/events/passcode/:id', db.getEventByPasscode) 
app.post('/events', db.createEvent)
app.put('/events/:id', db.updateEvent)
app.delete('/events/:id', db.deleteEvent)

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));