const lightLambda = require('./light');
const fanLambda = require('./fan');
const dhtLambda = require('./dht');
const heaterLambda = require('./heater');

lightLambda.start();
fanLambda.start();
dhtLambda.start();
heaterLambda.start();
