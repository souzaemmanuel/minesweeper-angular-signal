import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { Match } from '../models/match.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('getAll')
  getAll() {
    return this.appService.getAll();
  }

  @Post('save')
  save(@Body() match: Match) {
    return this.appService.save(match);
  }
}
