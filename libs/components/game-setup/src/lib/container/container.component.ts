import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  GameRoutes,
  LEVEL_SETTINGS,
  Level,
  MAX_LENGTH_X,
  MAX_LENGTH_Y,
  MIN_LENGTH_X,
  MIN_LENGTH_Y,
} from '@minesweep-game/models';
import { GameService } from '@minesweep-game/services';

@Component({
  selector: 'ms-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class SetupContainerComponent implements OnInit {
  form!: FormGroup;

  readonly maxLengthY = MAX_LENGTH_Y;
  readonly maxLengthX = MAX_LENGTH_X;

  readonly minLengthY = MIN_LENGTH_Y;
  readonly minLengthX = MIN_LENGTH_X;

  maxNumberOfMines = 0;
  levelSelected?: Level;

  constructor(private gameService: GameService, private route: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      yAxisSize: new FormControl(0, [
        Validators.required,
        Validators.min(this.minLengthY),
        Validators.max(this.maxLengthY),
      ]),
      xAxisSize: new FormControl(0, [
        Validators.required,
        Validators.max(this.maxLengthX),
        Validators.min(this.minLengthX),
      ]),
      minesNumber: new FormControl(0, [Validators.required]),
    });
  }

  onChangeAxisValue(): void {
    this.levelSelected = undefined;

    if (this.form.invalid) {
      return;
    }

    const { xAxisSize, yAxisSize } = this.form.value;

    this.calculateMinesMaxNum(xAxisSize, yAxisSize);

    this.form
      .get('mines')
      ?.setValidators([Validators.max(this.maxNumberOfMines)]);
  }

  calculateMinesMaxNum(xAxisSize: number, yAxisSize: number): void {
    //The maximum number of mines is half of the total cells on the board
    this.maxNumberOfMines = Math.floor((xAxisSize * yAxisSize) / 2);
  }

  onChangeLevel() {
    const gameLevel = this.levelSelected;

    const currentSetting = LEVEL_SETTINGS[gameLevel as Level];

    switch (gameLevel) {
      case Level.EASY:
        this.form.patchValue(currentSetting);
        this.calculateMinesMaxNum(
          currentSetting.xAxisSize,
          currentSetting.yAxisSize
        );
        break;

      case Level.MEDIUM:
        this.form.patchValue(currentSetting);
        this.calculateMinesMaxNum(
          currentSetting.xAxisSize,
          currentSetting.yAxisSize
        );
        break;

      case Level.HARD:
        this.form.patchValue(currentSetting);
        this.calculateMinesMaxNum(
          currentSetting.xAxisSize,
          currentSetting.yAxisSize
        );
        break;
    }
  }

  startGame(): void {
    if (this.form.invalid) {
      return;
    }

    const { xAxisSize, yAxisSize, minesNumber } = this.form.value;

    this.gameService.start({
      xAxisSize: xAxisSize,
      yAxisSize: yAxisSize,
      minesNumber: minesNumber,
    });

    this.route.navigate([GameRoutes.BOARD]);
  }
}
