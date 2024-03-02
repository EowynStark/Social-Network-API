const mongoose = require('mongoose');
const { User, Thought, Reactions } = require('../models');
const usersData = require('./usersData');
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
    await Reactions.deleteMany();

    await User.insertMany(usersData);
    await Thought.insertMany(thoughtsData);
    await Reactions.insertMany(reactionsData);
    console.log('Data seeded');
} catch (err) {
    console.error('Failed to seed database', err);
} finally {
   mongoose.connection.close();
}
};

seedData();