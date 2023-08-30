import { GameStatus } from '../enums/game-status.enum';

export interface GameSettings {
  yAxisSize: number;
  xAxisSize: number;
  minesNumber: number;
  status?: GameStatus;
}
