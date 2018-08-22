const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const moment = require('moment');

const goalSchema = mongoose.Schema({
  createdBy: { type: ObjectId, ref: 'User' },
  mindTarget: { type: Number, default: 0 },
  bodyTarget: { type: Number, default: 0 },
  soulTarget: { type: Number, default: 0 },
  mindCompleted: { type: Number, default: 0 },
  bodyCompleted: { type: Number, default: 0 },
  soulCompleted: { type: Number, default: 0 }
}, { timestamps: true });

// make sure the virtuals get added
goalSchema.set('toObject', { virtuals: true });
goalSchema.set('toJSON', { virtuals: true });

//METHODS
//  --> updateAccumulatedHours

goalSchema.methods.incrementHours = function(loggedHours){
  this.mindCompleted += loggedHours.mindCompleted;
  this.bodyCompleted += loggedHours.bodyCompleted;
  this.soulCompleted += loggedHours.soulCompleted;

  return this.save();
};

goalSchema.methods.updateTargets = function(newTargets){
  this.mindTarget = newTargets.mindTarget;
  this.bodyTarget = newTargets.bodyTarget;
  this.soulTarget = newTargets.soulTarget;

  return this.save();
};

//VIRTUALS
//  --> goalHoursRemaining

goalSchema.virtual('timeToBodyGoal')
  .get( function()  {
    const remaining = this.bodyTarget - this.bodyCompleted;
    if(remaining >= 0) return remaining;
    if(remaining <= 0) return 0;
  });
goalSchema.virtual('timeToMindGoal')
  .get( function()  {
    const remaining = this.mindTarget - this.mindCompleted;
    if(remaining >= 0) return remaining;
    if(remaining <= 0) return 0;
  });
goalSchema.virtual('timeToSoulGoal')
  .get( function()  {
    const remaining = this.soulTarget - this.soulCompleted;
    if(remaining >= 0) return remaining;
    if(remaining <= 0) return 0;
  });

goalSchema.virtual('goalMonth')
  .get(function(){
    const momObj = moment(this.createdAt);
    return moment(momObj).format('MMMM');
  });


// - save the goal month as the last day of the month
// - return the month to the user to display on home page depending on the current month
// - virtual can calculate the diff btwn current data and end of month saved month
// - display this as days to go to end of month

// - only let user put new goals in if there are no goals for that MONTH
// - alternately, let them edit the goals
// - they should also be able to log time: this should be a seperate route handeled by editCTRL in the front end

//convert month to a moment object
//get differnce between todays date and end of month of give date
// goalSchema.virtual('dayRemaining')
//   .get(function(){
//
//   });


//  --> daysToCompleteGoalRemaining

module.exports = mongoose.model('Goal', goalSchema);
