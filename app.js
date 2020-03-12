const express = require('express');

const ejs = require('ejs');

const bodyparser = require('body-parser');
const {csvHandler} = require('./routes/csvhandler')

// Init app
const app = express();

// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));
app.use(bodyparser());

app.get('/', (req, res) => res.render('index'));

app.post('/upload', csvHandler);
const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));