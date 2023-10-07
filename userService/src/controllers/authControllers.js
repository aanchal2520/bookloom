const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'SECRET';

const User = require('../models/User');

exports.userSignup = async (req, res) => {
    const { email, first_name, last_name, phone_number, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.findOne({ email });
        if(user == null) {
            const params = { email: email, 
                first_name: first_name,
                last_name: last_name,
                phone_number: phone_number,
                password: hashedPassword };

            newUser = new User(params);
            const authToken = jwt.sign({ id: newUser.id }, JWT_SECRET);
            await newUser.save();
        
            res.status(200).json({ authToken: authToken, message: 'User added successfully' });
        }
        else
            res.status(400).json({ message: 'User already exists' });
    }
    catch (err) {
        res.status(500).json({ message: 'Internal Server Error', err: err });
    }
}

// user login
exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if(user) {
            const passwordCompare = bcrypt.compare(password, user.password);
            if(passwordCompare) {
                const authToken = jwt.sign({ id: user.id }, JWT_SECRET);
                return res.status(200).json({ message: 'User successfully logged in', authToken });
            }
            else
                return res.status(400).json({ message: 'Incorrect email or password' });
        } else {
            return res.status(400).json({ message: 'User does not exist' });
        }

    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}
