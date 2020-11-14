var express = require('express');
var auth = require('./auth');
var router = express.Router();

//daftarkan menu registrasi
router.post('/api/v1/register', auth.register);
router.post('/api/v1/masuk', auth.masuk);

module.exports = router;