import { Level } from '../enums/game-level.enum';
import { GameStatus } from '../enums/game-status.enum';
import { MatchStatus } from '../enums/match-status.enum';

export interface GameSettings {
  yAxisSize: number;
  xAxisSize: number;
  minesNumber: number;
  status: GameStatus;
  matchStatus?: MatchStatus;
  levelSelected?: Level;
}
