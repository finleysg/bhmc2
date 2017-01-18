import { Injectable } from '@angular/core';
import { BhmcDataService } from './bhmc-data.service';
import { Observable } from 'rxjs/Observable';
import { EventDocument, DocumentType } from '../models/event-document';

class DocumentFilter {
    constructor(docType?: DocumentType, year?: number) {
        this.type = docType ? EventDocument.getDocType(docType) : null;
        this.year = year || null;
    }
    year: number;
    type: string;
}

@Injectable()
export class DocumentService {

    constructor(private dataService: BhmcDataService) {
    }

    getDocuments(docType?: DocumentType, year?: number): Observable<EventDocument[]> {
        let filter = new DocumentFilter(docType, year);
        return this.dataService.getApiRequest('documents', filter).map(members => {
            return members.map((m: any) => {
                return new EventDocument().fromJson(m);
            });
        });
    }
}
