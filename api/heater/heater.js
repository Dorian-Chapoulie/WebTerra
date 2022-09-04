const Gpio = require('onoff').Gpio;
const heaterGpio = new Gpio(26, 'out');

const heater = {
    state: heaterGpio.readSync() ? true : false,
    maxTemp: {
        day: 30,
        night: 25
    },
};

const setState = state => {
    if(state) heaterGpio.writeSync(1);
    else heaterGpio.writeSync(0);
}
const getState = () => {
    heater.state = heaterGpio.readSync() ? true : false;
    return heater.state;
}

const getMaxTemp = () => heater.maxTemp;

const setMaxTemp = maxTemp => {        
    heater.maxTemp = maxTemp;    
}


module.exports.setState = setState;
module.exports.getState = getState;
module.exports.getMaxTemp = getMaxTemp;
module.exports.setMaxTemp = setMaxTemp;