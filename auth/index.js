 const jwt = require('jsonwebtoken');
 const config = require('../config');
 const error=require(`../utils/error`);

 let secret = config.jwt.secret;

 function sign(data) {
    return jwt.sign(data[0], secret,{ expiresIn: 100 });
}

function verify(token) {
    return jwt.verify(token, secret)
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
 
        if (decoded.id !== owner) {
            throw error('No puedes hacer esto',401);
            // throw new Error('No puedes hacer esto');
        }
    },
}

function getToken(auth) {
    if (!auth) {
        throw error('No viene un token',401)
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw error('Formato invalido',401);
    }

    let token = auth.replace('Bearer ', '');
    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}


module.exports = {
    sign,
    check,
    getToken,
};