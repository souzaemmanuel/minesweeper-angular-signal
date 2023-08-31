/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
import { GameSettings, GameStatus, MatchHistory } from '@minesweep-game/models';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatchHistoryService } from '../match-history/match-history.service';
import { of } from 'rxjs';

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
      jest.spyOn(service, 'formattedTimer').mockReturnValue('00:00:15'); // Mock formattedTimer method

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
});
