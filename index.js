const express = require('express');
const mongoose = require('mongoose');

const indexRoutes = require('./routes');
const userRoutes = require('./routes/api/userRoutes');
const thoughtRoutes = require('./routes/api/thoughtRoutes');

const app = express();


app.use(express.json());

mongoose.connect('mongodb://localhost/socialNetwork', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Database connection error', err));
    app.use(indexRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/thoughts', thoughtRoutes);
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something went wrong!');
    });

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});