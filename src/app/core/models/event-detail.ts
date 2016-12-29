import { EventDocument } from './event-document';

export class EventDetail {
    id: number;
    name: string;
    description: string;
    notes: string;
    rounds: number;
    holesPerRound: number;
    eventFee: number;
    skinsFee: number;
    groupSize: number;
    startType: StartType;
    canSignupGroup: boolean;
    canChooseHole: boolean;
    registrationWindow: string;
    externalUrl: string;
    eventType: EventType;
    skinsType: SkinsType;
    seasonPoints: number;
    requiresRegistration: boolean;
    startDate: string;
    startTime: string;
    enablePayments: boolean;
    signupStart: string;
    signupEnd: string;
    registrationMaximum: number;
    documents: EventDocument[];

    static getEventType(shortType: string): EventType {
        let eventType = EventType.Other;
        if (shortType === 'L') {
            eventType = EventType.League;
        } else if (shortType === 'W') {
            eventType = EventType.Major;
        } else if (shortType === 'H') {
            eventType = EventType.Holiday;
        } else if (shortType === 'M') {
            eventType = EventType.Meeting;
        } else if (shortType === 'B') {
            eventType = EventType.BoardMeeting;
        } else if (shortType === 'S') {
            eventType = EventType.State;
        } else if (shortType === 'R') {
            eventType = EventType.Registration;
        }
        return eventType;
    }

    static getSkinsType(shortType: string): SkinsType {
        let skinsType = SkinsType.None;
        if (shortType === 'I') {
            skinsType = SkinsType.Individual;
        } else if (shortType === 'T') {
            skinsType = SkinsType.Team;
        }
        return skinsType;
    }

    static getStartType(shortType: string): StartType {
        let startType = StartType.NA;
        if (shortType === 'TT') {
            startType = StartType.Teetimes;
        } else if (shortType === 'SG') {
            startType = StartType.Shotgun;
        }
        return startType;
    }
}

export enum StartType {
    Shotgun = <any>"Shotgun",
    Teetimes = <any>"Tee Times",
    NA = <any>"Not Applicable"
}

export enum EventType {
    League = <any>"League",
    Major = <any>"Weekend Major",
    Holiday = <any>"Holiday Pro-shop Event",
    Meeting = <any>"Member Meeting",
    BoardMeeting = <any>"Board Meeting",
    Other = <any>"Other",
    State = <any>"State Tournament",
    Registration = <any>"Open Registration Period"
}

export enum SkinsType {
    Individual = <any>"Individual",
    Team = <any>"Team",
    None = <any>"No Skins"
}