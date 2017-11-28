//
// ./api/v1/user.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var User = require('../model/user.model');

//
// Geef een lijst van alle users.
//
routes.get('/users', function(req, res) {
    res.contentType('application/json');
    User.find({})
        .then((users) => {
        // console.log(users);
        res.status(200).json(users);
})
.catch((error) => res.status(401).json(error));
});

//
// Retourneer één specifieke users. Hier maken we gebruik van URL parameters.
// Vorm van de URL: http://hostname:3000/api/v1/users/23
//
routes.get('/users/:_id', function(req, res) {
    res.contentType('application/json');
    User.findOne({_id: req.params._id},function(err,result){
        res.status(200).json(result);
    });
});

//
// Voeg een user toe. De nieuwe info wordt gestuurd via de body van de request message.
// Vorm van de URL: POST http://hostname:3000/api/v1/users
//
routes.post('/users', function(req, res) {
    res.contentType('application/json');
    User.create({name: req.body.name,
        imagePath: req.body.imagePath},
        function (err, result) {
            if (err) return res.status(401).json(error);
            res.send(result);
        })
});

//
// Wijzig een bestaande user. De nieuwe info wordt gestuurd via de body van de request message.
// Er zijn twee manieren om de id van de users mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
//
// Vorm van de URL: PUT http://hostname:3000/api/v1/users/23
//
routes.put('/users/:_id', function(req, res) {

    res.contentType('application/json');
    var _id = req.params._id;

    var update = {
        "name": req.body.name,
        "imagePath": req.body.imagePath
    };

    User.findById(_id)
        .then( user => {
            user.set(update);
            user.save();
            res.status(200).json(user);
        })
        .catch((error) => res.status(401).json(error));
});

//
// Verwijder een bestaande user.
// Er zijn twee manieren om de id van de users mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
//
// Vorm van de URL: DELETE http://hostname:3000/api/v1/users/23
//
routes.delete('/users/:_id', function(req, res) {

    User.remove({ _id: req.params._id })
        .then(user => {
        res.json({status: 200, message: 'User deleted successfully'});
}).catch(err => {
        res.end('Error occurred while deleting user with id ' + req.params._id, err);
})

});

module.exports = routes;