import { Component, OnInit, Signal, computed, effect } from '@angular/core';
import { Router } from '@angular/router';
import {
  BoardCell,
  CellVisibility,
  CellType,
  GameRoutes,
  GameStatus,
} from '@minesweep-game/models';
import { AlertService, GameService } from '@minesweep-game/services';

@Component({
  selector: 'ms-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  availableFlags: Signal<number> = computed(() =>
    this.gameService.countAvailableFlags()
  );
  timer: Signal<string> = computed(() => this.gameService.formattedTimer());
  grid: Signal<BoardCell[][]> = computed(() => this.gameService.grid());

  CellVisibility = CellVisibility;
  cellType = CellType;

  constructor(
    private gameService: GameService,
    private route: Router,
    private alertService: AlertService
  ) {
    effect(() => {
      if (this.gameService.currentSetting().status === GameStatus.FINISHED) {
        //when game is over
        if (this.gameService.playerLost()) {
          this.alertService.openSnackBar(
            'Game over! Hit the reset button, and try again!'
          );
        }

        if (this.gameService.playerWon()) {
          this.alertService.openSnackBar('Congratulations you won!!');
        }
      }
    });
  }

  ngOnInit(): void {
    if (
      this.gameService?.currentSetting()?.status !== GameStatus.READY_TO_START
    ) {
      this.route.navigate([GameRoutes.SETTING]);
    }
  }

  resetGame(): void {
    this.gameService.start(this.gameService.currentSetting());
  }

  onCellClick(coords: number[]) {
    this.gameService.revealAndCheckAdjacentCells(coords);
  }

  onRightClick(event: Event, coords: number[]) {
    event.preventDefault();
    this.gameService.toggleFlagAtPosition(coords[0], coords[1]);
  }

  goToSetup(): void {
    this.route.navigate([GameRoutes.SETTING]);
  }

  goToRecordsList(): void {
    this.route.navigate([GameRoutes.LIST]);
  }
}
