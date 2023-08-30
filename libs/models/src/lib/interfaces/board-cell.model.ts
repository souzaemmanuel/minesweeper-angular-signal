import { CellType } from '../enums/cell-type.enum';
import { CellVisibility } from '../enums/cell-visibility.enum';

export interface BoardCell {
  status: CellVisibility;
  value?: number;
  type?: CellType;
}
