const express = require('express');
const app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));