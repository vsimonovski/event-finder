import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/services/event.service';
import { Observable } from 'rxjs';
import { ClubEvent } from '../shared/model/club-event.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  clubEvents$: Observable<ClubEvent[]>;
  searchTerm: string;
  filterItems: ClubEvent[] =
    JSON.parse(localStorage.getItem('eventsHistory')) || [];

  constructor(
    private eventService: EventService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.clubEvents$ = this.eventService.getEvents();
  }

  onQueryChange(value) {
    this.searchTerm = value;
  }

  onGoingClick(value: ClubEvent) {
    if (value.isGoing) {
      this.filterItems = [...this.filterItems, value];
    } else {
      this.filterItems = this.filterItems.filter(
        (el) => el.title !== value.title
      );
    }
  }
}
