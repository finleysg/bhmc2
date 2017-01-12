import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { ModalDirective } from 'ng2-bootstrap';
import { MemberService, RuntimeSettings, SavedCard, EventDetailService, AuthenticationService,
    EventDetail, EventRegistrationGroup } from '../../core';
import { CreditCard } from './credit-card';

declare const Spinner: any;

export enum ProcessingStatus {
    Pending,
    Validating,
    Processing,
    Complete,
    Invalid,
    Failure
}

class ProcessingState {
    text: string;
    style: string;
    icon: string;
    disabled: boolean;
    complete: boolean;
}

class ProcessingResult {
    text: string;
    style: string;

    constructor(text: string, style: string) {
        this.text = text;
        this.style = style;
    }
}

@Component({
    moduleId: module.id,
    selector: 'payment',
    templateUrl: 'payment.component.html',
    styleUrls: ['payment.component.css']
})
export class PaymentComponent implements OnInit {

    @Input() registrationGroup: EventRegistrationGroup;
    @Input() eventDetail: EventDetail;
    @Output() onClose = new EventEmitter<boolean>();
    @ViewChild('paymentModal') private paymentModal: ModalDirective;

    public card: CreditCard;
    public messages: ProcessingResult[];
    public processStatus: ProcessingStatus;
    public savedCard: string;
    public hasSavedCard: boolean;
    public useSavedCard: boolean;

    private spinner: any;
    private spinnerElement: any;

    constructor(private eventService: EventDetailService,
                private memberService: MemberService,
                private authService: AuthenticationService,
                private elementRef: ElementRef,
                private settings: RuntimeSettings,
                private toaster: ToasterService) {
    }

    ngOnInit() {
        this.messages = [];
        this.card = new CreditCard();
        if (this.authService.user.isAuthenticated) {
            this.memberService.stripeSavedCard().then((savedCard: SavedCard) => {
                // TODO: refactor to use object
                this.savedCard = savedCard.description;
                this.hasSavedCard = savedCard.description.length > 0;
                this.useSavedCard = this.hasSavedCard;
            });
        }
        this.initSpinner();
        Stripe.setPublishableKey(this.settings.stripePublicKey);
    };

    open(): void {
        this.messages.length = 0;
        this.processStatus = ProcessingStatus.Pending;
        this.paymentModal.config = { backdrop: 'static', keyboard: false };
        this.spinnerElement = this.elementRef.nativeElement.querySelector('#spinner-span');
        this.paymentModal.show();
    }

    cancelPayment(): void {
        this.paymentModal.hide();
        this.onClose.emit(false);
    };

    processPayment(): void {
        if (this.processStatus === ProcessingStatus.Complete) {
            this.paymentModal.hide();
            this.onClose.emit(true);
        } else {
            if (this.useSavedCard) {
                this.quickPayment();
            } else {
                if (!this.card.isValid()) {
                    return;
                }
                this.fullPayment();
            }
        }
    };

    quickPayment(): void {
        this.processStatus = ProcessingStatus.Processing;
        this.spinner.spin(this.spinnerElement);
        this.eventService.register(this.registrationGroup).then(group => {
            this.successState(group);
        }).catch(response => {
            this.errorState(response);
        });
    };

    fullPayment(): void {
        this.processStatus = ProcessingStatus.Validating;
        this.spinner.spin(this.spinnerElement);
        this.card.createToken().then((token: string) => {
            this.processStatus = ProcessingStatus.Processing;
            this.registrationGroup.cardVerificationToken = token;
            return this.eventService.register(this.registrationGroup);
        }).then((group: EventRegistrationGroup) => {
            this.successState(group);
        }).catch((response: any) => {
            this.errorState(response);
        });
    };

    successState(group: EventRegistrationGroup): void {
        this.spinner.stop();
        this.processStatus = ProcessingStatus.Complete;
        this.registrationGroup = group;
        this.messages.length = 0;
        this.messages.push(new ProcessingResult('Payment complete', 'text-success'));
        this.messages.push(new ProcessingResult('Confirmation #: ' + group.paymentConfirmationCode, 'text-success'));
        this.toaster.pop('success', 'Payment Complete', `Your payment for ${group.payment.total} has been processed.`);
    };

    errorState(message: any): void {
        this.spinner.stop();
        this.processStatus = ProcessingStatus.Failure;
        this.messages.length = 0;
        if (!message) {
            this.messages.push(new ProcessingResult('Connection failure or timeout', 'text-danger'));
            this.toaster.pop('error', 'Connection Problem', 'Your internet connection is down or unavailable');
        } else {
            this.messages.push(new ProcessingResult(message, 'text-danger'));
            this.toaster.pop('error', 'Payment Error', message);
        }
    }

    get currentState(): ProcessingState {
        let state = new ProcessingState();
        switch (this.processStatus) {
            case ProcessingStatus.Validating:
                state.text = 'Validating';
                state.style = 'btn-info';
                state.icon = 'zmdi-download';
                state.disabled = true;
                break;
            case ProcessingStatus.Processing:
                state.text = 'Processing';
                state.style = 'btn-info';
                state.icon = 'zmdi-upload';
                state.disabled = true;
                break;
            case ProcessingStatus.Complete:
                state.text = 'Payment Complete';
                state.style = 'btn-success';
                state.icon = 'zmdi-check';
                state.disabled = false;
                state.complete = true;
                break;
            case ProcessingStatus.Invalid:
                state.text = 'Retry';
                state.style = 'btn-warning';
                state.icon = 'zmdi-close';
                state.disabled = false;
                break;
            case ProcessingStatus.Failure:
                state.text = 'Retry';
                state.style = 'btn-danger';
                state.icon = 'zmdi-close';
                state.disabled = false;
                break;
            default:
                state.text = 'Submit Payment';
                state.style = 'btn-primary';
                state.icon = 'zmdi-money';
                state.disabled = false;
        }
        return state;
    }

    private initSpinner() {
        let options = {
            lines: 17,
            length: 0,
            width: 10,
            radius: 25,
            scale: 0.5,
            corners: 1.0,
            color: '#fff',
            opacity: 0.05,
            rotate: 0,
            direction: 1,
            speed: 0.7,
            trail: 60,
            zIndex: 2e9, // Artificially high z-index to keep on top
        };
        this.spinner = new Spinner(options);
    }
}
