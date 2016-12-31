import { RegistrationSlot, SlotStatus } from './registration-slot';

export class RegistrationRow {

    holeNumber: number;
    holeId: number;
    name: string;
    startingOrder: number;
    slots: RegistrationSlot[];

    static create(holeNumber: number, startingOrder: number, slots: any[]): RegistrationRow {
        let row = new RegistrationRow();
        row.holeNumber = holeNumber;
        row.holeId = slots[0] ? slots[0].hole_id : 0;
        row.startingOrder = startingOrder;
        row.slots = slots.map(s => RegistrationSlot.create(row, s));
        row.name = row.deriveName(holeNumber, startingOrder);
        return row;
    }

    // derives the hole name from the starting order
    private deriveName(holeNumber: number, startingOrder: number): string {
        if (startingOrder === 0) {
            return `${holeNumber}A`;
        } else if (startingOrder === 1) {
            return `${holeNumber}B`;
        } else if (startingOrder === 2) {
            return `${holeNumber}C`;
        } else {
            throw('Are you crazy?? No more than 3 groups on a hole.');
        }
    };

    isRegistered(memberId: number): boolean {
        return this.slots.some(slot => {
            return slot.isRegistered(memberId);
        });
    };

    get hasOpenings(): boolean {
        return this.slots.some( s => {
            return s.status === SlotStatus.Available;
        });
    };

    get isDisabled(): boolean {
        return !this.slots.some( s => {
            return s.selected;
        });
    }

    get selectedSlotIds(): number[] {
        return this.slots.filter(s => s.selected).map(s => { return s.id; });
    }
}
