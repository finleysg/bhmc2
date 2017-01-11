import { Policy, PolicyCategory } from './policy';
import { PolicyService } from './policy.service';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: 'about-us.component.html'
})

export class AboutUsComponent implements OnInit {

    public policies: Policy[];

    constructor(private policyService: PolicyService) { }

    ngOnInit(): void {
        this.policies = [];
        this.policyService.loadPolicies(PolicyCategory.AboutUs).subscribe(p => this.policies.push(p));
    }
}
