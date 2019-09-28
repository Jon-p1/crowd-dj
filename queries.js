const Pool = require('pg').Pool
const pool = new Pool({
	user: 'user1',
	host: 'localhost',
	database: 'crowd-dj',
	password: 'dert55',
	port: 5432,
})

const getEvents = (request, response) => {
	pool.query('SELECT * FROM events ORDER BY id ASC', (error, results) => {
		if(error) throw error;

		response.status(200).json(results.rows);
	})
}

const getEventById = (request, response) => {
	const id = parseInt(request.params.id)

	pool.query('SELECT * FROM events WHERE id = $1', [id], (error, results) => {
		if(error) throw error;

		response.status(200).json(results.rows);
	})
}

const getEventByPasscode = (request, response) => {
	const passcode = String(request.params.id)

	pool.query('SELECT * FROM events WHERE passcode = $1', [passcode], (error, results) => {
		if(error) throw error;

		response.status(200).json(results.rows);
	})
}

const createEvent = (request, response) => {
	const {event_name, dj_name, size} = request.body;

	const passcode = generateCodeString();

  	pool.query('INSERT INTO events (event_name, dj_name, size, passcode) VALUES ($1, $2, $3, $4)', [event_name, dj_name, size, passcode], (error, results) => {
    	if (error) throw error

    	response.status(201).send(`Event added with ID: ${results.insertId}`)
  	})	
}

const updateEvent = (request, response) => {
	const id = parseInt(request.params.id)
	const {event_name, dj_name, size} = request.body

	pool.query('UPDATE events SET event_name = $1, dj_name = $2, size= $3 WHERE id = $4',[event_name, dj_name, size, id], (error, results) => {
		if(error) throw error

		response.status(200).send(`User modified with ID: ${id}`);
	})
}

const deleteEvent = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM events WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

function generateCodeString() {
	var string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
	var codeString = '';

	for(var i=0;i<6;i++) {
		var char = string.charAt(Math.floor(Math.random() * string.length));
		codeString += char;
	}
	return codeString;
}

module.exports = {getEvents, getEventById, getEventByPasscode, createEvent, updateEvent, deleteEvent,}