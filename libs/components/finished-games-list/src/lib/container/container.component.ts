import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameRoutes, MatchHistory } from '@minesweep-game/models';
import { MatchHistoryService } from '@minesweep-game/services';

@Component({
  selector: 'ms-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  constructor(
    private route: Router,
    private historyService: MatchHistoryService
  ) {}

  matches: MatchHistory[] = [];

  collumns: string[] = [
    'startTime',
    'endTime',
    'difficulty',
    'totalTimeSpent',
    'status',
    'yAxisSize',
    'xAxisSize',
    'minesNumber',
  ];

  ngOnInit(): void {
    this.historyService.getAll().subscribe((res) => {
      this.matches = res;
    });
  }

  goToSetup(): void {
    this.route.navigate([GameRoutes.SETTING]);
  }
}
