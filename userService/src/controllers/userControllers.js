const User = require('../models/User');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server error', err: err });
    }
}

exports.updateUser = async (req, res) => {
    const { first_name, last_name, phone_number, password, email } = req.body;
    
    try {
        if(email !== req.user.email) {
            return res.status(400).json({ message: 'Unauthorized User' });
        }

        const updatedUser = await User.updateOne({ email: email }, 
            { $set: { first_name: first_name, 
                    last_name: last_name,
                    phone_number: phone_number,
                    password: password } });

        return res.status(200).json({ message: 'User Successfully Updated', updatedUser });
        
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server error', err: err });
    }
}

exports.deleteUser = async (req, res) => {
    const email = req.body.email;
    try {
        if(email !== req.user.email) {
            return res.status(400).json({ message: 'Unauthorized User' });
        }
        
        await User.deleteOne({ email })
        res.status(200).json({ message: 'User successfully deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server error', err: err });
    }
}

exports.getUserById = async (req, res) => {
    const id = req.body.user_id;
    
    if(req.user._id != id)
        return res.status(400).json({ message: 'User id and auth token id do not match - unauthorized user' });

    try {
        const user = await User.findOne({ _id: id });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}