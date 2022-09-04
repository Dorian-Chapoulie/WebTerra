const heater = require('../heater/heater');
const dhtSensor = require('../DHT/dht');
const light = require('../light/light');
const fan = require('../fan/fan');

const HEATER_INTERVAL = 1 * 1000;
const GAP = 2;

const start = () => {     
    setInterval(() => {        
        if(light.getState()) { //DAY
            if(dhtSensor.getTemperature() >= heater.getMaxTemp().day) {                
                heater.setState(false);
                //fan.setState(true);
            } else if(!heater.getState() && dhtSensor.getTemperature() <= heater.getMaxTemp().day - GAP) {                
                heater.setState(true);
                fan.setState(false);
            }            
        }else { //NIGHT
            if(dhtSensor.getTemperature() >= heater.getMaxTemp().night) {                
                heater.setState(false);
                //fan.setState(true);
            } else if(!heater.getState() && dhtSensor.getTemperature() <= heater.getMaxTemp().night - GAP) {
                heater.setState(true);
                fan.setState(false);
            }   
        }                
    }, HEATER_INTERVAL);
}

module.exports.start = start;
