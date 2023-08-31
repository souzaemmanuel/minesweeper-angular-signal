import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Match } from '../models/match.model';
import { MOCK_DATA } from '../models/match-list-mock';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //if you are not using a database, the data will be persisted in memory
  mockedList = MOCK_DATA;

  @Get('getAll')
  getAll() {
    return this.appService.getAll();

    //if you are not using a database, uncomment next line, and comment the previous
    // return this.mockedList
  }

  @Post('save')
  save(@Body() match: Match) {
    return this.appService.save(match);

    //if you are not using a database, uncomment next line, and comment the previous
    // this.mockedList.push(match);
    // return match;
  }
}
