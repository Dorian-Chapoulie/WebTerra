const express = require('express');
const router = express.Router();
const Light = require('../light/light');

const LIGHT_PATH = '/light';

router.get('/state', (req, res) => {
    const lightState = Light.getState();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ state: lightState }));
});
 
router.get('/date', (req, res) => {
    const lightDate = Light.getDate();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ date: lightDate }));
});
 
router.post('/date', (req, res) => {
    const { date } = req.body;
    Light.setDate(date);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ date: Light.getDate() }));
});

router.post('/:state', (req, res) => {
    const { state } = req.params;
    
    try {
        if (state === 'on') {
            Light.setState(true);
        }else if (state === 'off') {
            Light.setState(false);
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
module.exports.path = LIGHT_PATH;