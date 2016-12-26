import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SpinnerService {
    private spinners: Map<string, Observable<boolean>>;
    private sources: Map<string, BehaviorSubject<boolean>>;

    constructor() {
        this.spinners = new Map();
        this.sources = new Map();
    }

    getSpinner(name: string) {
        if (this.spinners.has(name)) {
            return this.spinners.get(name);
        }
        let subject = new BehaviorSubject(false);
        this.sources.set(name, subject);
        this.spinners.set(name, subject.asObservable());
        return this.spinners.get(name);
    }

    show(name: string) {
        if (this.spinners.has(name)) {
            this.sources.get(name).next(true);
        }
    }

    hide(name: string) {
        if (this.spinners.has(name)) {
            this.sources.get(name).next(false);
        }
    }

    remove(name: string) {
        if (this.spinners.has(name)) {
            this.spinners.delete(name);
            this.sources.delete(name);
        }
    }
}
