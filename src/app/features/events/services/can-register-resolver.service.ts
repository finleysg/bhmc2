import { EventDetailService } from './event-detail.service';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { EventRegistrationGroup } from '../models/event-registration-group';
import { AuthenticationService, User } from '../../../core';

@Injectable()
export class CanRegisterResolver implements Resolve<EventRegistrationGroup> {

    constructor(
        private eventService: EventDetailService,
        private authService: AuthenticationService,
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<EventRegistrationGroup> {
        let id = route.params['groupId'];
        return this.eventService.getRegistrationGroup(id)
            .then(group => {
                if (!group.registrations || group.registrations.length === 0) {
                    console.warn(`Group ${id} has no registration records`);
                    this.router.navigate(['/events', route.parent.url[1].path, 'detail']);
                    return null;
                } else if (group.registrantId !== this.authService.user.member.id) {
                    console.warn(`Group ${id} was created by ${group.registrantId}, but the current member id is ${this.authService.user.member.id}`);
                    this.router.navigate(['/events', route.parent.url[1].path, 'detail']);
                    return null;
                } else if (group.paymentConfirmationCode) {
                    console.warn(`Group ${id} has already registered and paid: ${group.paymentConfirmationCode}`);
                    this.router.navigate(['/events', route.parent.url[1].path, 'detail']);
                    return null;
                }
                return group;
            })
            .catch(() => {
                console.warn(`Group ${id} was not found during the can-register resolve`);
                this.router.navigate(['/events', route.parent.url[1].path, 'detail']);
                return null;
            });
    }
}
