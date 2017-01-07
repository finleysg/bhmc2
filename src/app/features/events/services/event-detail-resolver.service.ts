import { EventDetailService } from './event-detail.service';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { EventDetail, RegistrationWindowType } from '../models/event-detail';

@Injectable()
export class EventDetailResolver implements Resolve<EventDetail> {

    constructor(
        private eventService: EventDetailService,
        private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<EventDetail> {
        let id = route.params['id'];
        return this.eventService.getEventDetail(id)
            .then(evt => {
                if (route.children && route.children[0] && route.children[0].url[0].path === 'reserve') {
                    // A CanActivate guard didn't work because we don't have an event detail yet (guard ordering issue)
                    if (evt.registrationWindow !== RegistrationWindowType.Registering) {
                        console.warn(`Event ${id} is not in its registration window`);
                        this.router.navigate(['/']);
                        return null;
                    }
                }
                return evt;
            })
            .catch(() => {
                console.warn(`Event ${id} was not found during event detail resolve`);
                this.router.navigate(['/']);
                return null;
            });
    }
}
