const express = require('express');
const bodyParser = require('body-parser');
const mc = require('./controllers/countries_controller');



const app = express();
app.use(express.static('public'));
app.use( bodyParser.json() );

app.get('/api/allCountries', mc.read)
app.post('/api/addCountries', mc.create)
app.delete('/api/deleteCountries/:id', mc.delete)
app.delete('/api/deleteAll', mc.deleteAll)
app.put('/api/editReview/:id', mc.update)

app.get('/api/reloadAll', mc.reloadAll)

// app.post('/api/', stuff.addCharacter)
// app.delete('/api/deletecharacters/:id', stuff.deleteCharacter)
// app.put('/api/editcharacters/', stuff.editCharacter)


const Port = 4000;
app.listen(4000, ()=> console.log('server running on port 4000'));