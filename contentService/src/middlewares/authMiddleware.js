const jwt = require('jsonwebtoken');
const JWT_SECRET = 'SECRET';

exports.authenticateUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user_id = decoded.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Unauthorized User', error });
    }   
}
