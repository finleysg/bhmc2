import { EventRegistration } from './event-registration';
import { EventPayment } from './event-payment';
import { EventDetail } from './event-detail';
import { PublicMember } from './member';
import moment from 'moment';
import { User } from './user';

export class EventRegistrationGroup {
    id: number;
    eventId: number;
    courseSetupId: number;
    courseName: string;
    registrantId: number;
    startingHole: number;
    startingOrder: number;
    notes: string;
    cardVerificationToken: string;
    paymentConfirmationCode: string;
    payment: EventPayment = new EventPayment();
    registrations: EventRegistration[];
    expires: moment.Moment;

    get startingHoleName(): string {
        return `${this.startingHole}${this.startingOrder === 0 ? 'A' : 'B' }`;
    }

    get canRegister(): boolean {
        return this.registrations && this.registrations.every( reg => { return reg.hasMember; });
    }

    static create(user: User): EventRegistrationGroup {
        let group = new EventRegistrationGroup();
        let reg = new EventRegistration();
        reg.isEventFeePaid = true;
        reg.memberId = user.member.id;
        reg.memberName = user.name;
        group.registrations = [];
        group.registrations.push(reg);
        return group;
    }

    fromJson(json: any): EventRegistrationGroup {
        this.id = json.id;
        this.eventId = json.event;
        this.courseSetupId = json.course_setup;
        this.registrantId = json.signed_up_by;
        this.startingHole = json.starting_hole;
        this.startingOrder = json.starting_order;
        this.notes = json.notes;
        this.cardVerificationToken = json.card_verification_token;
        this.paymentConfirmationCode = json.payment_confirmation_code;
        this.payment.total = json.payment_amount;
        if (json.expires) {
            this.expires = moment(json.expires);
        }
        if (json.slots) {
            this.registrations = [];
            json.slots.forEach((s: any) => this.registrations.push(new EventRegistration().fromJson(s)));
        }
        return this;
    }

    toJson(): any {
        return {
            id: this.id,
            event: this.eventId,
            course_setup: this.courseSetupId,
            signed_up_by: this.registrantId,
            starting_hole: this.startingHole,
            starting_order: this.startingOrder,
            notes: this.notes,
            card_verification_token: this.cardVerificationToken,
            payment_amount: this.payment.total,
            slots: this.registrations.map(r => r.toJson())
        };
    }

    registerMember(member: PublicMember): void {
        let done = false;
        this.registrations.forEach( s => {
            if (!s.hasMember && !done) {
                member.isRegistered = true;
                s.memberId = member.id;
                s.memberName = member.name;
                s.isEventFeePaid = true;
                done = true;
            }
        });
    };

    clearRegistration(registrationId: number): void {
        this.registrations.forEach(reg => {
            if (reg.id === registrationId) {
                reg.memberId = -1;
                reg.isEventFeePaid = false;
                reg.isGrossSkinsFeePaid = false;
                reg.isNetSkinsFeePaid = false;
                reg.isGreensFeePaid = false;
                reg.isCartFeePaid = false;
                reg.totalFees = 0.0;
            }
        });
    };

    updatePayment(event: EventDetail, useAlt: Boolean = false) {
        let subtotal = 0.0;
        this.registrations.forEach(reg => {
            if (reg.hasMember) {
                let fee = useAlt ? event.eventFeeAlt : event.eventFee;
                if (reg.isGrossSkinsFeePaid) {
                    fee += event.skinsFee;
                }
                if (reg.isNetSkinsFeePaid) {
                    fee += event.skinsFee;
                }
                if (reg.isGreensFeePaid) {
                    fee += event.greensFee;
                }
                if (reg.isCartFeePaid) {
                    fee += event.cartFee;
                }
                reg.totalFees = fee;
                subtotal += fee;
            }
        });
        this.payment.update(subtotal);
    };
}
