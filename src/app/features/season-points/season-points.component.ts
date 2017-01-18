import { Component, OnInit } from '@angular/core';
import { EventDocument, DocumentService, DocumentType } from '../../core';
import { ConfigService } from '../../app-config.service';

@Component({
    moduleId: module.id,
    templateUrl: 'season-points.component.html',
    styleUrls: ['season-points.component.css']
})
export class SeasonPointsComponent implements OnInit {

    currentStandings: EventDocument[];
    archives: EventDocument[];

    constructor(
        private configService: ConfigService,
        private documentService: DocumentService
    ) {
    }

    ngOnInit(): void {
        this.documentService.getDocuments(DocumentType.SeasonPoints)
            .subscribe(docs => {
                this.currentStandings = docs.filter(d => d.year === this.configService.config.year);
                this.archives = docs.filter(d => d.year !== this.configService.config.year);
            });
    }
}
