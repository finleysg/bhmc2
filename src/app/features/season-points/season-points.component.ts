import { Component, OnInit } from '@angular/core';
import { EventDocument, DocumentService, DocumentType, DialogService, User, AuthenticationService } from '../../core';
import { ConfigService } from '../../app-config.service';

@Component({
    moduleId: module.id,
    templateUrl: 'season-points.component.html',
    styleUrls: ['season-points.component.css']
})
export class SeasonPointsComponent implements OnInit {

    currentUser: User;
    currentYear: EventDocument[];
    archives: EventDocument[];

    constructor(
        private configService: ConfigService,
        private dialogService: DialogService,
        private authService: AuthenticationService,
        private documentService: DocumentService
    ) {
    }

    ngOnInit(): void {
        this.currentUser = this.authService.user;
        this.documentService.getDocuments(DocumentType.SeasonPoints)
            .subscribe(docs => {
                this.currentYear = docs.filter(d => d.year === this.configService.config.year);
                this.archives = docs.filter(d => d.year !== this.configService.config.year);
            });
    }

    showTodo() {
        this.dialogService.info('Admin Placeholder', 'This will be an admin function where you can upload the latest standings.');
    }
}
