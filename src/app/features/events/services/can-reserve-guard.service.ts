import { EventDetailService } from './event-detail.service';
import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthenticationService, User } from '../../../core';
import { RegistrationWindowType } from '../models/event-detail';

@Injectable()
export class CanReserveGuard implements CanActivate {

    constructor(
        private eventService: EventDetailService,
        private authService: AuthenticationService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (!this.eventService.currentEvent)
            return true;

        if (this.eventService.currentEvent.registrationWindow !== RegistrationWindowType.Registering) {
            console.warn(`Event ${this.eventService.currentEvent.id} is not in the registration window`);
            this.router.navigate(['/events', route.parent.url[1].path, 'detail']);
            return false;
        }

        if (this.eventService.currentEvent.isRegistered(this.authService.user.member.id)) {
            console.warn(`Event ${this.eventService.currentEvent.id}: member ${this.authService.user.member.id} is already registered`);
            this.router.navigate(['/events', route.parent.url[1].path, 'detail']);
            return false;
        }

        return true;
    }
}
