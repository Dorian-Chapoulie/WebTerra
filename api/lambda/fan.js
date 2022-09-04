const fan = require('../fan/fan');
const FAN_INTERVAL = 1 * 1000;

const start = () => {
    setInterval(() => {
        const date = new Date();

        if(parseInt(fan.getDate().dateOn.hour) === parseInt(date.getHours()) && parseInt(date.getMinutes()) >= parseInt(fan.getDate().dateOn.minutes) && !fan.getState()) {
            fan.setState(true);
        }

        if(parseInt(fan.getDate().dateOff.hour) === parseInt(date.getHours()) && parseInt(date.getMinutes()) >= parseInt(fan.getDate().dateOff.minutes) && fan.getState()) {
            fan.setState(false);
        }
        
    }, FAN_INTERVAL);
}

module.exports.start = start;
