import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CellComponent } from './cell.component';
import { BoardCell, CellType, CellVisibility } from '@minesweep-game/models';
import { MaterialModule } from '@minesweep-game/material';

describe('CellComponent', () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [CellComponent],
    }).compileComponents();

    component.cell = {
      status: CellVisibility.VISIBLE,
      type: CellType.MINE,
    } as BoardCell;

    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.cell = {
      status: CellVisibility.VISIBLE,
      type: CellType.MINE,
    };
    expect(component).toBeTruthy();
  });
});
