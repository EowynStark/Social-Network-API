const { Mongoose, mongo } = require("mongoose");

const reactionData = [
    {
        reactionId: Mongoose.Types.ObjectId(),
        reactionBody: 'This is a great idea!',
        username: 'mikeTest',
        createdAt: new Date()
    },
    {
        reactionId: Mongoose.Types.ObjectId(),
        reactionBody: 'I love this idea!',
        username: 'daveTest',
        createdAt: new Date()
    },
    {
        reactionId: Mongoose.Types.ObjectId(),
        reactionBody: 'Best idea ever!',
        username: 'joeTest',
        createdAt: new Date()
    },
    {
        reactionId: Mongoose.Types.ObjectId(),
        reactionBody: 'You guys are so smart!',
        username: 'emmyTest',
        createdAt: new Date()
    },
];

module.exports = reactionData;
