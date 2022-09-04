const express = require('express');
const cors = require('cors');
const app = express();

const light = require('./routes/light');
const fan = require('./routes/fan');
const dht = require('./routes/dht');
const heater = require('./routes/heater');
const lambda = require('./lambda');

app.use(cors());
app.use(express.json());  


app.use(light.path, light);
app.use(fan.path, fan);
app.use(dht.path, dht);
app.use(heater.path, heater);


app.listen(8080);
console.log("Server started on port 8080");