const express = require('express');
const router = express.Router();
const fan = require('../fan/fan');

const FAN_PATH = '/fan';

router.get('/state', (req, res) => {
    const fanState = fan.getState();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ state: fanState }));
});

router.get('/date', (req, res) => {
    const fanDate = fan.getDate();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ date: fanDate }));
});


router.post('/date', (req, res) => {
    const { date } = req.body;
    fan.setDate(date);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ date: fan.getDate() }));
});

router.post('/:state', (req, res) => {
    const { state } = req.params;
    
    try {
        if (state === 'on') {
            fan.setState(true);
        }else if (state === 'off') {
            fan.setState(false);
        }else {
            throw new Error('Bad state');
        }
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ error: error.message }));
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(true));
});


module.exports = router;
module.exports.path = FAN_PATH;