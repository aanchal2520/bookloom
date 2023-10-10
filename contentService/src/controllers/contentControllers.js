const axios = require('axios');
const Book = require('../models/Book');

// get all the content
exports.getContent = async (req, res) => {
    try {
        const content = await Book.find();
        res.status(200).json(content);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// add new content
exports.addContent = async (req, res) => {
    const { user_id, title, story } = req.body;

    try {
        if(req.user_id !== user_id) {
            return res.status(400).json({ message: 'Unauthorized user' });
        }

        const book = await Book.findOne({ title });
        if(book == null) {
            const params = { user_id: user_id, 
                title: title,
                story: story,
                date_published: new Date() };

            const newBook = new Book(params);
            await newBook.save();

            res.status(200).json({ message: 'Content successfully added' });
        } else {
            res.status(400).json({ message: 'Content with same title already exists' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.updateContent = async (req, res) => {
    const { user_id, title, story } = req.body;

    try {
        if(req.user_id !== user_id) {
            return res.status(400).json({ message: 'Unauthorized user' });
        }

        const book = await Book.findOne({ title, user_id });

        if(book) {
            const updatedBook = await Book.updateOne({ title: title, user_id: user_id },
                { $set: { story: story } });
            
            return res.status(200).json({ message: 'Book successfully updated', book: updatedBook });
        } else {
            return res.status(400).json({ message: 'User has no such book' })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.deleteContent = async (req, res) => {
    const { title, user_id } = req.body;
    try {
        if(req.user_id !== user_id) {
            return res.status(400).json({ message: 'Unauthorized user' });
        }

        const book = await Book.findOne({ title: title, user_id: user_id });

        if(book != null) {
            await Book.deleteOne({ title });
            return res.status(200).json({ message: 'Book successfully deleted' });
        } else {
            return res.status(400).json({ message: 'Book does not exist' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getLatestContent = async (req, res) => {
    try {
        const newBooks = await Book.find()
            .sort({ date_published: -1 })  // Sort by date_published in descending order (newest first)
            .limit(10); 
        
        return res.status(200).json(newBooks);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getTopContent = (req, res) => {
    const url = 'http://api_gateway:3000/userInteractionService/userInteraction/getPopularContent';
    const { user_id } = req.body;

    if(req.user_id !== user_id) {
        return res.status(400).json({ message: 'Unauthorized user' });
    }

    const requestData = {
        user_id: user_id
    };

    const headers = {
        'auth-token': req.header('auth-token')
    };

    try {
        axios.post(url, requestData, { headers: headers })
        .then(response => {
            console.log(response.data);
            return res.status(200).json({ topContent: response.data });
        })
        .catch(error => {
            return res.status(400).json({ error });
        });    
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    
}