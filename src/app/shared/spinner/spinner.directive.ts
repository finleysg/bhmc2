import { ElementRef, OnInit, OnDestroy, Input, Directive } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { Subscription } from 'rxjs/Subscription';

declare let Spinner: any;

@Directive({ selector: '[bhmc-spinner]' })
export class SpinnerDirective implements OnInit, OnDestroy {

    private spinner: any;
    private element: any;
    private subscription: Subscription;

    @Input('bhmc-spinner') name: string;
    @Input() scale: number = 0.25; // Scales overall size of the spinner
    @Input() color: string = '#fff'; // #rgb or #rrggbb or array of colors

    constructor(private spinnerElement: ElementRef,
                private spinnerService: SpinnerService) {
        this.element = spinnerElement.nativeElement;
    }

    ngOnInit() {
        this.initSpinner();
        this.createServiceSubscription();
    }

    private initSpinner() {
        // http://spin.js.org/#?lines=17&length=0&width=10&radius=25&scale=0.50&corners=1.0&opacity=0.05&rotate=0&direction=1&speed=0.7&trail=60&top=50&left=50
        let options = {
            lines: 17,
            length: 0,
            width: 10,
            radius: 25,
            scale: this.scale,
            corners: 1.0,
            color: this.color,
            opacity: 0.05,
            rotate: 0,
            direction: 1,
            speed: 0.7,
            trail: 60,
            zIndex: 2e9, // Artificially high z-index to keep on top
        };
        this.spinner = new Spinner(options);
    }

    private createServiceSubscription() {
        this.subscription = this.spinnerService.getSpinner(this.name).subscribe(show => {
            if (show) {
                this.spinner.spin(this.element);
            } else {
                this.spinner.stop();
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.spinnerService.remove(this.name);
    }
}
