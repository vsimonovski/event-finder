import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClubEvent } from '../model/club-event.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = '/api/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<ClubEvent[]> {
    return this.http.get<ClubEvent[]>(`${this.baseUrl}`);
  }

  saveEventToHistory(event): void {
    if (localStorage.getItem('eventsHistory')) {
      const eventArr = JSON.parse(localStorage.getItem('eventsHistory'));
      eventArr.push({ ...event, isGoing: true });

      localStorage.setItem('eventsHistory', JSON.stringify(eventArr));
    } else {
      const eventArr = [{ ...event, isGoing: true }];
      localStorage.setItem('eventsHistory', JSON.stringify(eventArr));
    }
  }
}
