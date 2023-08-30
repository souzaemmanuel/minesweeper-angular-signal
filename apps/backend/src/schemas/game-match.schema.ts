import * as mongoose from 'mongoose';

export const GameMatchSchema = new mongoose.Schema({
  yAxisSize: Number,
  xAxisSize: Number,
  minesNumber: Number,
  startTime: String,
  difficulty: String,
  status: String,
  totalTimeSpent: String,
  endTime: String,
});
