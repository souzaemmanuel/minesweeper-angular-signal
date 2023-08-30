import { Route } from '@angular/router';
import { gamesListRoutes } from '@minesweep-game/finished-games-list';
import { gameBoardRoutes } from '@minesweep-game/game-board';
import { gameSetupRoutes } from '@minesweep-game/game-setup';
import { GameRoutes } from '@minesweep-game/models';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: GameRoutes.SETTING,
    pathMatch: 'full',
  },
  {
    path: GameRoutes.SETTING,
    children: gameSetupRoutes,
  },
  {
    path: GameRoutes.LIST,
    children: gamesListRoutes,
  },
  {
    path: GameRoutes.BOARD,
    children: gameBoardRoutes,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
