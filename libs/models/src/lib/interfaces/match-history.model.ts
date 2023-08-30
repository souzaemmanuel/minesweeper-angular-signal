import { Level } from '../enums/game-level.enum';
import { MatchStatus } from '../enums/match-status.enum';

export interface MatchHistory {
  startTime: string;
  endTime: string;
  difficulty: Level;
  totalTimeSpent: string;
  status: MatchStatus;
}
