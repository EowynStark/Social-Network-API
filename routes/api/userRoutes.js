const router = require('express').Router();
const {User, Thought} = require('../../models');

// GET all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({error: 'Failed to get users'});
    }
});

// GET a single user by its _id and populated thought and friend data
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findbyId(req.params.id).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({error: 'No user found with this id'});
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({error: 'Failed to get user'});
    }
});

// POST a new user
router.post('/users', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({error: 'Failed to create user'});
    }
});

// PUT to update a user by its _id
router.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedUser) {
            return res.status(404).json({error: 'No user found with this id'});
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({error: 'Failed to update user'});
    }
});

// DELETE to remove user by its _id
// BONUS: Remove a user's associated thoughts when deleted

module.exports = router;