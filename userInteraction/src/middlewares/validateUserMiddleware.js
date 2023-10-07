const axios = require('axios');

exports.validateUser = (req, res, next) => {
    const { user_id } = req.body;
    const url = 'http://localhost:3003/user/getUserById'

    // Define the request payload with user_id
    const requestData = {
        user_id: user_id
    };
    
    // Define the headers with auth-token
    const headers = {
        'auth-token': req.header('auth-token')
    };
    
    // Make an Axios POST request to the URL with headers and request payload
    axios.post(url, requestData, { headers: headers })
        .then(response => {
            req.user = response.data;
            next();
        })
        .catch(error => {
            return res.status(400).json({ error });
        });
}