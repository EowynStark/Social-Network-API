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

// PUT to update a user by its _id

// DELETE to remove user by its _id
// BONUS: Remove a user's associated thoughts when deleted

module.exports = router;