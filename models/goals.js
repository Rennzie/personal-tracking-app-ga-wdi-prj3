const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const goalSchema = mongoose.Schema({
  addedBy: {type: ObjectId, ref: 'User'},
  completedHrs: Number, //accumulation of events completed duration
  discipline: { type: String, required: true }, //mind, body, soul
  goalMonth: String, //if we user the current month then timestamps takes care of this
  targetHrs: Number //supplied by user

}, { timestamps: true });

//VIRTUALS
//  --> updateAccumulatedHours

//  --> goalHoursRemaining

//  --> daysToCompleteGoalRemaining

module.exports = mongoose.model('Goal', goalSchema);
