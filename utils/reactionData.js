const mongoose = require("mongoose");

const reactionData = [
    {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: 'This is a great idea!',
        username: 'mikeTest',
        createdAt: new Date()
    },
    {
        reactionId:  new mongoose.Types.ObjectId(),
        reactionBody: 'I love this idea!',
        username: 'daveTest',
        createdAt: new Date()
    },
    {
        reactionId:  new mongoose.Types.ObjectId(),
        reactionBody: 'Best idea ever!',
        username: 'joeTest',
        createdAt: new Date()
    },
    {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: 'You guys are so smart!',
        username: 'emmyTest',
        createdAt: new Date()
    },
];

module.exports = reactionData;
