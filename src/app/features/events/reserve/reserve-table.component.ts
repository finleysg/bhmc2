import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EventDetailService } from '../event-detail.service';
import { EventSignupTable } from '../event-signup-table';
import {
    RegistrationRow, RegistrationSlot,
    SlotStatus, AuthenticationService, User
} from '../../../core';

@Component({
    moduleId: module.id,
    templateUrl: 'reserve-table.component.html',
    styleUrls: ['reserve-table.component.css']
})
export class ReserveTableComponent implements OnInit {

    public currentUser: User;
    public table: EventSignupTable;

    constructor(private eventService: EventDetailService,
                private authService: AuthenticationService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.currentUser = this.authService.user;
        this.route.params.subscribe((p: Params) => {
            this.eventService.signupTable(+p['course']).subscribe(table => this.table = table);
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

    selectSlot = (row: RegistrationRow, slot: RegistrationSlot) => {
        if (slot.canSelect) {
            slot.selected = !slot.selected;
            // clear any selections in a different row (TODO: move to class)
            this.table.rows.forEach(r => {
                r.slots.forEach(s => {
                    if (s.row.name !== row.name) {
                        s.selected = false;
                    }
                });
            });
        }
    };

    selectRow = (row: RegistrationRow) => {
        row.slots.forEach(s => {
            if (s.canSelect) {
                s.selected = true;
            }
        });
        // clear any selections in a different row (TODO: move to class)
        this.table.rows.forEach(r => {
            r.slots.forEach(s => {
                if (s.row.name !== row.name) {
                    s.selected = false;
                }
            });
        });
    };

    register = (row: RegistrationRow) => {
        // The group created is saved on the service
        let eventId = this.route.snapshot.parent.parent.params['id'];
        this.eventService.reserve(eventId, row).then((group) => {
            this.router.navigate(['register', group.id], {relativeTo: this.route.parent});
        });
    }
}
