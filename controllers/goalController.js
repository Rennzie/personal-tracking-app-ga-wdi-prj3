//goals will only be shown to a a specific user
//  they will see all their goals,
//  goals should be soreted by discipline, model?
// const User = require('../models/user');
const Goal = require('../models/goal');

function goalIndex( req, res, next ){
  Goal
    .find()
    // .pupulate('createdBy')
    .then(goals => {
      console.log('The requesting user is ', req.params.userId);

      // const stringyGoals = JSON.stringify(goals);
      // we have the goals, need to filter for the users
      const userGoals = goals.filter(goal => goal.createdBy.equals(req.params.userId));
      // const goalResult = JSON.parse(userGoals);
      // objectId1.equals(objectId2)
      res.json(userGoals);
    })
    .catch(next);
}



module.exports = {
  index: goalIndex
  // show: goalShow
};
