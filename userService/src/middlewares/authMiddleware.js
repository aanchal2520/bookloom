const jwt = require('jsonwebtoken');
const JWT_SECRET = 'SECRET';
const User = require('../models/User');

exports.authenticateUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id });
        
        if(user == null) 
            return res.status(400).json({ message: "Invalid user" });

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Unauthorized User', error });
    }   
}
