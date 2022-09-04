const light = require('../light/light');
const LIGHT_INTERVAL = 1 * 1000;

const start = () => {
    setInterval(() => {
        const date = new Date();

        if(parseInt(light.getDate().dateOn.hour) === parseInt(date.getHours()) && parseInt(date.getMinutes()) >= parseInt(light.getDate().dateOn.minutes) && !light.getState()) {
            light.setState(true);
        }

        if(parseInt(light.getDate().dateOff.hour) === parseInt(date.getHours()) && parseInt(date.getMinutes()) >= parseInt(light.getDate().dateOff.minutes) && light.getState()) {
            light.setState(false);
        }
        
    }, LIGHT_INTERVAL);
}

module.exports.start = start;
