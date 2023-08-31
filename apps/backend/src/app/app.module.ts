import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GameMatchSchema } from '../schemas/game-match.schema';
import { CONN_STRING } from '../../secrets';

@Module({
  imports: [
    MongooseModule.forRoot(CONN_STRING), //add here your connection string
    MongooseModule.forFeature([{ name: 'GameMatch', schema: GameMatchSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
