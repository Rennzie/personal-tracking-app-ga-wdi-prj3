const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const goalSchema = mongoose.Schema({
  createdBy: { type: ObjectId, ref: 'User' },
  month: String,
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


//VIRTUALS
//  --> updateAccumulatedHours

//  --> goalHoursRemaining

goalSchema.virtual('timeToBodyGoal')
  .get( function()  {
    return this.bodyTarget - this.bodyCompleted;
  });
goalSchema.virtual('timeToMindGoal')
  .get( function()  {
    return this.mindTarget - this.mindCompleted;
  });
goalSchema.virtual('timeToSoulGoal')
  .get( function()  {
    return this.soulTarget - this.soulCompleted;
  });

//convert month to a moment object
//get differnce between todays date and end of month of give date
// goalSchema.virtual('dayRemaining')
//   .get(function(){
//
//   });


//  --> daysToCompleteGoalRemaining

module.exports = mongoose.model('Goal', goalSchema);
