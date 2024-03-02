const router = require('express').Router();
const {Thought, User, Reaction} = require('../../models');

// GET all thoughts
router.get('/thoughts', async (req, res) => {
    try {
        const thoughts = await Thought.find({});
        res.json(thoughts);
    } catch (err) {
        res.status(500).json({error: 'Failed to get thoughts'});
    }
});

// GET a single thought by its _id
router.get('/thoughts/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) {
            return res.status(404).json({error: 'No thought found with this id'});
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json({error: 'Failed to get thought'});
    }
});

// POST to create a new thought
router.post('/thoughts', async (req, res) => {
    try {
        const {thoughtText, username, userId } = req.body;
        const thought = await Thought.create({thoughtText, username});
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({error: 'No user found with this id'});
        }
        user.thoughts.push(thought._id);
        await user.save();
        res.status(201).json(thought);
    } catch (err) {
        res.status(400).json({error: 'Failed to create thought'});
    }
});

// PUT to update a thought by its _id
router.put('/thoughts/:id', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedThought) {
            return res.status(404).json({error: 'No thought found with this id'});
        }
        res.json(updatedThought);
    } catch (err) {
        res.status(400).json({error: 'Failed to update thought'});
    }
});

// DELETE to remove a thought by its _id

// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value

module.exports = router;