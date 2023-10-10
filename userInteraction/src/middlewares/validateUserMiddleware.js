const axios = require('axios');

exports.validateUser = (req, res, next) => {
    const { user_id } = req.body;
    const url = 'http://api_gateway:3000/userService/user/getUserById'

    // Define the request payload with user_id
    const requestData = {
        user_id: user_id
    };
    
    // Define the headers with auth-token
    const headers = {
        'auth-token': req.header('auth-token')
    };
    
    // Make an Axios POST request to the URL with headers and request payload
    try {
        axios.post(url, requestData, { headers: headers })
        .then(response => {
            req.user = response.data;
            next();
        })
        .catch(error => {
            return res.status(400).json({ error });
        });    
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    
}