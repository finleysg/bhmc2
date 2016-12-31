import { Component, OnInit } from '@angular/core';
import { EventRegistrationGroup } from '../../../core/models/event-registration-group';
import { EventDetail } from '../../../core/models/event-detail';
import { User } from '../../../core/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDetailService } from '../event-detail.service';
import { AuthenticationService } from '../../../core/authentication.service';
import { PublicMember } from '../../../core/models/member';
import { MemberService } from '../../../core/member.service';
import { Observable } from 'rxjs/Observable';
import { EventRegistration } from '../../../core/models/event-registration';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent implements OnInit {

    private registrationGroup: EventRegistrationGroup;
    public eventDetail: EventDetail;
    public currentUser: User;
    private members: PublicMember[];
    private friends: PublicMember[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private eventService: EventDetailService,
        private memberService: MemberService,
        private authService: AuthenticationService) { }

    ngOnInit(): void {
        this.currentUser = this.authService.user;
        this.registrationGroup = this.eventService.registrationGroup; // TODO: set defaults, and add guard
        this.route.data
            .subscribe((data: {eventDetail: EventDetail}) => {
                this.eventDetail = data.eventDetail;
                this.registrationGroup.updatePayment(this.eventDetail);
            });
        Observable.forkJoin([
            this.memberService.getMembers(),
            this.memberService.friends()
        ]).subscribe(
            results => {
                this.members = results[0].filter(m => {
                    if (!this.eventDetail.isRegistered(m.id)) {
                        return m;
                    }
                });
                this.friends = results[1];
                this.friends.forEach(f => {
                    f.isRegistered = this.eventDetail.isRegistered(m.id);
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
        this.registrationGroup.removeRegistration(reg);
        this.registrationGroup.updatePayment(this.eventDetail);
    }

    updatePayment(evt: any) {
        window.alert(evt);
    }

    openPayment(): void {
    //     let modal = this.modalService.open({
    //         size: 'sm',
    //         backdrop: 'static',
    //         component: 'payment',
    //         resolve: {
    //             event: this.eventDetail,
    //             group: this.registrationGroup
    //         }
    //     });
    //     modal.result.then( (value: EventRegistrationGroup) => {
    //         // redirect at this point
    //         this.registrationGroup = value;
    //         this.router.navigate(['reserve'], {relativeTo: this.route}); // TODO: readonly view
    //     }).catch( () => {
    //         // do nothing (modal canceled)
    //     });
    }

    cancelReservation(): void {
        // this.eventService.cancelReservation(this.group).then( () => {
        //     if (this.event.event_type === 'L') {
        //         this.$state.go('event.reserve', { id: this.event.id });
        //     } else {
        //         this.$state.go('event.detail', { id: this.event.id });
        //     }
        // });
    }
}
