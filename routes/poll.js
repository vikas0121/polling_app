const express = require('express');
const router = express.Router();
const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '468248',
    key: '0bb466869b1cbde103be',
    secret: '775c189f138b5b3a830c',
    cluster: 'ap2',
    encrypted: true
});


router.get('/', (req, res) => {
    res.send('poll');
});

router.post('/', (req, res) => {
    pusher.trigger('os-poll', 'os-vote', {
        points: 1,
        os: req.body.os
    });
    return res.json({ success: true, message: 'Thanks for vote !!!' });
});

module.exports = router;