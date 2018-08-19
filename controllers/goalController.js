//goals will only be shown to a a specific user
//  they will see all their goals,
//  goals should be soreted by discipline, model?
//  const User = require('../models/user');
const Goal = require('../models/goal');
const mongoose = require('mongoose');

function goalIndex( req, res, next ){
  Goal
    .find()
    // .pupulate('createdBy')
    .then(goals => {
      // console.log('The requesting user is ', req.params.userId);
      // we have the goals, need to filter by the users id
      const userGoals = goals.filter(goal => goal.createdBy.equals(req.params.userId));

      //return filtered goals to the requester
      res.json(userGoals);
    })
    .catch(next);
}

function goalShow( req, res ,next ){
  Goal
    .findById(req.params.goalId)
    .then(goal => res.json(goal))
    .catch(next);
}

function goalCreate( req, res, next ){
  Goal
    .create(req.body)
    .then(goal => {
      goal.createdBy =  mongoose.Types.ObjectId(req.params.userId);
      // console.log('the ObjId goals userId is=====> ', goal.createdBy);
      goal.set(goal);
      return goal.save();
    })
    .then(goal => res.status(201).json({message: 'Created a new goal', goal}))
    .catch(next);
}

function goalUpdate( req, res, next ){
  Goal
    .findById(req.params.goalId)
    //we have the goal to update
    .then(goal => goal.set(req.body))
    .then(goal => goal.save())
    //goal is updated, send it back to user with 201 (created) status
    .then(goal => res.status(201).json(goal))
    .catch(next);
}

// NOTE: think this works
function goalDelete( req, res, next ){
  Goal
    .findById(req.params.goalId)
    //we have the goal to remove
    .then(goal => goal.remove())
    .then(() => res.sendStatus(204)) //send 204 (removed) as we are not sending json
    .catch(next);
}


module.exports = {
  index: goalIndex,
  show: goalShow,
  create: goalCreate,
  update: goalUpdate,
  delete: goalDelete
};
