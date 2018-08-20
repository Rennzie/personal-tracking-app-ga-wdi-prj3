const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const goalSchema = mongoose.Schema({
  createdBy: { type: ObjectId, ref: 'User' },
  month: String, //if we user the current month then timestamps takes care of this
  mindTarget: { type: Number, default: 0 },
  bodyTarget: { type: Number, default: 0 },
  soulTarget: { type: Number, default: 0 },
  mindCompleted: { type: Number, default: 0 },
  bodyCompleted: { type: Number, default: 0 },
  soulCompleted: { type: Number, default: 0 }
}, { timestamps: true });

//VIRTUALS
//  --> updateAccumulatedHours

//  --> goalHoursRemaining

//  --> daysToCompleteGoalRemaining

module.exports = mongoose.model('Goal', goalSchema);
