const express = require('express');
const router = express.Router();
const User = require('../model/model.js'); 

router.post('/users', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/getAll', (req, res) => {
    res.send('Get All API')
})

router.get('/getOne/:id', (req, res) => {
    res.send(req.params.id)
})

router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

module.exports = router;
