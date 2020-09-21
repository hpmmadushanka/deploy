import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-institution-availability',
  templateUrl: './institution-availability.component.html',
  styleUrls: ['./institution-availability.component.less']
})
export class InstitutionAvailabilityComponent implements OnInit {

  nc = null;
  ndc = null;
  bur = null;
  ia_nc = null;
  ia_ndc = null;
  ia_bur = null;
  if_no_nc = null;
  if_no_bur = null;
  // 1 foe NC
    // 2 for NDC
    // 3 for BUR

  constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getIA()
            .pipe(first())
            .subscribe(ia => this.nc = ia);
            
            this.accountService.getInstRes(1)
            .pipe(first())
            .subscribe(instResponsibility => this.ia_nc = instResponsibility);
            this.accountService.getInstRes(2)
            .pipe(first())
            .subscribe(instResponsibility => this.ia_ndc = instResponsibility);
            this.accountService.getInstRes(3)
            .pipe(first())
            .subscribe(instResponsibility => this.ia_bur = instResponsibility);
            this.accountService.getIfno(2)
            .pipe(first())
            .subscribe(ia => this.if_no_bur = ia);
            this.accountService.getIfno(1)
            .pipe(first())
            .subscribe(ia => this.if_no_nc = ia);
    }

}


import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';

