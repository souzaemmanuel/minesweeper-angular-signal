import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { ComponentsFinishedGamesListModule } from '@minesweep-game/finished-games-list';
import { ComponentsGameBoardModule } from '@minesweep-game/game-board';
import { ComponentsGameSetupModule } from '@minesweep-game/game-setup';
import { MaterialModule } from '@minesweep-game/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes),
    ComponentsFinishedGamesListModule,
    ComponentsGameBoardModule,
    ComponentsGameSetupModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
