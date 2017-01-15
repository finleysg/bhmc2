import { Component, OnInit, ViewChild } from '@angular/core';
import { User, AuthenticationService, EventDocument, DocumentType, EventPayment,
    EventRegistrationGroup, EventDetail, EventDetailService } from '../../../core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { PaymentComponent } from '../../../shared/payments/payment.component';
import { ConfigService } from '../../../app-config.service';
import { AppConfig } from '../../../app-config';
import * as moment from 'moment';

@Component({
    moduleId: module.id,
    templateUrl: 'new-member-signup.component.html',
    styleUrls: ['new-member-signup.component.css']
})
export class NewMemberSignupComponent implements OnInit {

    @ViewChild(PaymentComponent) private paymentComponent: PaymentComponent;

    public user: User;
    public other: any;
    public pw: any;
    public eventDetail: EventDetail;
    public group: EventRegistrationGroup;
    public paymentCalc: EventPayment;
    public application: EventDocument;
    public config: AppConfig;
    public loading: boolean;
    public registered: boolean;

    constructor(
        private authService: AuthenticationService,
        private eventService: EventDetailService,
        private toaster: ToasterService,
        private route: ActivatedRoute,
        private router: Router,
        private configService: ConfigService) {
    }

    ngOnInit(): void {
        this.user = new User();
        this.config = this.configService.config;
        this.route.data
            .subscribe((data: { eventDetail: EventDetail }) => {
                this.eventDetail = data.eventDetail;
                this.paymentCalc = new EventPayment();
                this.paymentCalc.update(this.eventDetail.eventFeeAlt);
                let signupDocs = this.eventDetail.getDocuments(DocumentType.SignUp);
                if (signupDocs) {
                    signupDocs.forEach(d => {  // TODO: better way to distinguish between the 2 signup docs
                        if (d.title === 'New Member Application') {
                            this.application = d;
                        }
                    })
                }
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
        // BUG: this is getting called a second time
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.user.member.birthDate = moment(this.other.birthday);
        this.authService.createAccount(this.user.toJson(this.pw.password1))
            .then(() => {
                this.toaster.pop('info', 'Account Created', 'Step 1 complete: your account has been created');
                return this.authService.quietLogin(this.user.username, this.pw.password1)
            })
            .then(() => {
                return this.eventService.reserve(this.eventDetail.id);
            })
            .then((group: EventRegistrationGroup) => {
                this.group = group;
                this.group.notes = 'NEW MEMBER REGISTRATION';
                if (this.other.name) {
                    this.group.notes = this.group.notes + `\nFormer club: ${this.other.name} (${this.other.number})`;
                }
                if (this.user.member.forwardTees) {
                    this.group.notes = this.group.notes + 'PLAYING FORWARD TEES';
                }
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
}
