import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Level, MatchHistory, MatchStatus } from '@minesweep-game/models';
import { Observable, map, of } from 'rxjs';

export const API_URL = '';

@Injectable({
  providedIn: 'root',
})
export class MatchHistoryService {
  MOCK_DATA: MatchHistory[] = [
    {
      difficulty: Level.EASY,
      totalTimeSpent: '00:00:15',
      status: MatchStatus.WON,
      startTime: '',
      endTime: '',
    },
  ];

  constructor(private http: HttpClient) {}

  persist(matchInfo: MatchHistory): Observable<boolean> {
    return this.http.post<boolean>(`${API_URL}`, matchInfo);
  }

  getAll(): Observable<MatchHistory[]> {
    return of(this.MOCK_DATA);

    return this.http.get<MatchHistory[]>(`${API_URL}`).pipe(
      map(() => {
        return this.MOCK_DATA;
      })
    );
  }
}
