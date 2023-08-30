import { Level } from '../enums/game-level.enum';
import { GameStatus } from '../enums/game-status.enum';
import { GameSettings } from '../interfaces/game-setting.model';
import { MAX_LENGTH_X, MAX_LENGTH_Y } from './max-grid-length';
import { MIN_LENGTH_X, MIN_LENGTH_Y } from './min-grid-length';

export const LEVEL_SETTINGS: { [key: string]: GameSettings } = {
  [Level.EASY]: {
    xAxisSize: MIN_LENGTH_X,
    yAxisSize: MIN_LENGTH_Y,
    minesNumber: 9,
    status: GameStatus.NOT_READY,
    levelSelected: Level.EASY,
  },
  [Level.MEDIUM]: {
    xAxisSize: MAX_LENGTH_X - 5,
    yAxisSize: MAX_LENGTH_Y - 5,
    minesNumber: 30,
    status: GameStatus.NOT_READY,
    levelSelected: Level.MEDIUM,
  },
  [Level.HARD]: {
    xAxisSize: MAX_LENGTH_X,
    yAxisSize: MAX_LENGTH_Y,
    minesNumber: 100,
    status: GameStatus.NOT_READY,
    levelSelected: Level.HARD,
  },
};
