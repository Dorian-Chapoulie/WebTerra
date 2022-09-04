const express = require('express');
const router = express.Router();
const heater = require('../heater/heater');

const HEATER_PATH = '/heater';

router.get('/state', (req, res) => {
    const state = heater.getState();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ state }));
});

router.get('/maxtemp', (req, res) => {
    const maxTemp = heater.getMaxTemp();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ maxTemp }));
});

router.post('/maxtemp', (req, res) => {
    const { maxtemp } = req.body;
    heater.setMaxTemp(maxtemp);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ maxtemp }));
});
 

module.exports = router;
module.exports.path = HEATER_PATH;