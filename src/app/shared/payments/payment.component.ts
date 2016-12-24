import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'payment',
    templateUrl: 'payment.component.html',
    styleUrls: ['payment.component.css']
})
export class PaymentComponent {

    // constructor(eventService, memberService, stripe, toaster) {
    //     'ngInject';
    //     this._eventService = eventService;
    //     this._memberService = memberService;
    //     this._toaster = toaster;
    //     this.card = new Card(stripe);
    // }
    //
    // $onInit = () => {
    //     this.messages = [];
    //     this.processing = false;
    //     this.submitText = 'Submit Payment';
    //     this.event = this.resolve.event;
    //     this.group = this.resolve.group;
    //     this.amount = this.resolve.amount;
    //     this._memberService.stripeDetails().then( (customer) => {
    //         this.customer = customer;
    //         this.hasSavedCard = this.customer.stripe_id && this.customer.stripe_id.length > 0;
    //         this.useSavedCard = this.hasSavedCard;
    //     });
    // };
    //
    // cancelPayment = () => {
    //     this.dismiss({$value: 'cancel'});
    // };
    //
    // processPayment = () => {
    //     if (this.submitText === 'Continue') {
    //         this.close({$value: this.group});
    //     } else {
    //         this.processing = true;
    //         if (this.useSavedCard) {
    //             this.quickPayment();
    //         } else {
    //             if (!this.card.isValid()) {
    //                 return;
    //             }
    //             this.fullPayment();
    //         }
    //     }
    // };
    //
    // quickPayment = () => {
    //     this.messages.length = 0;
    //     this.messages.push({class: 'text-info', text: 'Charging card...'});
    //     this._eventService.register(this.group, this.amount).then( group => {
    //         this.successState(group);
    //     }).catch( response => {
    //         this.errorState(response);
    //     });
    // };
    //
    // fullPayment = () => {
    //     this.messages.length = 0;
    //     this.messages.push({class: 'text-info', text: 'Validating card...'});
    //     this.card.createToken().then(token => {
    //         this.messages.push({class: 'text-info', text: 'Charging card...'});
    //         return this._eventService.register(this.group, this.amount, token);
    //     }).then(group => {
    //         this.successState(group);
    //     }).catch(response => {
    //         this.errorState(response);
    //     });
    // };
    //
    // successState = (group) => {
    //     this._toaster.success('Payment Complete');
    //     this.group = group;
    //     this.messages.length = 0;
    //     this.messages.push({class: 'text-success', text: 'Payment complete'});
    //     this.messages.push({class: 'text-success', text: 'Confirmation #: ' + group.payment_confirmation_code});
    //     this.submitText = 'Continue';
    //     this.processing = false;
    // };
    //
    // errorState = (response) => {
    //     if (!response) {
    //         this._toaster.error('Connection Problem');
    //         this.messages.push({class: 'text-danger', text: 'Connection failure or timeout'});
    //     } else if (response.message) {
    //         this._toaster.warning('Invalid Card');
    //         this.messages.push({class: 'text-warning', text: response.message});
    //     } else {
    //         this._toaster.error('Payment Error');
    //         this.messages.push({class: 'text-danger', text: response.detail ? response.detail : 'Payment processing error'});
    //     }
    //     this.submitText = 'Retry';
    //     this.processing = false;
    // }
}
