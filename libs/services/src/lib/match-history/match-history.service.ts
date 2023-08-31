import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatchHistory } from '@minesweep-game/models';
import { Observable } from 'rxjs';

export const API_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root',
})
export class MatchHistoryService {
  constructor(private http: HttpClient) {}

  save(matchInfo: MatchHistory): Observable<boolean> {
    return this.http.post<boolean>(`${API_URL}/save`, matchInfo);
  }

  getAll(): Observable<MatchHistory[]> {
    return this.http.get<MatchHistory[]>(`${API_URL}/getAll`);
  }
}
