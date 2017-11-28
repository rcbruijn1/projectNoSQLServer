
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Ingredient = require('../model/ingredient.model');

//
// Geef een lijst van alle ingredienten.
//
routes.get('/ingredients', function(req, res) {
    res.contentType('application/json');
    Ingredient.find({})
        .then((ingredients) => {
            // console.log(ingredients);
            res.status(200).json(ingredients);
        })
        .catch((error) => res.status(401).json(error));
});

//
// Retourneer ��n specifieke ingredient. Hier maken we gebruik van URL parameters.
// Vorm van de URL: http://hostname:3000/api/v1/users/23
//
routes.get('/ingredients/:id', function(req, res) {

});

//
// Voeg een ingredient toe. De nieuwe info wordt gestuurd via de body van de request message.
// Vorm van de URL: POST http://hostname:3000/api/v1/ingredients
//
routes.post('/ingredients', function(req, res) {

});

//
// Wijzig een bestaande ingredient. De nieuwe info wordt gestuurd via de body van de request message.
// Er zijn twee manieren om de id van de ingredients mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
//
// Vorm van de URL: PUT http://hostname:3000/api/v1/ingredients/23
//
routes.put('/ingredients/:id', function(req, res) {

});

//
// Verwijder een bestaande ingredient.
// Er zijn twee manieren om de id van de users mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
//
// Vorm van de URL: DELETE http://hostname:3000/api/v1/ingredients/23
//
routes.delete('/ingredients/:id', function(req, res) {

});

module.exports = routes;