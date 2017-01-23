import { months } from 'moment';
import { Policy, PolicyCategory } from './policy';
import { ActivatedRoute, Params } from '@angular/router';
import { PolicyService } from './policy.service';
import { Component, OnInit } from '@angular/core';
import { DocumentService, EventDocument, DocumentType } from '../../core';

@Component({
    moduleId: module.id,
    templateUrl: 'policies.component.html',
    styleUrls: ['policies.component.css']
})

export class PoliciesComponent implements OnInit {

    public policies: Policy[];
    public byLaws: EventDocument;
    public policyName: string;

    constructor(private policyService: PolicyService,
                private documentService: DocumentService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        // this.route.params is an observable of the child (category) routes under /policies
        this.route.params.subscribe((p: Params) => this.loadPolicies(p['category']))
        this.documentService.getDocuments(DocumentType.Other)
            .subscribe(docs => {
                const d = docs.filter(d => d.title.indexOf('Law') >= 0);
                if (d && d.length === 1) this.byLaws = d[0];
            });
    }

    loadPolicies(category: string): void {
        let policyCategory = PolicyCategory.ClubPolicy;
        this.policyName = "Policies & Procedures"
        if (category === 'rules') {
            this.policyName = "Local Rules";
            policyCategory = PolicyCategory.LocalRule;
        } else if (category === 'handicaps') {
            this.policyName = "Handicaps & Scoring";
            policyCategory = PolicyCategory.Handicaps;
        } else if (category === 'finances') {
            this.policyName = "Financial Information";
            policyCategory = PolicyCategory.PaymentFaq;
        } else if (category === 'new-members') {
            this.policyName = "New Member FAQs";
            policyCategory = PolicyCategory.NewMember;
        }

        this.policies = [];
        this.policyService.loadPolicies(policyCategory).subscribe(p => this.policies.push(p));
    }
}
