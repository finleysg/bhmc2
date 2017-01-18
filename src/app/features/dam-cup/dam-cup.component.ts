import { Component, OnInit } from '@angular/core';
import { EventDocument, DocumentService, DocumentType } from '../../core';
import { ConfigService } from '../../app-config.service';

@Component({
    moduleId: module.id,
    templateUrl: 'dam-cup.component.html',
    styleUrls: ['dam-cup.component.css']
})
export class DamCupComponent implements OnInit {

    currentYear: EventDocument[];
    archives: EventDocument[];

    constructor(private configService: ConfigService,
                private documentService: DocumentService) {
    }

    ngOnInit(): void {
        this.documentService.getDocuments(DocumentType.DamCup)
            .subscribe(docs => {
                this.currentYear = docs.filter(d => d.year === this.configService.config.year);
                this.archives = docs.filter(d => d.year !== this.configService.config.year);
            });
    }
}
