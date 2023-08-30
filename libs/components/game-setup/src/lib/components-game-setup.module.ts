import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupContainerComponent } from './container/container.component';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@minesweep-game/material';

export const gameSetupRoutes: Route[] = [
  {
    path: '',
    component: SetupContainerComponent,
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
  declarations: [SetupContainerComponent],
  exports: [SetupContainerComponent],
})
export class ComponentsGameSetupModule {}
