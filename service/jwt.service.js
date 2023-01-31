//@ts-check
const jwt = require('jsonwebtoken');
const myConfig = require('../config/config');
const refData = require('../mock-db/refresh_tokens.json');

module.exports = new class JwtUtils {
    async getAllRefreshTokens() {
        return refData;
    }

    async generateAccessToken(payload) {
        const access_token_expire = myConfig.jwt.TOKEN_EXPIRE; // 30 mins on prod, 5 secs to test
        const access_token = jwt.sign({ payload }, myConfig.jwt.TOKEN_SECRET, {
            expiresIn: access_token_expire
        });
        return access_token;
    };

    async generateRefreshTokenn(payload) {
        const refresh_token_expire = myConfig.jwt.REFRESH_EXPIRE; // 7 days
        const refresh_token = jwt.sign({ payload }, myConfig.jwt.REFRESH_SECRET, {
            expiresIn: refresh_token_expire
        });
        return refresh_token;
    };
};