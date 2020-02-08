import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() queryChange: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  onKeyUp(e) {
    this.queryChange.emit(e.target.value);
  }
}
