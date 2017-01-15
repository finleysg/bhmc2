export class EventDocument {
    id: number;
    title: string;
    url: string;
    type: DocumentType;
    year: number;
    eventId: number;

    fromJson(json: any): EventDocument {
        this.id = json.id;
        this.title = json.title;
        this.url = json.file;
        this.eventId = json.event;
        this.type = EventDocument.getDocumentType(json.document_type);
        this.year = json.year;
        return this;
    }

    static getDocumentType(shortType: string): DocumentType {
        let documentType = DocumentType.Other;
        if (shortType === 'R') {
            documentType = DocumentType.Results;
        } else if (shortType === 'T') {
            documentType = DocumentType.Teetimes;
        } else if (shortType === 'P') {
            documentType = DocumentType.SeasonPoints;
        } else if (shortType === 'D') {
            documentType = DocumentType.DamCup;
        } else if (shortType === 'M') {
            documentType = DocumentType.MatchPlay;
        } else if (shortType === 'F') {
            documentType = DocumentType.Financial;
        } else if (shortType === 'S') {
            documentType = DocumentType.SignUp;
        }
        return documentType;
    }
}

export enum DocumentType {
    Results = <any>'Event Results',
    Teetimes = <any>'Event Tee Times',
    SeasonPoints = <any>'Season Long Points',
    DamCup = <any>'Dam Cup',
    MatchPlay = <any>'Match Play',
    Financial = <any>'Financial Statements',
    SignUp = <any>'Sign Up',
    Other = <any>'Unknown'
}
