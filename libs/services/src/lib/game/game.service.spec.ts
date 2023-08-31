/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { GameService } from './game.service';
import {
  BoardCell,
  CellType,
  CellVisibility,
  GameSettings,
  GameStatus,
  MatchHistory,
} from '@minesweep-game/models';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatchHistoryService } from '../match-history/match-history.service';

describe('GameService', () => {
  let service: GameService;
  const mockSettings: GameSettings = {
    minesNumber: 10,
    xAxisSize: 20,
    yAxisSize: 30,
    status: GameStatus.INITIALIZED,
  };

  const mockMatch: MatchHistory = {
    minesNumber: 0,
    xAxisSize: 0,
    yAxisSize: 0,
    totalTimeSpent: '00:00:30',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GameService, MatchHistoryService],
    });
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('start', () => {
    it('should set settings, reset game, create board, update mine counts, and save match info', () => {
      //@ts-expect-error
      jest.spyOn(service, 'resetGame');
      jest.spyOn(service, 'createBoard');
      //@ts-expect-error
      jest.spyOn(service, 'updateAdjacentMineCounts');
      //@ts-expect-error
      jest.spyOn(service, 'saveNewMatchInfo');

      service.start(mockSettings);

      expect(service.currentSetting()).toEqual(mockSettings);
      //@ts-expect-error
      expect(service.resetGame).toHaveBeenCalled();
      expect(service.createBoard).toHaveBeenCalledWith(mockSettings);
      //@ts-expect-error
      expect(service.updateAdjacentMineCounts).toHaveBeenCalled();
      //@ts-expect-error
      expect(service.saveNewMatchInfo).toHaveBeenCalledWith(mockSettings);
    });
  });
  describe('saveNewMatchInfo', () => {
    it('should update currentMatch with the provided settings', () => {
      jest.spyOn(service.currentMatch, 'set');
      //@ts-expect-error
      service.saveNewMatchInfo(mockSettings);

      const currentMatch = service.currentMatch();
      expect(service.currentMatch.set).toHaveBeenCalled();
      expect(currentMatch.difficulty).toEqual(mockSettings.levelSelected);
      expect(currentMatch.yAxisSize).toEqual(mockSettings.yAxisSize);
      expect(currentMatch.xAxisSize).toEqual(mockSettings.xAxisSize);
      expect(currentMatch.minesNumber).toEqual(mockSettings.minesNumber);
    });
  });

  describe('finishMatch', () => {
    it('should update totalTimeSpent', () => {
      jest.spyOn(service, 'formattedTimer').mockReturnValue('00:00:15');

      //@ts-expect-error
      jest.spyOn(service.currentMatch, 'mutate').mockReturnValue(mockMatch);

      //@ts-expect-error
      service.finishMatch();

      expect(mockMatch.totalTimeSpent).toBe('00:00:30');
    });
  });

  describe('saveTimeOfMatchStarted', () => {
    it('should update currentMatch with the start time', () => {
      jest.spyOn(service.currentMatch, 'mutate');

      //@ts-expect-error
      jest.spyOn(service.currentMatch, 'mutate').mockReturnValue(mockMatch);

      service.saveTimeOfMatchStarted();

      expect(service.currentMatch.mutate).toHaveBeenCalled();
    });
  });

  describe('startimer', () => {
    it('should update formattedTimer correctly', fakeAsync(() => {
      //@ts-expect-error
      service.startimer();

      tick(3000);

      const expectedFormattedTimer = '00:00:02';

      expect(service.formattedTimer()).toEqual(expectedFormattedTimer);

      //@ts-expect-error
      service.timerSubscription?.unsubscribe();
      //@ts-expect-error
      service.timerSubscription = undefined;
    }));
  });

  describe('toggleFlagAtPosition', () => {
    it('should do nothing if cell is visible', () => {
      //@ts-expect-error
      jest.spyOn(service, 'addFlag');
      //@ts-expect-error
      jest.spyOn(service, 'removeFlag');

      const mockX = 0;
      const mockY = 0;

      service.grid.set([[{ status: CellVisibility.VISIBLE }]]);

      service.toggleFlagAtPosition(mockX, mockY);

      //@ts-expect-error
      expect(service.addFlag).not.toHaveBeenCalled();
      //@ts-expect-error
      expect(service.removeFlag).not.toHaveBeenCalled();
    });

    it('should add flag if cell type is neither flag nor both', () => {
      const mockX = 0;
      const mockY = 0;
      //@ts-expect-error
      jest.spyOn(service, 'addFlag');

      service.grid.set([
        [{ status: CellVisibility.HIDDEN, type: CellType.MINE }],
      ]);

      service.toggleFlagAtPosition(mockX, mockY);

      //@ts-expect-error
      expect(service.addFlag).toHaveBeenCalled();
    });

    it('should remove flag if cell type is flag or both', () => {
      const mockX = 0;
      const mockY = 0;
      //@ts-expect-error
      jest.spyOn(service, 'removeFlag');

      service.grid.set([
        [{ status: CellVisibility.HIDDEN, type: CellType.BOTH }],
      ]);

      service.toggleFlagAtPosition(mockX, mockY);

      //@ts-expect-error
      expect(service.removeFlag).toHaveBeenCalled();
    });
  });

  describe('addFlag', () => {
    it('should not add flag if game ended', () => {
      service.grid.set([
        [{ status: CellVisibility.VISIBLE, type: CellType.MINE }],
      ]);

      const mockCell: BoardCell = {
        type: CellType.MINE,
        status: CellVisibility.HIDDEN,
      };

      //@ts-expect-error
      service.addFlag(mockCell);

      expect(service.totalFlagsAdded()).toBe(0);
    });

    it('should not add flag if totalFlagsAdded exceeds minesNumber', () => {
      const mockCell: BoardCell = {
        type: CellType.MINE,
        status: CellVisibility.HIDDEN,
      };

      service.totalFlagsAdded.set(1);

      //@ts-expect-error
      service.addFlag(mockCell);

      expect(service.totalFlagsAdded()).toBe(1);
    });
  });
});
