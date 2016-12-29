import { BhmcDataService, EventRegistrationGroup, EventDetail } from '../../core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventDetailService {

    constructor(private dataService: BhmcDataService) { }

    getEventDetail(id: number): Promise<EventDetail> {
        return this.dataService.getApiRequest(`events/${id}`)
            .map((data: any) => {
                return new EventDetail().fromJson(data);
            })
            .toPromise();
    }

    reserve(id: number): Promise<EventRegistrationGroup> {
        return this.dataService.postApiRequest('registration/reserve', { event_id: id })
            .map((data: any) => {
                return new EventRegistrationGroup().fromJson(data);
            })
            .toPromise();
    }
}