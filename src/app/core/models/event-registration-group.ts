import { EventRegistration } from './event-registration';
import { EventPayment } from '../../features/events/register/event-payment';
import { EventDetail } from './event-detail';
import { PublicMember } from './member';

export class EventRegistrationGroup {
    id: number;
    eventId: number;
    courseSetupId: number;
    courseName: string;
    registrantId: number;
    startingHole: number;
    startingOrder: number;
    notes: string;
    paymentConfirmationCode: string;
    paymentAmount: number;
    payment: EventPayment = new EventPayment();
    registrations: EventRegistration[];

    get startingHoleName(): string {
        return `${this.startingHole}${this.startingOrder === 0 ? 'A' : 'B' }`;
    }

    get canRegister(): boolean {
        return this.registrations && this.registrations.every( reg => { return reg.hasMember; });
    }

    fromJson(json: any): EventRegistrationGroup {
        this.id = json.id;
        this.eventId = json.event;
        this.courseSetupId = json.course_setup;
        this.registrantId = json.signed_up_by;
        this.startingHole = json.starting_hole;
        this.startingOrder = json.starting_order;
        this.notes = json.notes;
        this.paymentConfirmationCode = json.payment_confirmation_code;
        this.paymentAmount = json.payment_amount;

        if (json.slots) {
            this.registrations = [];
            json.slots.forEach((s: any) => this.registrations.push(new EventRegistration().fromJson(s)));
        }
        return this;
    }

    registerMember(friend: PublicMember): void {
        let done = false;
        this.registrations.forEach( s => {
            if (!s.hasMember && !done) {
                friend.isRegistered = true;
                s.memberId = friend.id;
                done = true;
            }
        });
    };

    removeRegistration(reg: EventRegistration): void {
        reg.memberId = -1;
    };

    updatePayment(event: EventDetail) {
        let subtotal = 0.0;
        this.registrations.forEach(reg => {
            if (reg.hasMember) {
                let fee = event.eventFee;
                if (reg.isGrossSkinsFeePaid) {
                    fee += event.skinsFee;
                }
                if (reg.isNetSkinsFeePaid) {
                    fee += event.skinsFee;
                }
                if (reg.isGreensFeePaid) {
                    fee += 18.0; // TODO: configure greens fees and cart fees
                }
                if (reg.isCartFeePaid) {
                    fee += 9.0;
                }
                reg.totalFees = fee;
                subtotal += fee;
            }
        });
        this.payment.update(subtotal);
    };
}
