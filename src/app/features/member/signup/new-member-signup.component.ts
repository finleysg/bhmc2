import { Component, OnInit, ViewChild } from '@angular/core';
import { RuntimeSettings, User, AuthenticationService,
    EventRegistrationGroup, EventDetail, EventDetailService } from '../../../core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { PaymentComponent, ProcessingStatus } from '../../../shared/payments/payment.component';
import * as moment from 'moment';
import { EventPayment } from '../../../core/models/event-payment';

@Component({
    moduleId: module.id,
    templateUrl: 'new-member-signup.component.html',
    // styleUrls: ['new-member-signup.component.css']
})
export class NewMemberSignupComponent implements OnInit {

    @ViewChild(PaymentComponent) private paymentComponent: PaymentComponent;

    public user: User;
    public other: any;
    public pw: any;
    public eventDetail: EventDetail;
    public group: EventRegistrationGroup;
    public paymentCalc: EventPayment;
    public loading: boolean;
    public registered: boolean;

    constructor(
        private authService: AuthenticationService,
        private eventService: EventDetailService,
        private toaster: ToasterService,
        private route: ActivatedRoute,
        private router: Router,
        private settings: RuntimeSettings) {
    }

    ngOnInit(): void {
        this.user = new User();
        this.route.data
            .subscribe((data: { eventDetail: EventDetail }) => {
                this.eventDetail = data.eventDetail;
                this.paymentCalc = new EventPayment();
                this.paymentCalc.update(this.eventDetail.eventFeeAlt);
            });
        this.other = {
            name: '',
            number: '',
            birthday: ''
        };
        this.pw = {
            password1: '',
            password2: ''
        }
    }

    createAccount(): void {
        this.loading = true;
        this.user.member.birthDate = moment(this.other.birthday);
        this.authService.createAcount(this.user.toJson(this.pw.password1))
            .then(() => {
                this.toaster.pop('info', 'Account Created', 'Step 1 complete: your account has been created');
                return this.authService.quietLogin(this.user.username, this.pw.password1)
            })
            .then(() => {
                return this.eventService.reserve(this.eventDetail.id);
            })
            .then((group: EventRegistrationGroup) => {
                this.group = group;
                this.group.updatePayment(this.eventDetail, true);
                this.paymentComponent.open();
            })
            .catch((err: any) => {
                this.loading = false;
                this.toaster.pop('error', 'Account Creation Error', err);
            })
    }

    paymentComplete(result: boolean): void {
        // remove any temporary auth token - user must log in
        this.authService.resetUser();
        if (result) {
            this.registered = true;
        } else {
            // TODO: what to do when user canceled payment?
        }
    }

    // cancelReservation(): void {
    //     // Guard against cancelling a paid registration
    //     if (this.paymentComponent.processStatus !== ProcessingStatus.Complete) {
    //         this.cancelling = true;
    //         this.eventService.cancelReservation(this.registrationGroup).then(() => {
    //             this.eventService.refreshEventDetail().then(() => {
    //                 this.location.back();
    //             });
    //         });
    //     }
    // }
}
