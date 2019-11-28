const jwt = require('jsonwebtoken');
const secretKey = 'ab3ab964804dc9ae20de3b02d379b1bd';

exports.verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send({'mensagem': 'acesso negado, sem token'});

    try {
        const verificado = jwt.verify(token, secretKey);
        req.user = verificado;
        next();
    } catch (err) {
        return res.status(400).send({'mensagem': 'token inválido'});
    }
};


