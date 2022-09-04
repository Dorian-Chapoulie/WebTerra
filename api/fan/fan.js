const Gpio = require('onoff').Gpio;
const fanGpio = new Gpio(16, 'out');
fanGpio.writeSync(0);

const fan = {
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
    state: false,
};

const setDate = newDate => {
    fan.date = newDate;
} 
const getDate = () => fan.date;

const setState = state => {
    if(state) fanGpio.writeSync(1);
    else fanGpio.writeSync(0);
    fan.state = state;
}
const getState = () => fan.state;


module.exports.setDate = setDate;
module.exports.getDate = getDate;
module.exports.setState = setState;
module.exports.getState = getState;