import { Component, OnInit } from '@angular/core';
import { EventDocument, DocumentService, DocumentType, EventType } from '../../../core';
import { ConfigService } from '../../../app-config.service';

@Component({
    moduleId: module.id,
    templateUrl: 'major-results.component.html',
    styleUrls: ['major-results.component.css']
})
export class MajorResultsComponent implements OnInit {

    currentYear: EventDocument[];
    archives: EventDocument[];

    constructor(private configService: ConfigService,
                private documentService: DocumentService) {
    }

    ngOnInit(): void {
        this.documentService.getDocuments(DocumentType.Results, null, EventType.Major)
            .subscribe(docs => {
                this.currentYear = docs.filter(d => d.year === this.configService.config.year);
                this.archives = docs.filter(d => d.year !== this.configService.config.year);
            });
    }
}
