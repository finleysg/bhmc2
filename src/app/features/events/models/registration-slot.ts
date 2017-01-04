import { RegistrationRow } from './registration-row';
import * as moment from 'moment';
import { EventRegistration } from './event-registration';

export class RegistrationSlot {

    id: number;
    expires: moment.Moment;
    row: RegistrationRow;
    memberId: number;
    memberName: string;
    // slotNumber: number;
    status: SlotStatus;
    selected: boolean;

    static create(parent: RegistrationRow, slot: EventRegistration): RegistrationSlot {
        let newSlot = new RegistrationSlot();
        newSlot.expires = slot.expires;
        newSlot.id = slot.id;
        newSlot.row = parent;
        newSlot.memberId = slot.memberId;
        newSlot.memberName = slot.memberName;
        newSlot.selected = false;
        newSlot.updateStatus(slot.status);
        return newSlot;
    }

    isRegistered(memberId: number): boolean {
        return this.memberId === memberId;
    };

    get displayText(): string {
        if (this.selected && this.status === SlotStatus.Available) {
            return 'Selected';
        } else if (this.status === SlotStatus.Reserved) {
            return this.memberName;
        } else {
            return this.status.toString();
        }
    }

    get canSelect(): boolean {
        return this.status === SlotStatus.Available;
    }

    private updateStatus(rawStatus: string): void {
        this.status = SlotStatus.Unavailable;
        if (rawStatus === 'A') {
            this.status = SlotStatus.Available;
        } else if (rawStatus === 'P') {
            this.status = SlotStatus.Pending;
        } else if (rawStatus === 'R') {
            this.status = SlotStatus.Reserved;
        }
    }
}

export enum SlotStatus {
    Available = <any>'Available',
    Reserved = <any>'Reserved',
    Pending = <any>'Pending',
    Unavailable = <any>'Unavailable'
}
