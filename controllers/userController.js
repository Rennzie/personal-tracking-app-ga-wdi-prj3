//BACK END USER CONTROLLER

const User = require('../models/user');

function userShow( req, res , next){
  User
    .findById(req.params.id)
    .then(user => res.json(user))
    .catch(next);
}

function userUpdate(req, res, next ){
  User
    .findById(req.params.id)
    .then(user => user.set(req.body) )
    .then(user => user.save())
    .then(user => res.status(201).json(user)) //201 is created
    .catch(next);
}

function userIndex( req, res, next ){
  User
    .find()
    .then(users => res.json(users))
    .catch(next);
}

module.exports = {
  show: userShow,
  update: userUpdate,
  index: userIndex //for getting a User id in insomnia
};
