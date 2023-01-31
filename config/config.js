const myConfig = {
    jwt: {
        TOKEN_SECRET: 'ThisIsVerySecretString',
        REFRESH_SECRET: 'AndAgainVeryConfidentialString',
        TOKEN_EXPIRE: 5,
        REFRESH_EXPIRE: 100
    },
    app: {
        COOKIE_SECRET: 'MySecretCookieString'
    }
};

module.exports = myConfig;