import * as moment from 'moment';

// Registration record as received from the api (not a "slot" object)
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
    expires: moment.Moment;

    fromJson(json: any): EventRegistration {
        this.id = json.id;
        this.courseName = json.course;
        this.courseSetupId = json.course_setup_id;
        this.holeNumber = json.hole_number;
        this.holeId = json.hole_id;
        this.groupId = json.registration_group;
        this.memberId = json.member;
        this.memberName = `${json.member_first_name} ${json.member_last_name}`;
        this.slotId = json.slot;
        this.startingOrder = json.starting_order;
        this.isEventFeePaid = json.is_event_fee_paid;
        this.isGrossSkinsFeePaid = json.is_gross_skins_paid;
        this.isNetSkinsFeePaid = json.is_net_skins_paid;
        this.isGreensFeePaid = json.is_greens_fee_paid;
        this.isCartFeePaid = false; // TODO
        if (json.expires) {
            this.expires = moment(json.expires);
        }
        return this;
    }
}