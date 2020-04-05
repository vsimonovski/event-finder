import { Component, OnInit } from '@angular/core';
import { ClubEvent } from '../shared/model/club-event.interface';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  events: ClubEvent[];

  constructor() {}

  ngOnInit() {
    this.events = JSON.parse(localStorage.getItem('eventsHistory'));
  }
}
