const Gpio = require('onoff').Gpio;
const lightGpio = new Gpio(20, 'out');

const light = {
    date: {
        dateOn: {
            hour: '10',
            minutes: '00',
        },
        dateOff: {
            hour: '22',
            minutes: '00',
        },
    },
    state: lightGpio.readSync() ? true : false,
};

const setDate = newDate => {
    light.date = newDate;
} 
const getDate = () => light.date;

const setState = state => {
    if(state) lightGpio.writeSync(1);
    else lightGpio.writeSync(0);
}
const getState = () => lightGpio.readSync() ? true : false;


module.exports.setDate = setDate;
module.exports.getDate = getDate;
module.exports.setState = setState;
module.exports.getState = getState;