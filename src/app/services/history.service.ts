import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { request } from '../constants/api';
import { HistoryItem } from '../data/History';

@Injectable()
export class HistoryService {
  historyItems: HistoryItem[];
  constructor(private http: HttpClient) {}

  readHistoryList() {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };

    return this.http.get(
      `${request.apiUrl}scheduleHistory`,
      _options
    );
  }

  getHistoryList() {
    this.readHistoryList().subscribe((res: HistoryItem[]) => {
      this.historyItems = res;
    });
  }
}
