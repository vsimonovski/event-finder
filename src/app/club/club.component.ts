import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClubEvent } from '../shared/model/club-event.interface';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent implements OnInit {
  @Input() partyData: ClubEvent;
  @Output() goingClick: EventEmitter<ClubEvent> = new EventEmitter<ClubEvent>();

  constructor() {}

  ngOnInit() {}

  onGoingClick() {
    this.goingClick.emit(this.partyData);
  }
}
