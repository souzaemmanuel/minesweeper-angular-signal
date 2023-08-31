import { Injectable, Signal, computed, signal } from '@angular/core';
import {
  BoardCell,
  CellVisibility,
  CellType,
  GameSettings,
  GameStatus,
  NEIGHBOR_OFFSETS,
  MatchHistory,
  MatchStatus,
  Level,
} from '@minesweep-game/models';
import { Subscription, interval } from 'rxjs';
import { MatchHistoryService } from '../match-history/match-history.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  grid = signal<BoardCell[][]>([]);

  private isFirstCellClicked = false;

  private timerSubscription?: Subscription;

  formattedTimer = signal<string>('');

  totalFlagsAdded = signal<number>(0);

  currentSetting = signal<GameSettings>({
    minesNumber: 0,
    xAxisSize: 0,
    yAxisSize: 0,
    status: GameStatus.INITIALIZED,
  });

  currentMatch = signal<MatchHistory>({
    minesNumber: 0,
    xAxisSize: 0,
    yAxisSize: 0,
  });

  private countAvailableCells: Signal<number> = computed(() => {
    const total = this.grid().reduce((previous, current) => {
      return (
        previous +
        current.filter((cell) => cell.status !== CellVisibility.VISIBLE).length
      );
    }, 0);

    return total;
  });

  countAvailableFlags: Signal<number> = computed(() => {
    return this.currentSetting()?.minesNumber - this.totalFlagsAdded();
  });

  playerLost: Signal<boolean> = computed(() => {
    return (
      this.grid().some((rows) => {
        return rows.some(
          (cell) =>
            cell.type === CellType.MINE &&
            cell.status === CellVisibility.VISIBLE &&
            !this.playerWon()
        );
      }) || this.currentSetting()?.matchStatus === MatchStatus.LOST
    );
  });

  playerWon: Signal<boolean> = computed(() => {
    const { xAxisSize, yAxisSize, minesNumber } = this.currentSetting();
    const totalNotMineCells =
      xAxisSize * yAxisSize - (xAxisSize * yAxisSize - minesNumber);

    const countAvailableCells = this.countAvailableCells();
    return (
      totalNotMineCells === countAvailableCells ||
      this.currentSetting()?.matchStatus === MatchStatus.WON
    );
  });

  gameEnded: Signal<boolean> = computed(() => {
    return (
      this.playerLost() ||
      this.playerWon() ||
      this.currentSetting().status === GameStatus.FINISHED
    );
  });

  allMinesPositions: Signal<number[][]> = computed(() => {
    return this.grid().reduce((mines, row, i) => {
      return row.reduce((innerMines, cell, j) => {
        if (cell.type === CellType.MINE) {
          innerMines.push([i, j]);
        }
        return innerMines;
      }, mines);
    }, [] as number[][]);
  });

  constructor(private matchHistoryService: MatchHistoryService) {}

  start(settings: GameSettings): void {
    this.currentSetting.set(settings);
    this.resetGame();
    this.createBoard(settings);
    this.updateAdjacentMineCounts();
    this.saveNewMatchInfo(settings);
  }

  private saveNewMatchInfo(settings: GameSettings): void {
    this.currentMatch.set({
      difficulty: settings.levelSelected as Level,
      yAxisSize: settings.yAxisSize,
      xAxisSize: settings.xAxisSize,
      minesNumber: settings.minesNumber,
    });
  }

  private finishMatch(): void {
    this.currentMatch.mutate((match) => {
      match.endTime = new Date().toISOString();
      match.totalTimeSpent = this.formattedTimer();
      match.status = this.currentSetting().matchStatus;
    });

    this.matchHistoryService
      .save(this.currentMatch())
      .subscribe((res) => console.log(res));
  }

  saveTimeOfMatchStarted(): void {
    this.currentMatch.mutate((match) => {
      match.startTime = new Date().toISOString();
    });
  }

  private resetGame(): void {
    this.grid.set([]);

    this.currentSetting.mutate((settings) => {
      settings.status = GameStatus.READY_TO_START;
      settings.matchStatus = undefined;
    });

    this.totalFlagsAdded.set(0);
    this.isFirstCellClicked = false;
    this.formattedTimer.set('00:00:00');
    this.stopWatch();
  }

  private startimer(): void {
    this.timerSubscription = interval(1000).subscribe((tick: number) => {
      const hrs = (~~(tick / 3600)).toString().padStart(2, '0');
      const mins = (~~((tick % 3600) / 60)).toString().padStart(2, '0');
      const secs = (~~tick % 60).toString().padStart(2, '0');

      const timerFormatted = `${hrs}:${mins}:${secs}`;
      this.formattedTimer.set(timerFormatted);
    });
  }

  private stopWatch(): void {
    this.timerSubscription?.unsubscribe();
    this.timerSubscription = undefined;
  }

  createBoard({ xAxisSize, yAxisSize, minesNumber }: GameSettings): void {
    this.grid.mutate((grid) => {
      for (let y = 0; y < yAxisSize; y++) {
        grid.push([]);

        for (let x = 0; x < xAxisSize; x++) {
          grid[y][x] = {
            status: CellVisibility.HIDDEN,
            value: 0,
          };
        }
      }
    });

    this.generateMines(xAxisSize, yAxisSize, minesNumber);
  }

  private generateMines(
    xAxisSize: number,
    yAxisSize: number,
    minesNumber: number
  ): void {
    while (this.allMinesPositions().length < minesNumber) {
      const randomY = Math.floor(Math.random() * yAxisSize);
      const randomX = Math.floor(Math.random() * xAxisSize);

      const targetCell = this.grid()[randomY][randomX];

      if (targetCell.type !== CellType.MINE) {
        this.grid.mutate((grid) => {
          grid[randomY][randomX] = {
            status: CellVisibility.HIDDEN,
            value: undefined,
            type: CellType.MINE,
          };
        });
      }
    }
  }

  toggleFlagAtPosition(x: number, y: number): void {
    const targetCell = this.grid()[x][y];

    if (targetCell.status === CellVisibility.VISIBLE) {
      return;
    }

    if (
      targetCell.type === CellType.FLAG ||
      targetCell.type === CellType.BOTH
    ) {
      this.removeFlag(targetCell);
    } else {
      this.addFlag(targetCell);
    }
  }

  private addFlag(cell: BoardCell): void {
    if (this.gameEnded()) {
      return;
    }

    if (this.totalFlagsAdded() >= this.currentSetting().minesNumber) {
      return;
    }

    this.totalFlagsAdded.update((total) => total + 1);

    if (cell.type === CellType.MINE) {
      cell.type = CellType.BOTH;
      return;
    }

    cell.type = CellType.FLAG;
  }

  private removeFlag(cell: BoardCell): void {
    if (this.gameEnded()) {
      return;
    }

    if (this.totalFlagsAdded() <= 0) {
      return;
    }

    this.totalFlagsAdded.update((total) => total - 1);

    if (cell.type === CellType.BOTH) {
      cell.type = CellType.MINE;
      return;
    }

    cell.type = undefined;
  }

  private checkGameStatus(): void {
    if (this.currentSetting().status === GameStatus.READY_TO_START)
      this.currentSetting.mutate(
        (setting) => (setting.status = GameStatus.INITIALIZED)
      );

    if (this.playerLost()) {
      this.revealAllBombs();
      this.stopWatch();
      this.currentSetting.mutate((setting) => {
        setting.status = GameStatus.FINISHED;
        setting.matchStatus = MatchStatus.LOST;
      });
      this.finishMatch();
    }

    if (this.playerWon()) {
      this.revealAllBombs();
      this.stopWatch();
      this.currentSetting.mutate((setting) => {
        setting.status = GameStatus.FINISHED;
        setting.matchStatus = MatchStatus.WON;
      });
      this.finishMatch();
    }
  }

  private revealAllBombs(): void {
    const minesCoords = this.allMinesPositions();

    minesCoords.forEach((coord) => {
      const targetCell = this.grid()[coord[0]][coord[1]];

      if (targetCell.type === CellType.MINE) {
        this.grid.mutate((grid) => {
          grid[coord[0]][coord[1]].status = CellVisibility.VISIBLE;
        });
      }
    });
  }

  revealAndCheckAdjacentCells(coords: number[]): void {
    if (this.gameEnded()) {
      return;
    }

    //TODO: Create a signal for it
    if (this.isFirstCellClicked === false) {
      this.startimer();
      this.saveTimeOfMatchStarted();
      this.isFirstCellClicked = true;
    }

    const cell = this.grid()[coords[0]][coords[1]];

    if (cell.type === CellType.FLAG) {
      return;
    }

    if (cell.value === 0) {
      this.revealZeroNeighbours(coords);
    }

    if (cell.status === CellVisibility.HIDDEN) {
      this.grid.mutate(
        (grid) => (grid[coords[0]][coords[1]].status = CellVisibility.VISIBLE)
      );
    }

    this.checkGameStatus();
  }

  private calculateNeighbourCoords(
    index: number,
    centerCellCoord: number[]
  ): number[] {
    const aroundGetter = NEIGHBOR_OFFSETS[index];
    const cellAroundY = centerCellCoord[0] + aroundGetter[0];
    const cellAroundX = centerCellCoord[1] + aroundGetter[1];

    return [cellAroundY, cellAroundX];
  }

  private isWithinBounds(cellAroundCoords: number[]): boolean {
    return (
      cellAroundCoords[0] >= 0 &&
      cellAroundCoords[0] < this.currentSetting().yAxisSize &&
      cellAroundCoords[1] >= 0 &&
      cellAroundCoords[1] < this.currentSetting().xAxisSize
    );
  }

  private updateAdjacentMineCounts(): void {
    const minePositions = this.allMinesPositions();
    const boardHeight = this.currentSetting().yAxisSize;
    const boardWidth = this.currentSetting().xAxisSize;

    for (const minePos of minePositions) {
      for (const offset of NEIGHBOR_OFFSETS) {
        const adjCellY = minePos[0] + offset[0];
        const adjCellX = minePos[1] + offset[1];

        const isWithinBoard =
          adjCellY >= 0 &&
          adjCellY < boardHeight &&
          adjCellX >= 0 &&
          adjCellX < boardWidth;

        if (
          isWithinBoard &&
          typeof this.grid()[adjCellY][adjCellX].value === 'number'
        ) {
          this.grid.mutate((grid) => {
            grid[adjCellY][adjCellX].value =
              Number(grid[adjCellY][adjCellX].value) + 1;
          });
        }
      }
    }
  }

  private revealZeroNeighbours(coords: number[]): void {
    const currentCell = this.grid()[coords[0]][coords[1]];

    if (currentCell.value !== 0) {
      currentCell.status = CellVisibility.VISIBLE;
      return;
    }

    for (let i = 0; i < NEIGHBOR_OFFSETS.length; i++) {
      const neighbourCellCoords = this.calculateNeighbourCoords(i, coords);

      if (this.isWithinBounds(neighbourCellCoords)) {
        const cellAround =
          this.grid()[neighbourCellCoords[0]][neighbourCellCoords[1]];

        const isValidForReveal =
          cellAround.status === CellVisibility.HIDDEN &&
          cellAround.type !== CellType.MINE &&
          typeof cellAround.value === 'number';

        if (isValidForReveal) {
          if (cellAround.type === CellType.FLAG) {
            this.removeFlag(cellAround);
          }

          //to discover the cells smoothly
          setTimeout(() => {
            cellAround.status = CellVisibility.VISIBLE;
          }, 50);
        }
      }
    }
  }
}
