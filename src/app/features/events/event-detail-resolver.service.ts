import { EventDetailService } from './event-detail.service';
import { EventDetail } from '../../core';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class EventDetailResolver implements Resolve<EventDetail> {

    constructor(
        private eventService: EventDetailService, 
        private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<EventDetail> {
        let id = route.params['id'];
        return this.eventService.getEventDetail(id)
            .then(evt => {
                if (evt) {
                    return evt;
                } else {
                    console.warn(`Event ${id} was not found during event detail resolve`);
                    this.router.navigate(['/']);
                    return null;
                }
            });
    }
}
