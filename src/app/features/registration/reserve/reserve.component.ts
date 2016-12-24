import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'bhmc-reserve',
    templateUrl: 'reserve.component.html',
    styleUrls: ['reserve.component.css']
})

export class ReserveComponent implements OnInit {

    name: string = 'reserve';

    constructor() {
    }

    ngOnInit(): void {
    }
}
