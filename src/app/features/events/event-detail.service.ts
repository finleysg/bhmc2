import { BhmcDataService, EventRegistrationGroup, EventDetail, RegistrationRow } from '../../core';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { EventSignupTable } from './event-signup-table';

@Injectable()
export class EventDetailService {

    constructor(private dataService: BhmcDataService) { }

    getEventDetail(id: number): Promise<EventDetail> {
        return this.dataService.getApiRequest(`events/${id}`)
            .map((data: any) => {
                return new EventDetail().fromJson(data);
            })
            .toPromise();
    }

    reserve(id: number): Promise<EventRegistrationGroup> {
        return this.dataService.postApiRequest('registration/reserve', { event_id: id })
            .map((data: any) => {
                return new EventRegistrationGroup().fromJson(data);
            })
            .toPromise();
    }

    createEventGrid(eventDetail: EventDetail): EventSignupTable[] {

        // pull all the courses out of the existing registrations
        let tmp = {};
        let setups = eventDetail.registrations.reduce((result, item) => {
            if (!tmp[item.courseSetupId]) {
                tmp[item.courseSetupId] = item.courseName;
                result.push({
                    id: item.courseSetupId,
                    name: item.courseName
                });
            }
            return result;
        }, []);

        // each table is a hierarchy: course --> rows --> slots
        let tables: EventSignupTable[] = [];
        for (const setup of setups) {
            let table = new EventSignupTable(setup.id, setup.name);
            for (let h = 1; h <= eventDetail.holesPerRound; h++) {
                const aGroups = eventDetail.registrations.filter( s => {
                    return s.courseSetupId === setup.id && s.startingOrder === 0 && s.holeNumber === h;
                });
                const bGroups = eventDetail.registrations.filter( s => {
                    return s.courseSetupId === setup.id && s.startingOrder === 1 && s.holeNumber === h;
                });
                table.rows.push(RegistrationRow.create(h, 0, aGroups));
                table.rows.push(RegistrationRow.create(h, 1, bGroups));
            }
            tables.push(table);
        }
        return tables;
    }
}
