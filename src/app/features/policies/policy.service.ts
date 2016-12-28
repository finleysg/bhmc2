import { Observable } from 'rxjs/Observable';
import { BhmcDataService } from '../../core/bhmc-data.service';
import { Injectable } from '@angular/core';
import { Policy, PolicyCategory } from './policy';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/filter';

@Injectable()
export class PolicyService {

    constructor(private dataService: BhmcDataService) { }

    loadPolicies(category: PolicyCategory): Observable<Policy> {
        return this.dataService.getApiRequest('policies')
            .mergeAll() // turn Observable<any> where any=collection into Observable
            .map((p: any) => new Policy().fromJson(p))
            .filter((policy: Policy) => policy.category === category)
    }
}