import { Pipe, PipeTransform } from '@angular/core';
import { ClubEvent } from '../model/club-event.interface';

@Pipe({ name: 'eventFilter' })
export class EventFilterPipe implements PipeTransform {
  transform(clubEvents: ClubEvent[], query: string): ClubEvent[] {
    if (clubEvents && clubEvents.length && query && query.length) {
      return clubEvents.filter(e =>
        e.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    return clubEvents;
  }
}
