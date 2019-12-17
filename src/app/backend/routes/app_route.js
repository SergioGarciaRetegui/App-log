const express = require('express');
const app = express();
const app_route = express.Router();

// Employee model
let Log = require('../models/Log');

//defining route
// app_route.route(/tproute).get((req,res) => {
//   res.send('This is routing for the application developed using Node and Express...');
//});


// Get All Logs
app_route.route('/').get((req, res) => {
    Log.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Add log
app_route.route('/create').post((req, res, next) => {
    console.log(req.body);
    Log.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

module.exports = app_route;
