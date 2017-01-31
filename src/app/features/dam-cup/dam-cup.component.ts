import { Component, OnInit } from '@angular/core';
import { EventDocument, DocumentService, DocumentType, DialogService, User, AuthenticationService } from '../../core';
import { ConfigService } from '../../app-config.service';

@Component({
    moduleId: module.id,
    templateUrl: 'dam-cup.component.html',
    styleUrls: ['dam-cup.component.css']
})
export class DamCupComponent implements OnInit {

    currentUser: User;
    currentYear: EventDocument[];
    archives: EventDocument[];
    selectedFile: any = {};

    constructor(private configService: ConfigService,
                private dialogService: DialogService,
                private authService: AuthenticationService,
                private documentService: DocumentService) {
    }

    ngOnInit(): void {
        this.currentUser = this.authService.user;
        this.documentService.getDocuments(DocumentType.DamCup)
            .subscribe(docs => {
                this.currentYear = docs.filter(d => d.year === this.configService.config.year);
                this.archives = docs.filter(d => d.year !== this.configService.config.year);
            });
    }

    showTodo(): void {
        this.dialogService.info('Admin Placeholder', 'This will be an admin function where you can upload the latest standings.');
    }

    fileSelected($event: any): void {
        this.selectedFile = $event.target.files[0];
    }

    uploadDocument(): void {
        let form = new FormData();
        form.append('file', this.selectedFile);
        form.append('document_type', 'D');
        form.append('year', this.configService.config.year);
        form.append('title', `${this.configService.config.year} Dam Cup Standings`);
        // TODO: if not new, add id
        this.documentService.uploadDocument(form, 0).then(() => {
            // toast success and refresh
        });
    }
}
