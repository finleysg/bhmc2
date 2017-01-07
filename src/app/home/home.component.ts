import { Component, OnInit } from '@angular/core';
import { DialogService } from '../core';

@Component({
    moduleId: module.id,
    selector: 'bhmc-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {

    announcements: any = [];

    constructor(private dialogService: DialogService) {
    }

    ngOnInit(): void {
        this.announcements.push({ text: 'Now is the winter of our discontent made glorious summer by this son of York' });
    }

    testAlert() {
        this.dialogService.confirm('WTF?', 'If you do this, you die.')
            .then(
                (result: boolean) => {
                    window.alert(result);
                }
            )
            .catch(
                (result: boolean) => {
                    window.alert(result);
                }
            )
    }
}
