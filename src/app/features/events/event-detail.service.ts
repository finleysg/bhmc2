import { BhmcDataService, EventRegistrationGroup, EventDetail, RegistrationRow } from '../../core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { EventSignupTable } from './event-signup-table';

@Injectable()
export class EventDetailService {

    private signupTableSources: Map<number, BehaviorSubject<EventSignupTable>>;
    private signupTables: Map<number, Observable<EventSignupTable>>;
    public registrationGroup: EventRegistrationGroup;

    constructor(private dataService: BhmcDataService) { }

    getEventDetail(id: number): Promise<EventDetail> {
        return this.dataService.getApiRequest(`events/${id}`)
            .map((data: any) => {
                let event = new EventDetail().fromJson(data);
                let courses = this.eventCourses(event);
                this.signupTableSources = new Map<number, BehaviorSubject<EventSignupTable>>();
                this.signupTables = new Map<number, Observable<EventSignupTable>>();
                courses.forEach(c => {
                    let table = new BehaviorSubject(this.createSignupTable(event, c));
                    this.signupTableSources.set(c.id, table);
                    this.signupTables.set(c.id, table.asObservable());
                });
                return event;
            })
            .toPromise();
    }

    reserve(id: number, row: RegistrationRow = null): Promise<EventRegistrationGroup> {
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
                this.registrationGroup = new EventRegistrationGroup().fromJson(data);
                return this.registrationGroup;
            })
            .toPromise();
    }

    signupTable(id: number): Observable<EventSignupTable> {
        return this.signupTables.get(id);
    }

    eventCourses(eventDetail: EventDetail): any[] {
        // pull all the courses out of the existing registrations
        let tmp = {};
        let courses = eventDetail.registrations.reduce((result, item) => {
            if (!tmp[item.courseSetupId]) {
                tmp[item.courseSetupId] = item.courseName;
                result.push({
                    id: +item.courseSetupId,
                    name: item.courseName
                });
            }
            return result;
        }, []);
        if (!courses) {
            courses = [];
            courses.push({id: 0, name: 'TBD'});
        }
        return courses;
    }

    createSignupTable(eventDetail: EventDetail, course: any): EventSignupTable {
        // each table is a hierarchy: course --> rows --> slots
        let table = new EventSignupTable(course.id, course.name);
        for (let h = 1; h <= eventDetail.holesPerRound; h++) {
            const aGroups = eventDetail.registrations.filter( s => {
                return s.courseSetupId === course.id && s.startingOrder === 0 && s.holeNumber === h;
            });
            const bGroups = eventDetail.registrations.filter( s => {
                return s.courseSetupId === course.id && s.startingOrder === 1 && s.holeNumber === h;
            });
            table.rows.push(RegistrationRow.create(h, 0, aGroups));
            table.rows.push(RegistrationRow.create(h, 1, bGroups));
        }
        return table;
    }
}
