import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { EventSignupTable } from '../models/event-signup-table';
import { EventDetailService, EventDetail, MemberService, PublicMember,
    SlotPayment, RegistrationService } from '../../../core';
import { TypeaheadMatch, ModalDirective } from 'ng2-bootstrap';
import { RegistrationSlot } from '../models/registration-slot';
import { PageScrollService, PageScrollInstance, PageScrollConfig } from 'ng2-page-scroll';
import { RegistrationRow } from '../models/registration-row';

@Component({
    moduleId: module.id,
    templateUrl: 'check-in.component.html',
    styleUrls: ['check-in.component.css']
})
export class CheckInComponent implements OnInit {

    @ViewChild('scrollContainer') container: ElementRef;
    @ViewChild('addPlayerModal') addPlayerModal: ModalDirective;

    public tables: EventSignupTable[];
    public eventDetail: EventDetail;
    public allMembers: PublicMember[];
    public registeredMembers: PublicMember[];
    public selectedMemberName: string;
    public addedMemberName: string;
    public addedMember: PublicMember;
    private selectedSlot: RegistrationSlot;
    private slotPayments: SlotPayment[];

    constructor(private eventService: EventDetailService,
                private registrationService: RegistrationService,
                private pageScrollService: PageScrollService,
                @Inject(DOCUMENT) private document: any,
                private memberService: MemberService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.data
            .subscribe((data: {eventDetail: EventDetail}) => {
                this.tables = [];
                this.eventDetail = data.eventDetail;
                let courses = this.eventService.eventCourses(this.eventDetail);
                courses.slice().reverse().forEach(course => {
                    this.eventService.signupTable(course.id).do(table => this.tables.push(table)).subscribe();
                });
                this.registrationService.getSlotPayments(this.eventDetail.id).subscribe(payments => this.slotPayments = payments);
        });
        this.memberService.getMembers().subscribe(
            members => {
                this.allMembers = members;
                this.registeredMembers = members.filter((m: PublicMember) => {
                    if (this.eventDetail.isRegistered(m.id)) {
                        return m;
                    }
                });
            }
        );
        PageScrollConfig.defaultDuration = 500;
        PageScrollConfig.defaultScrollOffset = 100;
    }

    findPlayer($event: TypeaheadMatch) {
        // Change the styling to highlight the member and scroll into view
        let anchor: string = 'none';
        this.tables.forEach((table: EventSignupTable) => {
            table.rows.forEach((row: RegistrationRow) => {
                row.slots.forEach((slot: RegistrationSlot) => {
                    slot.selected = (slot.memberId === $event.item.id);
                    if (slot.selected) {
                        anchor = `#hole-${slot.row.holeId}`;
                    }
                });
            });
        });
        if (anchor !== 'none') {
            let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInlineInstance(this.document, anchor, this.container.nativeElement);
            this.pageScrollService.start(pageScrollInstance);
        }
        this.selectedMemberName = '';
    }

    findMember($event: TypeaheadMatch): void {
        this.addedMember = $event.item;
    }

    addPlayer(): void {
        this.selectedSlot.memberName = this.addedMember.name;
        this.addPlayerModal.hide();
    }

    cancelAdd(): void {
        this.addPlayerModal.hide();
    }

    openSearch(slot: RegistrationSlot): void {
        if (slot.memberId === -1) {
            this.selectedSlot = slot;
            this.addedMember = null;
            this.addedMemberName = '';
            this.addPlayerModal.config = {backdrop: 'static', keyboard: false};
            this.addPlayerModal.show();
        }
    }

    // Assumptions: always cash
    updateSkins(slot: RegistrationSlot, skinsType: string): void {
        // TODO: allow toggling, but only if not previously paid online
        if (slot.memberId === -1) return;
        if (skinsType === 'gross') {
            if (!slot.registration.isGrossSkinsFeePaid) {
                // TODO: service PUT
                slot.registration.isGrossSkinsFeePaid = true;
            }
        } else {
            if (!slot.registration.isNetSkinsFeePaid) {
                // TODO: service PUT
                slot.registration.isNetSkinsFeePaid = true;
            }
        }
    }

    private isSlotPayment(registration: RegistrationSlot): boolean {
        return false;
    }
}
