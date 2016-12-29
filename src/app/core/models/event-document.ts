export class EventDocument {
    id: number;
    title: string;
    url: string;
    type: DocumentType;
    year: number;
    eventId: number;
}

export enum DocumentType {
    Results = <any>"Event Results",
    Teetimes = <any>"Event Tee Times",
    SeasonPoints = <any>"Season Long Points",
    DamCup = <any>"Dam Cup",
    MatchPlay = <any>"Match Play",
    Financial = <any>"Financial Statements"
}