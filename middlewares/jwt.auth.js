const express = require('express');
const jwt = require('jsonwebtoken');

const jwt_authentication = async (req, res, next) => {
    const cookie = req.signedCookies['jwt_refresh_cookie'] == null ? null : JSON.parse(req.signedCookies['jwt_refresh_cookie']);
    let is_ok = true;
    const access_token = req.headers.authorization?.split(" ")[1];
    
    return next();

};

module.exports = jwt_authentication;