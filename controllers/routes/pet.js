var Pet = require("../models/pet");

/*
 * GET /pets route to retrieve all the pets.
 */
var getPets = (req, res) => {
    Pet.find((err, pets) => {
        if (err) {
            console.log(i++)
            res.send(err); // :D
            return;
        }
        res.send(pets);
    });
};

/*
 * POST /pets to save a new pet.
 */
var postPet = (req, res) => {
    let pet = req.body;
    if (!pet.name && !pet.status) {
        res.send({
            message: "please input name and status"
        });
    }
    Pet.save(pet, (err, newPet) => {
        if(err) {
            res.send(err);
            return;
        }
        res.send({
            SUCCESS: "Pet successfully added!",
            pet: newPet
        });
    });
};

/*
 * GET /pets/:id route to retrieve a pet given its id.
 */
let getPet = (req, res) => {
    console.log(req.params.id);
    Pet.findById(req.params.id, (err, pet) => {
        if(err) {
            res.send(err);
            return;
        }
        if(pet){
            res.send({
                pet
            });
        }
        else{
            res.send({
                message: "Don't have this pet",    
            });
        }
    })
};

/*
 * DELETE /pets/:id to delete a pet given its id.
 */
let deletePet = (req, res) => {
    Pet.delete(req.params.id, (err, result) => {
        res.json({
            message: "Pet successfully deleted!",
            result
        });
    })
};

/*
 * PUT /pets/:id to update a pet given its id
 */
let updatePet = (req, res) => {
    Pet.update(req.params.id, req.body, (err, pet) => {
        if(err) {
            res.send(err);
            return;
        }        
        res.send({
            SUCCESS: "Pet updated!",
            pet
        });
    })
};

//export all the functions
module.exports = {
    getPets,
    postPet,
    getPet,
    deletePet,
    updatePet
};