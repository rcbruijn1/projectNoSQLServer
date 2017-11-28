
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Recipe = require('../model/recipe.model');


//
// Geef een lijst van alle ingredienten.
//
routes.get('/recipes', function(req, res) {
    res.contentType('application/json');
    Recipe.find({})
        .then((recipes) => {
        // console.log(ingredients);
        res.status(200).json(recipes);
})
.catch((error) => res.status(401).json(error));
});


//
// Retourneer ��n specifieke ingredient. Hier maken we gebruik van URL parameters.
// Vorm van de URL: http://hostname:3000/api/v1/users/23
//
routes.get('/recipes/:_id', function(req, res) {
    res.contentType('application/json');
    Recipe.findOne({_id: req.params._id},function(err,result){
        res.status(200).json(result);
    });
});



//
// Voeg een ingredient toe. De nieuwe info wordt gestuurd via de body van de request message.
// Vorm van de URL: POST http://hostname:3000/api/v1/ingredients
//
routes.post('/recipes', function(req, res) {
    res.contentType('application/json');
    Recipe.create({name: req.body.name,
        description: req.body.description,
        imagePath: req.body.imagePath,
        ingredients: req.body.ingredients},
        function (err, result) {
        if (err) return res.status(401).json(error);
        res.send(result);

    })

});

//
// Wijzig een bestaande ingredient. De nieuwe info wordt gestuurd via de body van de request message.
// Er zijn twee manieren om de id van de ingredients mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
//
// Vorm van de URL: PUT http://hostname:3000/api/v1/ingredients/23
//

//



//

routes.put('/recipes/:_id', function(req, res) {

    res.contentType('application/json');
    var _id = req.params._id;

    var update = {
        "name": req.body.name,
        "description": req.body.description,
        "imagePath": req.body.imagePath,
        "ingredients": req.body.ingredients
    };

    Recipe.findById(_id)
        .then( recipe => {
            recipe.set(update);
            recipe.save();
            res.status(200).json(recipe);
        })
        .catch((error) => res.status(401).json(error));
});



//
// Verwijder een bestaande ingredient.
// Er zijn twee manieren om de id van de users mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
//
// Vorm van de URL: DELETE http://hostname:3000/api/v1/ingredients/23
//
routes.delete('/recipes/:_id', function(req, res) {

    Recipe.remove({ _id: req.params._id })
        .then(recipe => {
            res.json({status: 200, message: 'Recipe deleted successfully'});
        }).catch(err => {
        res.end('Error occurred while deleting user with id ' + req.params._id, err);
    })


});

module.exports = routes;