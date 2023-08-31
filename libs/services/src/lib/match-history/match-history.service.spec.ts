import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MatchHistoryService } from './match-history.service';
import { Level, MatchHistory } from '@minesweep-game/models';

export const MOCK_DATA = [
  {
    yAxisSize: 8,
    xAxisSize: 10,
    minesNumber: 2,
    startTime: '2023-08-31T01:25:16.313Z',
    difficulty: 'Customized',
    status: 'Lost',
    totalTimeSpent: '00:00:00',
    endTime: '2023-08-31T01:25:18.112Z',
  },
  {
    yAxisSize: 10,
    xAxisSize: 15,
    minesNumber: 30,
    startTime: '2023-08-31T01:25:29.039Z',
    difficulty: 'Medium',
    status: 'Lost',
    totalTimeSpent: '00:00:00',
    endTime: '2023-08-31T01:25:29.039Z',
  },
  {
    yAxisSize: 15,
    xAxisSize: 20,
    minesNumber: 150,
    startTime: '2023-08-31T01:39:27.643Z',
    difficulty: 'Customized',
    status: 'Lost',
    totalTimeSpent: '00:00:00',
    endTime: '2023-08-31T01:39:27.644Z',
  },
  {
    yAxisSize: 15,
    xAxisSize: 20,
    minesNumber: 150,
    startTime: '2023-08-31T01:39:27.643Z',
    difficulty: 'Customized',
    status: 'Won',
    totalTimeSpent: '00:00:00',
    endTime: '2023-08-31T01:39:27.647Z',
  },
];

describe('MatchHistoryService', () => {
  let service: MatchHistoryService;
  const baseUrl = 'http://localhost:3000/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MatchHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);

      service.getAll().subscribe((matchList) => {
        expect(matchList[0].difficulty).toEqual(Level.CUSTOMIZED);
      });

      const req = httpTestingController.expectOne(baseUrl + '/getAll');
      expect(req.request.method).toEqual('GET');
      req.flush(MOCK_DATA);
    });
  });

  describe('save', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);

      const match = MOCK_DATA[0];

      service.save(match as MatchHistory).subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const req = httpTestingController.expectOne(baseUrl + '/save');
      expect(req.request.method).toEqual('POST');
      req.flush(MOCK_DATA);
    });
  });
});
