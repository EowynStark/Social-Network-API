const router = require('express').Router();
const {User, Thought, Reaction} = require('../../models');

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
        const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
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
        console.log(err);
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
        console.log(err);
        res.status(400).json({error: 'Failed to update user'});
    }
});

// DELETE to remove user by its _id
router.delete('/users/:id', async (req, res) => {
    try { 
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({error: 'No user found with this id'});
        }
        // BONUS: Remove a user's associated thoughts when deleted
        await Thought.deleteMany({username: deletedUser.username});
        res.json(deletedUser);
    } catch (err) {
        console.log(err);
        res.status(400).json({error: 'Failed to delete user'});
    }
});

// POST to add a new friend to a user's friend list
router.post('/users/:userId/friends/:friendId', async (req, res) => {
    try {
        const {userId, friendId} = req.params;
        if (!userId || !friendId) {
            return res.status(400).json({error: 'Invalid user or friend id'});
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({error: 'No user found with this id'});
        }
        if (user.friends.includes(friendId)) {
            return res.status(400).json({error: 'User already has this friend in their list'});
        }
        user.friends.push(friendId);
        await user.save();
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(400).json({error: 'Failed to add friend'});
    }
});

// DELETE to remove a friend from a user's friend list
router.delete('/users/:userId/friends/:friendId', async (req, res) => {
    try {
        const {userId, friendId} = req.params;
        console.log(req.params);
        if (!userId || !friendId) {
            console.error('Invalid user or friend id', error);
            return res.status(400).json({error: 'Invalid user or friend id'});
        }
        const user = await User.findById(userId);
        if (!user) {
            console.error('No user found with this id', error);
            return res.status(404).json({error: 'No user found with this id'});
        }
        if (!user.friends.includes(friendId)) {
            console.error('Friend not found in user friend list', error);
            return res.status(400).json({error: 'Friend not found in user friend list'});
        }
        user.friends.pull(friendId);
        await user.save();
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(400).json({error: 'Failed to remove friend'});
    }
});

module.exports = router;