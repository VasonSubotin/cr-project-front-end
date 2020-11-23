import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { request } from '../constants/api';
import { HistoryItem } from '../data/History';
import {  Subscription } from 'rxjs';

@Injectable()
export class HistoryService implements OnDestroy {
  private subscription$: Subscription;
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
    this.subscription$ = this.readHistoryList().subscribe((res: HistoryItem[]) => {
      this.historyItems = res;
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
