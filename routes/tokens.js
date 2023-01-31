//@ts-check
var express = require('express');
const jwtService = require('../service/jwt.service');
var router = express.Router();

router.get('/', async function (req, res, next) {
    const data = await jwtService.getAllRefreshTokens();
    res.send(data);
});

module.exports = router;