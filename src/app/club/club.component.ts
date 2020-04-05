import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClubEvent } from '../shared/model/club-event.interface';
import { ToastrService } from 'ngx-toastr';
import { EventService } from '../shared/services/event.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss'],
})
export class ClubComponent implements OnInit {
  @Input() partyData: ClubEvent;
  @Output() goingClick: EventEmitter<ClubEvent> = new EventEmitter<ClubEvent>();

  isGoing: boolean;

  constructor(
    private toastr: ToastrService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.isGoing = this.partyData.isGoing;
  }

  onGoingClick() {
    this.isGoing = !this.isGoing;
    if (this.isGoing) {
      this.toastr.success(
        '',
        `${this.partyData.title}@${this.partyData.clubName} succesfuly reserved`,
        {}
      );

      this.eventService.saveEventToHistory(this.partyData);
    } else {
      this.toastr.warning(
        '',
        `${this.partyData.title}@${this.partyData.clubName} removed`,
        {}
      );
    }

    this.goingClick.emit({ ...this.partyData, isGoing: this.isGoing });
  }
}
