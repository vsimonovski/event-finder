import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/services/event.service';
import { Observable } from 'rxjs';
import { ClubEvent } from '../shared/model/club-event.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  clubEvents$: Observable<ClubEvent[]>;
  searchTerm: string;

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
    this.toastr.success(
      '',
      `${value.title}@${value.clubName} succesfuly reserved`,
      {}
    );
  }
}
