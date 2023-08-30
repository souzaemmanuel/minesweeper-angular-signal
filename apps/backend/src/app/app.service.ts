import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match } from '../models/match.model';

@Injectable()
export class AppService {
  constructor(@InjectModel('GameMatch') private matchModel: Model<Match>) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  save(matchInfo: Match) {
    return new this.matchModel(matchInfo).save();
  }

  getAll() {
    return this.matchModel.find();
  }
}
