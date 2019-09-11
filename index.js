const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Pool = require('pg').Pool;

var PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'crowd-dj',
  password: '',
  post: 5432
});

// const queryString = "COPY hubspot_data(dealname,property_address,listing_agent,property_type_of_use,buyer_seller_or_investor) FROM 'D:\\work\\heroku-postgres\\hubspot-deal-data.csv' DELIMITER ',' CSV HEADER";
const queryString = "INSERT INTO events(event_name, dj_name, size) VALUES('2019 House party', 'dj spike', 1)";
pool.query(queryString,(error, results) => {
	if(error) throw error;
	else console.log(results);
	pool.end();
})


app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/create_party', function(req,res) {

})

app.post('/create_party', function(req,res) {
	var data = req.body;
	console.log(data);
})

app.post('/join_party', function(req,res) {
	var data = req.body;
	console.log(data);
})


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));