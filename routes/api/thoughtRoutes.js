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

// PUT to update a thought by its _id

// DELETE to remove a thought by its _id

// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value

module.exports = router;