const sensor = require("node-dht-sensor");

const SENSOR_TYPE = 11;
const SENSOR_PIN = 12;
// black: +3.3v, white: ground, grey: data 

const data = {
    temperature: 0,
    humidity: 0,
};

const readSensor = () => {
    sensor.read(SENSOR_TYPE, SENSOR_PIN, function(err, temperature, humidity) {
        if (!err) {
            data.temperature = temperature;
            data.humidity = humidity;                        
        }
    });
}

const getTemperature = () => data.temperature;
const getHumidity = () => data.humidity;


module.exports.getTemperature = getTemperature;
module.exports.getHumidity = getHumidity;
module.exports.readSensor = readSensor;
module.exports.data = data;