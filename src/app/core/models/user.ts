import { PrivateMember } from './member';

export enum AccountUpdateType {
    PersonalInfo,
    ContactInfo,
    Username
}

export class User {

    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    member: PrivateMember;
    isAuthenticated: boolean = false;
    isStaff: boolean = false;
    isActive: boolean = false;

    constructor() {
    }

    get name() {
        if (!this.isAuthenticated) {
            return 'Guest';
        }
        return this.firstName + ' ' + this.lastName;
    };

    // TODO: this is temporary
    isInRole(role: string) {
        let result = true;
        if (this.isStaff && role) {
            result = false;
        }
        return result;
    }

    fromJson(json: any): User {
        if (json) {
            this.id = json.id;
            this.username = json.username;
            this.firstName = json.first_name;
            this.lastName = json.last_name;
            this.email = json.email;
            this.isAuthenticated = json.is_authenticated;
            this.isStaff = json.is_staff;
            this.isActive = json.is_active;
            this.member = new PrivateMember().fromJson(json.member);
        }
        return this;
    }

    partialUpdateJson(updateType: AccountUpdateType): any {
        switch (updateType) {
            case AccountUpdateType.PersonalInfo:
                return {
                    'first_name': this.firstName,
                    'last_name': this.lastName,
                    'member': {
                        'birth_date': this.member.birthDate ? this.member.birthDate.format('YYYY-MM-DD') : null,
                        'city': this.member.location
                    }
                };
            case AccountUpdateType.ContactInfo:
                return {
                    'email': this.email,
                    'member': {
                        'phone_number': this.member.phoneNumber
                    }
                };
            case AccountUpdateType.Username:
                return {
                    'username': this.username,
                    'member': { }
                };
            default:
                return {}
        }
    }
}
