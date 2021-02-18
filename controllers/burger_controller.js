// Require express and models
const express = require('express');
const burger = require('../models/burger');
// Create router function
const router = express.Router();
// Home route
router.get('/', (req, res) => {
    burger.selectAll(function(data) {
        const hbsObject = {
            burgers: data
        };
        res.render('index', hbsObject);
    })
});

router.post('/api/burgers', (req, res) => {
    burger.insertOne(['burger_name', 'devoured'], [req.body.burger_name, req.body.devoured], (result) => {
        res.json({ id: result.insertId })
    })
});
// Route for individual burgers by their id
router.put('/api/burgers/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;

    burger.updateOne(
        {
            devoured: req.body.devoured
        },
        condition,
        (result) => {
            if(result.changedRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    )
});

module.exports = router;