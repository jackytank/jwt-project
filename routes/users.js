//@ts-check
var express = require('express');
var router = express.Router();
const userService = require('../service/user.service');



/* GET users listing. */
router.get('/', async function (req, res, next) {
  const users = await userService.getAll();
  res.send(users);
});

module.exports = router;
