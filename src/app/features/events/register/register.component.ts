import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { User, AuthenticationService, PublicMember, MemberService, EventDetail, EventType, EventRegistration,
         CanComponentDeactivate, DialogService, EventDetailService, EventRegistrationGroup } from '../../../core';
import { ActivatedRoute, Router, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TypeaheadMatch } from 'ng2-bootstrap';
import { PaymentComponent, ProcessingStatus } from '../../../shared/payments/payment.component';
import * as moment from 'moment';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent implements OnInit, CanDeactivate<CanComponentDeactivate> {

    @ViewChild(PaymentComponent) private paymentComponent: PaymentComponent;

    public registrationGroup: EventRegistrationGroup;
    public eventDetail: EventDetail;
    public currentUser: User;
    public members: PublicMember[];
    public friends: PublicMember[];
    public selectedMemberName: string;
    public expires: moment.Moment;
    public expiryMessage: string = 'Your reservation was cancelled because it was not completed within 10 minutes.';
    private cancelling: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private dialogService: DialogService,
        private eventService: EventDetailService,
        private memberService: MemberService,
        private authService: AuthenticationService) { }

    ngOnInit(): void {
        this.currentUser = this.authService.user;
        this.route.data
            .subscribe((data: { eventDetail: EventDetail, registrationGroup: EventRegistrationGroup }) => {
                this.eventDetail = data.eventDetail;
                this.registrationGroup = data.registrationGroup;
                this.expires = this.registrationGroup.expires;
                this.registrationGroup.updatePayment(this.eventDetail);
            });
        Observable.forkJoin([
            this.memberService.getMembers(),
            this.memberService.friends(),
        ]).subscribe(
            results => {
                this.members = results[0].filter((m: PublicMember) => {
                    if (!this.eventDetail.isRegistered(m.id)) {
                        return m;
                    }
                });
                this.friends = results[1];
                this.friends.forEach(f => {
                    f.isRegistered = this.eventDetail.isRegistered(f.id);
                });
            }
        );
    }

    add(member: PublicMember): void {
        this.registrationGroup.registerMember(member);
        this.registrationGroup.updatePayment(this.eventDetail);
        if (!member.isFriend) {
            this.memberService.addFriend(member);
        }
    }

    removeFriend(reg: EventRegistration): void {
        this.friends.forEach( f => {
            if (f.id === reg.memberId) {
                f.isRegistered = false;
            }
        });
        this.registrationGroup.clearRegistration(reg.id);
        this.registrationGroup.updatePayment(this.eventDetail);
    }

    updatePayment() {
        this.registrationGroup.updatePayment(this.eventDetail);
    }

    selectMember($event: TypeaheadMatch) {
        // The value in the match here is the member name (not an object)
        let member = this.members.find(m => {
            return m.name === $event.value;
        });
        this.add(member);
        this.selectedMemberName = '';
    }

    openPayment(): void {
        this.paymentComponent.open();
    }

    paymentComplete(result: boolean): void {
        if (result) {
            this.eventService.refreshEventDetail().then(() => {
                if (this.eventDetail.eventType === EventType.Registration) {
                    this.authService.refreshUser();
                }
                let courseId = this.registrationGroup.courseSetupId ? this.registrationGroup.courseSetupId : 0;
                this.router.navigate(['registered', courseId], { relativeTo: this.route.parent });
            });
        }
    }

    cancelReservation(): void {
        // Guard against cancelling a paid registration
        if (this.paymentComponent.processStatus !== ProcessingStatus.Complete) {
            this.cancelling = true;
            this.eventService.cancelReservation(this.registrationGroup).then(() => {
                this.eventService.refreshEventDetail().then(() => {
                    this.location.back();
                });
            });
        }
    }

    canDeactivate(): Promise<boolean> | boolean {
        if (this.cancelling || this.paymentComponent.processStatus === ProcessingStatus.Complete) {
            this.cancelling = false;
            return true;
        }
        return this.dialogService.confirm(
            'Cancel Registration',
            `Are you sure you want to leave the registration page? You will not be registered,
             and your hole reservation (league only) will be canceled.`)
            .then(() => {
                return this.eventService.cancelReservation(this.registrationGroup).then(() => { return true; })
            })
            .catch(() => { return false; });
    }

    // Warn the user about leaving. We can't change the warning text or act if the user chooses to leave.
    @HostListener('window:beforeunload')
    onBeforeUnload(): boolean {
        return (this.cancelling || this.paymentComponent.processStatus === ProcessingStatus.Complete);
    }
}
