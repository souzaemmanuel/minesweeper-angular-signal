import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetupContainerComponent } from './container.component';
import { GameService } from '@minesweep-game/services';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '@minesweep-game/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  GameRoutes,
  GameSettings,
  GameStatus,
  LEVEL_SETTINGS,
  Level,
} from '@minesweep-game/models';
import { Router } from '@angular/router';

describe('SetupContainerComponent', () => {
  let component: SetupContainerComponent;
  let router: Router;

  let fixture: ComponentFixture<SetupContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [GameService],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [SetupContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SetupContainerComponent);
    router = TestBed.inject(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onChangeAxisValue', () => {
    it('should update levelSelected and calculate mines max number', () => {
      const mockXAxisSizeValue = 10;
      const mockYAxisSizeValue = 15;

      component.xAxisSizeValue = mockXAxisSizeValue;
      component.yAxisSizeValue = mockYAxisSizeValue;

      jest.spyOn(component, 'calculateMinesMaxNum');

      component.onChangeAxisValue();

      expect(component.levelSelected).toEqual(Level.CUSTOMIZED);
      expect(component.calculateMinesMaxNum).toHaveBeenCalledWith(
        mockXAxisSizeValue,
        mockYAxisSizeValue
      );
    });
  });

  describe('updateValues', () => {
    it('should update axis sizes and mines number, and calculate mines max number', () => {
      const mockSettings: GameSettings = {
        xAxisSize: 10,
        yAxisSize: 15,
        minesNumber: 20,
        status: GameStatus.INITIALIZED,
      };

      jest.spyOn(component, 'calculateMinesMaxNum');
      component.updateValues(mockSettings);

      expect(component.xAxisSizeValue).toEqual(mockSettings.xAxisSize);
      expect(component.yAxisSizeValue).toEqual(mockSettings.yAxisSize);
      expect(component.minesNumber).toEqual(mockSettings.minesNumber);
      expect(component.calculateMinesMaxNum).toHaveBeenCalledWith(
        mockSettings.xAxisSize,
        mockSettings.yAxisSize
      );
    });
  });

  describe('onChangeLevel', () => {
    it('should update values based on selected level [EASY]', () => {
      component.levelSelected = Level.EASY as Level;

      const currentSetting = LEVEL_SETTINGS[component.levelSelected];

      jest.spyOn(component, 'updateValues');

      component.onChangeLevel();

      expect(component.updateValues).toHaveBeenCalledWith(currentSetting);
    });

    it('should update values based on selected level [MEDIUM]', () => {
      component.levelSelected = Level.MEDIUM as Level;

      const currentSetting = LEVEL_SETTINGS[component.levelSelected];

      jest.spyOn(component, 'updateValues');

      component.onChangeLevel();

      expect(component.updateValues).toHaveBeenCalledWith(currentSetting);
    });

    it('should update values based on selected level [HARD]', () => {
      component.levelSelected = Level.HARD as Level;

      const currentSetting = LEVEL_SETTINGS[component.levelSelected];

      jest.spyOn(component, 'updateValues');

      component.onChangeLevel();

      expect(component.updateValues).toHaveBeenCalledWith(currentSetting);
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

  describe('startGame', () => {
    it('should start the game', () => {
      const navigateSpy = jest
        .spyOn(router, 'navigate')
        .mockReturnValue(Promise.resolve(true));
      component.goToRecordsList();

      const mockXAxisSizeValue = 10;
      const mockYAxisSizeValue = 15;
      const mockMinesNumber = 20;
      const mockLevelSelected = Level.EASY;

      component.xAxisSizeValue = mockXAxisSizeValue;
      component.yAxisSizeValue = mockYAxisSizeValue;
      component.minesNumber = mockMinesNumber;
      component.levelSelected = mockLevelSelected;

      component.startGame();

      expect(navigateSpy).toHaveBeenCalledWith([GameRoutes.BOARD]);
    });
  });
});
