import { Pipe, PipeTransform } from '@angular/core';
import { ClubEvent } from '../model/club-event.interface';

@Pipe({ name: 'goingFilter' })
export class GoingFilterPipe implements PipeTransform {
  transform(clubEvents: ClubEvent[], query: ClubEvent[]): ClubEvent[] {
    if (clubEvents && clubEvents.length && query && query.length) {
      return clubEvents.filter((a) => !query.some((b) => a.title === b.title));
    }
    return clubEvents;
  }
}
