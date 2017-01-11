import { Policy, PolicyCategory } from './policy';
import { ActivatedRoute, Params } from '@angular/router';
import { PolicyService } from './policy.service';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: 'policies.component.html',
    styleUrls: ['policies.component.css']
})

export class PoliciesComponent implements OnInit {

    public policies: Policy[];

    constructor(private policyService: PolicyService,
                private route: ActivatedRoute) {
    }

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
        } else if (category === 'payments') {
            policyCategory = PolicyCategory.PaymentFaq;
        } else if (category === 'new-members') {
            policyCategory = PolicyCategory.NewMember;
        }

        this.policies = [];
        this.policyService.loadPolicies(policyCategory).subscribe(p => this.policies.push(p));
    }
}
