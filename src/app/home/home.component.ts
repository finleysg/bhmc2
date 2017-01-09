import { Component, OnInit } from '@angular/core';
import { CalendarService, CalendarEvent, AnnouncementService, Announcement,
         RuntimeSettings, User, AuthenticationService } from '../core';

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
        private announcementService: AnnouncementService,
        private settings: RuntimeSettings) {

        this.user = authService.user;
    }

    ngOnInit(): void {
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
}
