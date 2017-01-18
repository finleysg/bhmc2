import { Injectable } from '@angular/core';
import { BhmcDataService } from './bhmc-data.service';
import { Observable } from 'rxjs/Observable';
import { EventDocument, DocumentType } from '../models/event-document';
import { EventType, EventDetail } from '../models/event-detail';

class DocumentFilter {
    constructor(docType?: DocumentType, year?: number, eventType?: EventType) {
        this.dtype = docType ? EventDocument.getDocumentCode(docType) : null;
        this.etype = eventType ? EventDetail.getEventCode(eventType) : null;
        this.year = year || null;
    }
    year: number;
    dtype: string;
    etype: string;
}

@Injectable()
export class DocumentService {

    constructor(private dataService: BhmcDataService) {
    }

    getDocuments(docType?: DocumentType, year?: number, eventType?: EventType): Observable<EventDocument[]> {
        let filter = new DocumentFilter(docType, year, eventType);
        return this.dataService.getApiRequest('documents', filter).map(members => {
            return members.map((m: any) => {
                return new EventDocument().fromJson(m);
            });
        });
    }
}
