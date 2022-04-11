module.exports.cors = (_, res, next) => {
    const origin = process.env.ORIGIN || '*';
    res.setHeader('Access-Control-Allow-Origin', `${origin}`);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
};