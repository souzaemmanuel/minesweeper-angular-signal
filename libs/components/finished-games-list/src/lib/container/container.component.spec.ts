import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContainerComponent } from './container.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatchHistoryService } from '@minesweep-game/services';
import { MaterialModule } from '@minesweep-game/material';
import { of } from 'rxjs';
import { GameRoutes, MatchHistory } from '@minesweep-game/models';
import { Router } from '@angular/router';

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

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let router: Router;
  let matchHistoryService: MatchHistoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule],
      providers: [MatchHistoryService],
      declarations: [ContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerComponent);
    matchHistoryService = TestBed.inject(MatchHistoryService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should fetch and update matches during ngOnInit', () => {
      jest
        .spyOn(matchHistoryService, 'getAll')
        .mockReturnValue(of(MOCK_DATA as MatchHistory[]));

      component.ngOnInit();

      expect(matchHistoryService.getAll).toHaveBeenCalled();
      expect(component.matches).toEqual(MOCK_DATA);
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
});
