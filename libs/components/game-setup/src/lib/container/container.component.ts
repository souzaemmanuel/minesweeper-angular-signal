import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  GameRoutes,
  GameSettings,
  GameStatus,
  LEVEL_SETTINGS,
  Level,
  MAX_LENGTH_X,
  MAX_LENGTH_Y,
  MIN_LENGTH_X,
  MIN_LENGTH_Y,
  MIN_MINES_LENGTH,
} from '@minesweep-game/models';
import { GameService } from '@minesweep-game/services';

@Component({
  selector: 'ms-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class SetupContainerComponent implements OnInit {
  readonly maxLengthY = MAX_LENGTH_Y;
  readonly maxLengthX = MAX_LENGTH_X;

  readonly minLengthY = MIN_LENGTH_Y;
  readonly minLengthX = MIN_LENGTH_X;

  readonly minMinesLength = MIN_MINES_LENGTH;

  yAxisSizeValue = this.minLengthY;
  xAxisSizeValue = this.minLengthX;
  minesNumber = LEVEL_SETTINGS[Level.EASY].minesNumber;

  maxNumberOfMines = 0;
  levelSelected?: Level;

  constructor(private gameService: GameService, private route: Router) {}

  ngOnInit(): void {
    this.calculateMinesMaxNum(this.xAxisSizeValue, this.yAxisSizeValue);
  }

  onChangeAxisValue(): void {
    this.levelSelected = Level.CUSTOMIZED;
    this.calculateMinesMaxNum(this.xAxisSizeValue, this.yAxisSizeValue);
  }

  calculateMinesMaxNum(xAxisSize: number, yAxisSize: number): void {
    //The maximum number of mines is half of the total cells on the board
    this.maxNumberOfMines = Math.floor((xAxisSize * yAxisSize) / 2);
  }

  updateValues({ xAxisSize, yAxisSize, minesNumber }: GameSettings): void {
    this.xAxisSizeValue = xAxisSize;
    this.yAxisSizeValue = yAxisSize;
    this.minesNumber = minesNumber;

    this.calculateMinesMaxNum(xAxisSize, yAxisSize);
  }

  onChangeLevel() {
    const gameLevel = this.levelSelected;

    const currentSetting = LEVEL_SETTINGS[gameLevel as Level];

    switch (gameLevel) {
      case Level.EASY:
        this.updateValues(currentSetting);
        break;

      case Level.MEDIUM:
        this.updateValues(currentSetting);
        break;

      case Level.HARD:
        this.updateValues(currentSetting);
        break;
    }
  }

  startGame(): void {
    const setting = {
      xAxisSize: this.xAxisSizeValue,
      yAxisSize: this.yAxisSizeValue,
      minesNumber: this.minesNumber,

      status: GameStatus.READY_TO_START,
      levelSelected: this.levelSelected,
    };

    this.gameService.start(setting);

    this.route.navigate([GameRoutes.BOARD]);
  }

  goToRecordsList(): void {
    this.route.navigate([GameRoutes.LIST]);
  }
}
