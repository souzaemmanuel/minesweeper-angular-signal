import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '@minesweep-game/material';
import { MatchHistoryService } from '@minesweep-game/services';
import { HttpClientModule } from '@angular/common/http';

export const gamesListRoutes: Route[] = [
  {
    path: '',
    component: ContainerComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, HttpClientModule],
  declarations: [ContainerComponent],
  providers: [MatchHistoryService],
  exports: [ContainerComponent],
})
export class ComponentsFinishedGamesListModule {}
