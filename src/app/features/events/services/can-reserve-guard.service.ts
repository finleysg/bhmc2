import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthenticationService, BhmcErrorHandler, EventDetailService, RegistrationWindowType } from '../../../core';

@Injectable()
export class CanReserveGuard implements CanActivate {

    constructor(
        private eventService: EventDetailService,
        private authService: AuthenticationService,
        private errorHandler: BhmcErrorHandler,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (!this.eventService.currentEvent)
            return true;

        if (this.eventService.currentEvent.registrationWindow !== RegistrationWindowType.Registering) {
            this.errorHandler.logWarning(`Event ${this.eventService.currentEvent.id} is not in the registration window`);
            this.router.navigate(['/events', route.parent.url[1].path, 'detail']);
            return false;
        }

        if (this.eventService.currentEvent.isRegistered(this.authService.user.member.id)) {
            this.errorHandler.logWarning(`Event ${this.eventService.currentEvent.id}: member ${this.authService.user.member.id} is already registered`);
            this.router.navigate(['/events', route.parent.url[1].path, 'detail']);
            return false;
        }

        return true;
    }
}
