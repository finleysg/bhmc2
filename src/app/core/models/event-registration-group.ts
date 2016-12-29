import { EventRegistration } from './event-registration';

export class EventRegistrationGroup {
    id: number;
    eventId: number;
    courseSetupId: number;
    registrantId: number;
    startingHole: number;
    startingOrder: number;
    notes: string;
    paymentConfirmationCode: string;
    paymentAmount: number;
    registrations: EventRegistration[];

    fromJson(json: any) {
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
    }
}