import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, BhmcErrorHandler, EventRegistrationGroup, EventDetailService } from '../../../core';

@Injectable()
export class CanRegisterResolver implements Resolve<EventRegistrationGroup> {

    constructor(
        private eventService: EventDetailService,
        private authService: AuthenticationService,
        private errorHandler: BhmcErrorHandler,
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<EventRegistrationGroup> {
        let id = route.params['groupId'];
        return this.eventService.getRegistrationGroup(id)
            .then(group => {
                if (!group.registrations || group.registrations.length === 0) {
                    this.errorHandler.logWarning(`Group ${id} has no registration records`);
                    this.router.navigate(['/events', route.parent.url[1].path, 'detail']);
                    return null;
                } else if (group.registrantId !== this.authService.user.member.id) {
                    this.errorHandler.logWarning(`Group ${id} was created by ${group.registrantId}, but the current member id is ${this.authService.user.member.id}`);
                    this.router.navigate(['/events', route.parent.url[1].path, 'detail']);
                    return null;
                } else if (group.paymentConfirmationCode) {
                    this.errorHandler.logWarning(`Group ${id} has already registered and paid: ${group.paymentConfirmationCode}`);
                    this.router.navigate(['/events', route.parent.url[1].path, 'detail']);
                    return null;
                }
                return group;
            })
            .catch(() => {
                this.errorHandler.logWarning(`Group ${id} was not found during the can-register resolve`);
                // TODO: how did Brian get here and still end up on the reg page?
                // this.router.navigate(['/events', route.parent.url[1].path, 'detail']);
                this.router.navigate(['/home']);
                return null;
            });
    }
}
