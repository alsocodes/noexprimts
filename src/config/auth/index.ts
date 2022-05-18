const config = {
    accessSecret: process.env.ACCESS_TOKEN_SECRET_KEY || 'loremipsum',
    refreshSecret: process.env.REFRESH_TOKEN_SECRET_KEY || 'loremipsum',
    jwtExp: '60s',
    jwtRefreshExp: '1h',
};

export default config;
