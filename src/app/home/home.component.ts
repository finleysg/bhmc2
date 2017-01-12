import { Component, OnInit } from '@angular/core';
import { CalendarService, CalendarEvent, AnnouncementService, Announcement, EventDetailService,
         RuntimeSettings, User, AuthenticationService, EventRegistrationGroup } from '../core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {

    public announcements: Announcement[];
    public eventList: CalendarEvent[];
    public user: User;

    constructor(
        private authService: AuthenticationService,
        private calendarService: CalendarService,
        private eventService: EventDetailService,
        private announcementService: AnnouncementService,
        private router: Router,
        private settings: RuntimeSettings) {
    }

    ngOnInit(): void {
        this.authService.currentUser$.subscribe(user => this.user = user);
        this.announcementService.currentAnnouncements()
            .subscribe(messages => {
                this.announcements = messages;
                this.announcements.forEach(a => {
                    if (a.documentName) {
                        a.documentUrl = `${this.settings.apiUrl}${a.documentUrl}`
                    }
                })
            });
        this.calendarService.quickEvents()
            .then(events => {
                this.eventList = events;
            });
    }

    registerOnline(): void {
        if (this.user.isAuthenticated) {
            this.eventService.reserve(46).then((group: EventRegistrationGroup) => {
                this.router.navigate(['/events', 46, 'register', group.id]);
            });
        } else {
            this.router.navigate(['/member', 'new-member-signup', 46]);
        }
    }

    getPassword(): void {
        this.router.navigate(['/member', 'fetch-password']);
    }
}
