import { Component, OnInit, ViewChild } from '@angular/core';
import { EventDocument, DocumentService, DocumentType, User, AuthenticationService } from '../../core';
import { ConfigService } from '../../app-config.service';
import { UploadComponent } from '../../shared/upload/upload.component';

@Component({
    moduleId: module.id,
    templateUrl: 'dam-cup.component.html',
    styleUrls: ['dam-cup.component.css']
})
export class DamCupComponent implements OnInit {

    @ViewChild(UploadComponent) uploadComponent: UploadComponent;

    currentUser: User;
    archives: EventDocument[];
    documentType: DocumentType = DocumentType.DamCup;

    currentStandings: EventDocument;

    constructor(private configService: ConfigService,
                private authService: AuthenticationService,
                private documentService: DocumentService) {
    }

    ngOnInit(): void {
        this.currentUser = this.authService.user;
        this.documentService.getDocuments(this.documentType)
            .subscribe(docs => {
                let current = docs.filter(d => d.year === this.configService.config.year);
                this.archives = docs.filter(d => d.year !== this.configService.config.year);
                if (current && current.length > 0) {
                    this.currentStandings = current[0];
                }
            });
    }

    showTodo(): void {
        this.uploadComponent.open(this.currentStandings);
    }

    uploadComplete(result: EventDocument): void {
        if (result) {
            this.currentStandings = result;
        }
    }
}
