// Registration record as received from the api
export class EventRegistration {

    id: number;
    courseName: string;
    courseSetupId: number;
    holeNumber: number;
    holeId: number;
    groupId: number;
    memberId: number;
    memberName: string;
    startingOrder: number;
    slotId: number;
    isEventFeePaid: boolean;
    isGrossSkinsFeePaid: boolean;
    isNetSkinsFeePaid: boolean;
    isGreensFeePaid: boolean;
    isCartFeePaid: boolean;
    totalFees: number;
    status: string;

    get hasMember(): boolean {
        return this.memberId > 0;
    }

    fromJson(json: any): EventRegistration {
        this.id = json.id;
        this.courseName = json.course ? json.course : 'In the Event';
        this.courseSetupId = json.course_setup_id ? +json.course_setup_id : 0;
        this.holeNumber = json.hole_number;
        this.holeId = json.hole_id;
        this.groupId = json.registration_group ? +json.registration_group : -1;
        this.memberId = json.member ? json.member : -1;
        this.memberName = json.member ? `${json.member_first_name} ${json.member_last_name}` : '';
        this.slotId = json.slot;
        this.startingOrder = json.starting_order;
        this.isEventFeePaid = json.member; // default to true if member is present
        this.isGrossSkinsFeePaid = json.is_gross_skins_paid;
        this.isNetSkinsFeePaid = json.is_net_skins_paid;
        this.isGreensFeePaid = json.is_greens_fee_paid;
        this.isCartFeePaid = json.is_cart_fee_paid;
        this.status = json.status;

        return this;
    }

    toJson(): any {
        // return only what the client has updated
        return {
            id: this.id,
            member: this.memberId,
            member_name: this.memberName, // To expedite potential troubleshooting
            is_event_fee_paid: this.isEventFeePaid,
            is_gross_skins_paid: this.isGrossSkinsFeePaid,
            is_net_skins_paid: this.isNetSkinsFeePaid,
            is_greens_fee_paid: this.isGreensFeePaid,
            is_cart_fee_paid: this.isCartFeePaid
        };
    }
}
