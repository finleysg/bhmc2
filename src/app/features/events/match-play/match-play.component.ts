import { AppConfig } from '../../../app-config';
import { puts } from 'util';
import { ConfigService } from '../../../app-config.service';
import { Component, OnInit } from '@angular/core';
import { User, AuthenticationService, EventDetail, EventDocument, DocumentType, DialogService } from '../../../core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';

@Component({
    moduleId: module.id,
    templateUrl: 'match-play.component.html',
    styleUrls: ['match-play.component.css']
})
export class MatchPlayComponent implements OnInit {

    public eventDetail: EventDetail;
    public currentUser: User;
    public application: EventDocument;
    public canRegister: boolean;
    public config: AppConfig;

    constructor(private route: ActivatedRoute,
                private dialogService: DialogService,
                private configService: ConfigService,
                private authService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.currentUser = this.authService.user;
        this.config = this.configService.config;
        this.route.data
            .subscribe((data: { eventDetail: EventDetail }) => {
                this.eventDetail = data.eventDetail;
                this.application = this.eventDetail.getDocument(DocumentType.SignUp);
                this.canRegister = this.currentUser.isAuthenticated && this.eventDetail.signupEnd.isAfter(moment()) && !this.currentUser.member.matchplayParticipant;
            });
    }

    showTodo() {
        this.dialogService.info('Admin Placeholder', 'This will be an admin function where you can upload the latest brackets or standings.');
    }
}
