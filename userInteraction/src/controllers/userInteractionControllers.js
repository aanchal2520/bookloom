const axios = require('axios');
const mongoose = require('mongoose');

const UserInteraction = require('../models/UserInteraction');

exports.getLikeCount = async (req, res) => {
    if(req.user === null) {
        return res.status(400).json({ message: 'Invalid user' });
    }
    
    const { book_id } = req.body;
    
    try {
        const like_array = await UserInteraction.find({ book_id: book_id, interaction: 'LIKE' });
        const like_count = like_array.length;

        console.log(like_count);
        return res.status(200).json({ book_id, like_count });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

exports.getReadCount = async (req, res) => {
    if(req.user === null) {
        return res.status(400).json({ message: 'Invalid user' });
    }

    const { book_id } = req.body;

    try {
        const read_array = await UserInteraction.find({ book_id: book_id, interaction: 'READ' });
        const read_count = read_array.length;
       
        return res.status(200).json({ book_id, read_count });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

exports.updateLikeCount = async (req, res) => {
    if(req.user === null) {
        return res.status(400).json({ message: 'Invalid user' });
    }

    const { book_id, user_id } = req.body;

    try {
        const event = await UserInteraction.findOne({ book_id, user_id, interaction: 'LIKE' });

        if(event) {
            await UserInteraction.deleteOne({ book_id, user_id, interaction: 'LIKE' });
            return res.status(200).json({ message: 'User removed like on the book', book_id });
        } else {
            const newLikeEvent = new UserInteraction({ user_id, book_id, interaction: 'LIKE' });
            await newLikeEvent.save();

            if(newLikeEvent) 
                return res.status(200).json({ message: 'User like event regestered successfully' });
            else
                return res.status(500).json({ message: 'Internal server erroor' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.updateReadCount = async (req, res) => {
    if(req.user === null) {
        return res.status(400).json({ message: 'Invalid user' });
    }

    const { book_id, user_id } = req.body;

    try {
        const event = await UserInteraction.findOne({ book_id, user_id, interaction: 'READ' });

        if(event) {
            await UserInteraction.deleteOne({ book_id, user_id, interaction: 'READ' });
            return res.status(200).json({ message: 'User marked book as unread', book_id });
        } else {
            const newLikeEvent = new UserInteraction({ user_id, book_id, interaction: 'READ' });
            if(newLikeEvent) 
                return res.status(200).json({ message: 'User read event regestered successfully' });
            else
                return res.status(500).json({ message: 'Internal server erroor' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getPopularContent = async (req, res) => {

    try {
        const top10Books = await UserInteraction.aggregate([
            {
                $match: {
                    interaction: { $in: ['LIKE', 'READ'] }
                }
            },
            {
                $group: {
                    _id: '$book_id',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 10
            }
        ]);
        
        console.log('Top 10 books:', top10Books);
        return res.status(200).json(top10Books);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}