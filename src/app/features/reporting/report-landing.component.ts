import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../app-config.service';
import { AppConfig } from '../../app-config';

@Component({
    moduleId: module.id,
    templateUrl: 'report-landing.component.html',
})
export class ReportLandingComponent implements OnInit {

    config: AppConfig;

    constructor(private configService: ConfigService) {
    }

    ngOnInit(): void {
        this.config = this.configService.config;
    }
}
