const express = require('express');
const moment = require('moment');
const router = express.Router();
const DHT = require('../DHT/dht');
const bdd = require('../services/ths');

const DHT_PATH = '/dht';


router.get('/temp', (req, res) => {
    DHT.readSensor();
    const temperature = DHT.getTemperature();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ temp: temperature }));
});

router.get('/history/data', (req, res) => {
    bdd.getData(0).then(rows => {
        const data = [];        
        rows.forEach(line => {
            data.push({
                date: moment(line.date).format("MM-DD HH:mm"),
                temperature: line.temp,
                humidity: line.humidity,
            });
        });        
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ data }));
    });   
});

router.get('/history/data/:limit', (req, res) => {
    const { limit } = req.params;
    const parsedLimit = isNaN(parseInt(limit, 10)) ? 0 : parseInt(limit, 10);    
    bdd.getData(0, parsedLimit).then(rows => {
        const data = [];        
        rows.forEach(line => {
            data.push({
                date: moment(line.date).format("MM-DD HH:mm"),
                temperature: line.temp,
                humidity: line.humidity,
            });
        });        
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ data }));
    });   
});

router.get('/humidity', (req, res) => {
    DHT.readSensor();
    const humidity = DHT.getHumidity();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ humidity: humidity }));
});

router.get('/history/temp', (req, res) => {
    DHT.readSensor();
    const humidity = DHT.getHumidity();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ humidity: humidity }));
});

module.exports = router;
module.exports.path = DHT_PATH;