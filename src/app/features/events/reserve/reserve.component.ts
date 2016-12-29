import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDetailService } from '../event-detail.service';
import { EventSignupTable } from '../event-signup-table';
import {
    EventDetail, RegistrationRow, RegistrationSlot,
    SlotStatus, AuthenticationService, User
} from '../../../core';

@Component({
    moduleId: module.id,
    selector: 'bhmc-reserve',
    templateUrl: 'reserve.component.html',
    styleUrls: ['reserve.component.css']
})
export class ReserveComponent implements OnInit {

    private eventDetail: EventDetail;
    public currentUser: User;
    public tables: EventSignupTable[];

    constructor(private eventService: EventDetailService,
                private authService: AuthenticationService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.currentUser = this.authService.user;
        this.route.data
            .subscribe((data: {eventDetail: EventDetail}) => {
                this.eventDetail = data.eventDetail;
                this.tables = this.eventService.createEventGrid(data.eventDetail);
            });
    }

    // TODO: better place for this?
    slotClass(slot: RegistrationSlot): string {
        let className = '';
        if (slot.selected) {
            className = 'bg-warning';
        } else if (slot.status === SlotStatus.Available) {
            className = 'text-success';
        } else if (slot.status === SlotStatus.Pending) {
            className = 'bg-danger';
        }
        return className;
    };

    selectSlot = (table: EventSignupTable, row: RegistrationRow, slot: RegistrationSlot) => {
        if (slot.canSelect) {
            slot.selected = !slot.selected;
            // clear any selections in a different row (TODO: move to class)
            this.tables.forEach(c => {
                c.rows.forEach(g => {
                    g.slots.forEach(s => {
                        if (c.courseName !== table.courseName || s.row.name !== row.name) {
                            s.selected = false;
                        }
                    });
                });
            });
        }
    };

    selectRow = (table: EventSignupTable, row: RegistrationRow) => {
        row.slots.forEach(s => {
            if (s.canSelect) {
                s.selected = true;
            }
        });
        // clear any selections in a different row (TODO: move to class)
        this.tables.forEach(c => {
            c.rows.forEach(g => {
                g.slots.forEach(s => {
                    if (c.courseName !== table.courseName || s.row.name !== row.name) {
                        s.selected = false;
                    }
                });
            });
        });
    };

    register = (table: EventSignupTable, row: RegistrationRow) => {
        // TODO: how to resolve this (as compared to a league registration)
        // this.eventService.reserve(this.eventDetail.id).then( group => {
        //     group.registrations.forEach( s => {
        //         s.isEventFeePaid = true;
        //     });
        // });
        this.router.navigate(['register'], {relativeTo: this.route.parent});
    }
}
