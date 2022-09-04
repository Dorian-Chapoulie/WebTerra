const DHT = require('../DHT/dht');
const bdd = require('../services/ths');

const DHT_INTERVAL = 1 * 1000; //30mn
const DHT_INTERVAL_BDD = 1800 * 1000; //30mn



const start = () => {   
    setInterval(() => {
        DHT.readSensor();        
    }, DHT_INTERVAL);

    updloadToBDD();
}

const updloadToBDD = () => {
    setInterval(() => {          
        if(DHT.data.temperature != 0) {
            bdd.addData(DHT.data.temperature, DHT.data.humidity);
        }
    }, DHT_INTERVAL_BDD);
}

module.exports.start = start;
