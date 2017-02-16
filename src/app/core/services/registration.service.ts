import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { EventRegistrationGroup } from '../models/event-registration-group';
import { BhmcDataService } from './bhmc-data.service';
import { RegistrationRow } from '../../features/events/models/registration-row';
import { StripeCharge } from '../models/stripe-charge';

@Injectable()
export class RegistrationService {

    private group: EventRegistrationGroup;
    private registrationGroupSource: Subject<EventRegistrationGroup>;
    public registrationGroup$: Observable<EventRegistrationGroup>;
    private sessionRegistrations: number[]; // convenience collection of events registered for in the current session

    constructor(private dataService: BhmcDataService) {
        this.registrationGroupSource = new Subject<EventRegistrationGroup>();
        this.registrationGroup$ = this.registrationGroupSource.asObservable();
        this.sessionRegistrations = [];
    }

    loadGroup(id: number): void {
        this.dataService.getApiRequest(`registration/groups/${id}`)
            .subscribe((data: any) => {
                this.group = new EventRegistrationGroup().fromJson(data);
                this.registrationGroupSource.next(this.group);
            });
    }

    get currentGroup(): EventRegistrationGroup {
        return this.group;
    }

    reserve(id: number, row: RegistrationRow = null): Promise<void> {
        let payload: any = {
            event_id: id
        };
        if (row) {
            Object.assign(payload, {
                course_setup_hole_id: row.holeId,
                starting_order: row.startingOrder,
                slot_ids: row.selectedSlotIds
            });
        }
        return this.dataService.postApiRequest('registration/reserve', payload)
            .map((data: any) => {
                this.group = new EventRegistrationGroup().fromJson(data);
                this.registrationGroupSource.next(this.group);
            })
            .toPromise();
    }


    register(group: EventRegistrationGroup): Promise<string> {
        return this.dataService.postApiRequest('registration/register', {'group': group.toJson()})
            .map((data: any) => {
                this.group = null; // start over
                this.registrationGroupSource.next(this.group);
                this.sessionRegistrations.push(group.eventId);
                return new EventRegistrationGroup().fromJson(data).paymentConfirmationCode;
            })
            .toPromise();
    }

    cancelReservation(group: EventRegistrationGroup): Promise<void> {
        return this.dataService.postApiRequest('registration/cancel', {group_id: group.id})
            .map(() => {
                this.group = null;
                this.registrationGroupSource.next(this.group);
            })
            .toPromise();
    }

    isRegistered(eventId: number, memberId: number): Promise<boolean> {
        if (!memberId) {  // anonymous user
            return new Promise(resolve => resolve(false));
        } else if (this.sessionRegistrations.indexOf(eventId) >= 0) {
            return new Promise(resolve => resolve(true));
        } else {
            return this.dataService.getApiRequest(`registration/${eventId}/${memberId}`)
                .map((json: any) => {
                    return json.registered;
                })
                .toPromise();
        }
    }

    // technically any holes with one group, but that always means par 3's
    addGroups(eventId: number): Promise<number> {
        return this.dataService.postApiRequest('registration/add-groups', {event_id: eventId})
            .map((data: any) => {
                return +data.groups_added;
            })
            .toPromise();
    }

    getGroups(eventId: number): Observable<EventRegistrationGroup[]> {
        return this.dataService.getApiRequest('registration/groups', {event_id: eventId})
            .map((groups: any[]) => {
                let regGroups: EventRegistrationGroup[] = [];
                groups.forEach(g => {
                    regGroups.push(new EventRegistrationGroup().fromJson(g));
                });
                return regGroups;
            });
    }

    getPayments(eventId: number): Observable<StripeCharge[]> {
        return this.dataService.getApiRequest(`registration/charges/${eventId}`)
            .map((charges: any[]) => {
                let eventCharges: StripeCharge[] = [];
                charges.forEach(c => {
                    eventCharges.push(new StripeCharge().fromJson(c));
                });
                return eventCharges;
            });
    }

    getPayment(chargeId: string): Observable<StripeCharge> {
        return this.dataService.getApiRequest('registration/charge', {id: chargeId})
            .map((charge: any) => {
                return new StripeCharge().fromJson(charge);
            });
    }
}
