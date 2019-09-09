const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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