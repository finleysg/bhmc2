export class PublicMember {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    location: string;
    phoneNumber: string;
    isFriend: boolean; // only in client
    isSelected: boolean; // only in client
    isRegistered: boolean; // only in client

    get name(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    fromJson(json: any): PublicMember {
        this.id = json.id;
        this.firstName = json.first_name;
        this.lastName = json.last_name;
        this.email = json.email;
        this.birthDate = json.birth_date;
        this.location = json.city;
        this.phoneNumber = json.phone_number;
        return this;
    }
}

export class PrivateMember {
    id: number;
    birthDate: string;
    ghin: string;
    handicap: number;
    handicapRevisionDate: string;
    location: string;
    phoneNumber: string;
    stripeCustomerId: string;
    duesPaid: boolean;

    fromJson(json: any): PrivateMember {
        this.id = json.id;
        this.birthDate = json.birth_date;
        this.ghin = json.ghin;
        this.handicap = json.handicap;
        this.handicapRevisionDate = json.handicap_revision_date;
        this.stripeCustomerId = json.stripe_customer_id;
        this.duesPaid = json.dues_paid;
        return this;
    }
    //
    // toJson(): any {
    //     const json = {
    //         'id': this.id.toString(),
    //         'birth_date': this.birthDate.toString(),
    //         'stripe_customer_id': this.stripeCustomerId,
    //         'dues_paid': this.duesPaid
    //     };
    //     return json;
    // }
}
