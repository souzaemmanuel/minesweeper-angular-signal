import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@minesweep-game/material';
import { CellComponent } from './components/cell/cell.component';

export const gameBoardRoutes: Route[] = [
  {
    path: '',
    component: ContainerComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ],
  declarations: [ContainerComponent, CellComponent],
  exports: [ContainerComponent],
})
export class ComponentsGameBoardModule {}
