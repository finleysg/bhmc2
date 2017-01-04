import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { User, AuthenticationService, PublicMember, MemberService} from '../../../core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDetailService } from '../services/event-detail.service';
import { Observable } from 'rxjs/Observable';
import { TypeaheadMatch } from 'ng2-bootstrap';
import { PaymentComponent } from '../payments/payment.component';
import { EventRegistrationGroup } from '../models/event-registration-group';
import { EventDetail } from '../models/event-detail';
import { EventRegistration } from '../models/event-registration';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent implements OnInit {

    @ViewChild(PaymentComponent) private paymentComponent: PaymentComponent;

    public registrationGroup: EventRegistrationGroup;
    public eventDetail: EventDetail;
    public currentUser: User;
    public members: PublicMember[];
    public friends: PublicMember[];
    public selectedMemberName: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private eventService: EventDetailService,
        private memberService: MemberService,
        private authService: AuthenticationService) { }

    ngOnInit(): void {
        this.currentUser = this.authService.user;
        this.route.data
            .subscribe((data: {eventDetail: EventDetail}) => {
                this.eventDetail = data.eventDetail;
            });
        Observable.forkJoin([
            this.memberService.getMembers(),
            this.memberService.friends(),
            this.eventService.getRegistrationGroup(this.route.snapshot.params['groupId'])
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
                this.registrationGroup = results[2];
                this.registrationGroup.updatePayment(this.eventDetail);
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
            // TODO: readonly reserve view
            // this.router.navigate(['reserve'], { relativeTo: this.route.parent });
        }
    }

    cancelReservation(): void {
        this.eventService.cancelReservation(this.registrationGroup).then( () => {
            this.location.back();
        });
    }
}
