import { Component, OnInit } from '@angular/core';
import { MemberService, PublicMember } from '../../../core';

@Component({
    moduleId: module.id,
    templateUrl: 'account-report.component.html',
    styleUrls: ['account-report.component.css']
})
export class AccountReportComponent implements OnInit {

    public report: PublicMember[];

    constructor(private memberService: MemberService) { }

    ngOnInit(): void {
        this.memberService.getMembers().subscribe(members => {
            this.report = members
        });
    }

    exportCsv(): string {
        let csv = PublicMember.getCsvHeader() + '\n';
        if (this.report) {
            this.report.forEach(m => {
                csv += m.getCsvData() + '\n';
            });
        }
        return csv;
    }
}
