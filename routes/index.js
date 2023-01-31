//@ts-check
const express = require('express');
const userService = require('../service/user.service');
const jwt = require('jsonwebtoken');
const myConfig = require('../config/config');
const jwtService = require('../service/jwt.service');
const router = express.Router();


/* GET home page. */
router.get('/', async function (req, res, next) {
  const asd = req.signedCookies['jwt_refresh_cookie'];
  console.log(asd);
  // const xc = req.cookies
  res.render('index', { title: 'Home Page' });
});

router.post('/login', async function (req, res, next) {
  console.log(req.cookies.abc);
  const { redirect } = req.query;
  const { username, password } = req.body;
  const cookie = req.signedCookies['jwt_refresh_cookie'];
  if (cookie) {
    console.log(cookie);
  }
  try {
    const user = await userService.verifyConfidential(username, password);
    if (!user) {
      return res.status(401).json({
        message: 'Failed login credential!'
      });
    }
    const access_token = await jwtService.generateAccessToken(user);
    const refresh_token = await jwtService.generateRefreshTokenn(user);
    res.cookie('jwt_refresh_cookie', refresh_token, {
      secure: true,
      httpOnly: true, // Cookies are vulnerable to XSS attacks. Hackers can read the info in cookies through JS scripts. To prevent, you can set the cookie’s property to HttpOnly
      signed: true,
      sameSite: 'strict' // Cookies are vulnerable to CSRF attacks => set SameSite to Strict
    });
    const _res = res;
    return res.status(200).json({
      message: 'Login successful',
      access_token: access_token
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal server error boi',
      redirect: '/login'
    });
  }
});

router.get('/logout', async function (req, res, next) {
  res.clearCookie('jwt_refresh_cookie');
  const { redirect } = req.query;
  let redirectURL = '/login';
  if (redirect !== undefined) {
    redirectURL += `?redirect=${encodeURIComponent(redirect.toString())}`;
  }
  return res.status(200).json({ message: 'logout success', redirect: redirectURL });
});

module.exports = router;
