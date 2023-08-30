import { Component, Input } from '@angular/core';
import { BoardCell, CellVisibility, CellType } from '@minesweep-game/models';

@Component({
  selector: 'ms-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent {
  @Input() cell!: BoardCell;

  CellVisibility = CellVisibility;
  cellType = CellType;
}
