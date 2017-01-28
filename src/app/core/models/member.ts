declare const moment: any;

export class PublicMember {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: any;
    location: string;
    phoneNumber: string;
    forwardTees: boolean;
    isFriend: boolean; // only in client
    isRegistered: boolean; // only in client

    get name(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    fromJson(json: any): PublicMember {
        this.id = json.id;
        this.firstName = json.first_name;
        this.lastName = json.last_name;
        this.email = json.email;
        this.birthDate = moment(json.birth_date);
        this.location = json.city;
        this.phoneNumber = json.phone_number;
        this.forwardTees = json.forward_tees;
        return this;
    }
}

export class PrivateMember {
    id: number;
    birthDate: any;
    ghin: string;
    handicap: number;
    handicapRevisionDate: string;
    location: string;
    phoneNumber: string;
    stripeCustomerId: string;
    forwardTees: boolean;
    address: string;
    zipCode: string;
    membershipIsCurrent: boolean;
    matchplayParticipant: boolean;

    fromJson(json: any): PrivateMember {
        this.id = json.id;
        this.birthDate = moment(json.birth_date);
        this.location = json.city;
        this.phoneNumber = json.phone_number;
        this.ghin = json.ghin;
        this.handicap = json.handicap;
        this.handicapRevisionDate = json.handicap_revision_date;
        this.stripeCustomerId = json.stripe_customer_id;
        this.forwardTees = json.forward_tees;
        this.address = json.address1;
        this.zipCode = json.zip;
        return this;
    }

    // used for new account creation
    toJson(): any {
        return {
            'address1': this.address,
            'city': this.location,
            'zip': this.zipCode,
            'birth_date': this.birthDate.format('YYYY-MM-DD'),
            'phone_number': this.phoneNumber,
            'ghin': this.ghin,
            'forward_tees': this.forwardTees
        };
    }
}
