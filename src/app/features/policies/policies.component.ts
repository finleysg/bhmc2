import { Policy, PolicyCategory } from './policy';
import { ActivatedRoute, Params } from '@angular/router';
import { PolicyService } from './policy.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'bhmc-policies',
  templateUrl: 'policies.component.html',
  styleUrls: ['policies.component.css']
})

export class PoliciesComponent implements OnInit {

  name: string = 'policies';
  public policies: Policy[];
  // public policies: Observable<Policy>;

  constructor(
    private policyService: PolicyService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.params is an observable of the child (category) routes under /policies
    this.route.params.subscribe((p: Params) => this.loadPolicies(p['category']))
  }

  loadPolicies(category: string): void {
    let policyCategory = PolicyCategory.ClubPolicy;
    if (category === 'rules') {
      policyCategory = PolicyCategory.LocalRule;
    } else if (category === 'handicaps') {
      policyCategory = PolicyCategory.Handicaps;
    }
    // this.policies = this.policyService.loadPolicies(policyCategory);
    this.policies = [];
    this.policyService.loadPolicies(policyCategory).subscribe(p => this.policies.push(p));
  }
}
