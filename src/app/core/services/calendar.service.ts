import { Calendar } from '../models/calendar';
import { CalendarEvent } from '../models/calendar-event';
import { BhmcDataService } from './bhmc-data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeAll';

@Injectable()
export class CalendarService {

    private currentMonthSource: Subject<Calendar>;
    public currentMonth$: Observable<Calendar>;

    constructor(private dataService: BhmcDataService) {
        this.currentMonthSource = new Subject<Calendar>();
        this.currentMonth$ = this.currentMonthSource.asObservable();
    }

    setCalendar(year: number, month: string): void {
        const thisMonth = Calendar.getMonth(month, false); // zeroBased = false
        this.dataService.getApiRequest('events', {'year': year, 'month': thisMonth})
            .toPromise()
            .then((events) => {
                let calendar = new Calendar(year, month);
                for (const event of events) {
                    calendar.addEvent(new CalendarEvent().fromJson(event));
                }
                this.currentMonthSource.next(calendar);
            })
    }

    quickEvents(): Observable<CalendarEvent> {
        return this.dataService.getApiRequest('quick-events')
            .mergeAll()
            .map((event: Observable<any>) => new CalendarEvent().fromJson(event));
    }
}
