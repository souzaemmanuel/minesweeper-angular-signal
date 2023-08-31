import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContainerComponent } from './container.component';
import { MaterialModule } from '@minesweep-game/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameRoutes } from '@minesweep-game/models';
import { GameService } from '@minesweep-game/services';
import { Router } from '@angular/router';

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let router: Router;
  let gameService: GameService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule],
      providers: [GameService],

      declarations: [ContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerComponent);
    router = TestBed.inject(Router);
    gameService = TestBed.inject(GameService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should navigate to the setting route if game status is not READY_TO_START', () => {
      const navigateSpy = jest
        .spyOn(router, 'navigate')
        .mockReturnValue(Promise.resolve(true));

      component.ngOnInit();

      expect(navigateSpy).toHaveBeenCalledWith([GameRoutes.SETTING]);
    });
  });

  describe('resetGame', () => {
    it('should start a new game with current settings', () => {
      jest.spyOn(gameService, 'start');

      component.resetGame();
      expect(gameService.start).toHaveBeenCalled();
    });
  });
  describe('onCellClick', () => {
    it('should call onCellClick', () => {
      jest.spyOn(gameService, 'revealAndCheckAdjacentCells');

      component.onCellClick([]);
      expect(gameService.revealAndCheckAdjacentCells).toHaveBeenCalled();
    });
  });
  describe('onRightClick', () => {
    it('should call onRightClick', () => {
      jest
        .spyOn(gameService, 'toggleFlagAtPosition')
        .mockImplementation(jest.fn());
      const event = new MouseEvent('click');
      Object.assign(event, { preventDefault: jest.fn() });

      const mockCoords = [3, 4];
      component.onRightClick(event, mockCoords);

      expect(gameService.toggleFlagAtPosition).toHaveBeenCalled();
    });
  });
  describe('goToSetup', () => {
    it('should navigate to the setup route', () => {
      const navigateSpy = jest
        .spyOn(router, 'navigate')
        .mockReturnValue(Promise.resolve(true));

      component.goToSetup();

      expect(navigateSpy).toHaveBeenCalledWith([GameRoutes.SETTING]);
    });
  });

  describe('goToRecordsList', () => {
    it('should navigate to the records list route', () => {
      const navigateSpy = jest
        .spyOn(router, 'navigate')
        .mockReturnValue(Promise.resolve(true));

      component.goToRecordsList();

      expect(navigateSpy).toHaveBeenCalledWith([GameRoutes.LIST]);
    });
  });
});
