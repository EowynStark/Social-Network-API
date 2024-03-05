const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');
const usersData = require('./userData');
const thoughtsData = require('./thoughtsData');
const reactionsData = require('./reactionsData');

if (mongoose.connection.readyState !== 1) {
    mongoose.connect('mongodb://localhost/socialNetwork', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Database connection error', err));
};

async function seedData() {
  try {  await User.deleteMany();
    await Thought.deleteMany();
    await Reaction.deleteMany();

    await User.insertMany(usersData);
    await Thought.insertMany(thoughtsData);
    await Reaction.insertMany(reactionsData);
    console.log('Data seeded');
} catch (err) {
    console.error('Failed to seed database', err);
} finally {
   mongoose.connection.close();
}
};

seedData();