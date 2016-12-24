import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'bhmc-header',
    templateUrl: 'page-header.component.html',
    styleUrls: ['page-header.component.css']
})

export class PageHeaderComponent implements OnInit {

    isOpen: boolean = false;

    constructor(private router: Router,
                private _layoutService: LayoutService) {
    }

    ngOnInit(): void {
        this._layoutService.sidebarToggle.subscribe(value => this.isOpen = value)
    }

    toggleSidebar() {
        this._layoutService.toggleSidebar();
    }
}
