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
  },
  [Level.MEDIUM]: {
    xAxisSize: 20,
    yAxisSize: 20,
    minesNumber: 60,
    status: GameStatus.NOT_READY,
  },
  [Level.HARD]: {
    xAxisSize: MAX_LENGTH_X,
    yAxisSize: MAX_LENGTH_Y,
    minesNumber: 300,
    status: GameStatus.NOT_READY,
  },
};
