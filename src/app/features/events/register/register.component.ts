import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'bhmc-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent implements OnInit {

    name: string = 'register';

    constructor() {
    }

    ngOnInit(): void {
    }
}
