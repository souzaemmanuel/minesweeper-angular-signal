import { Level } from '../enums/game-level.enum';
import { MatchStatus } from '../enums/match-status.enum';

export interface MatchHistory {
  yAxisSize: number;
  xAxisSize: number;
  minesNumber: number;
  startTime?: string;
  difficulty?: Level;

  status?: MatchStatus;
  totalTimeSpent?: string;
  endTime?: string;
}
