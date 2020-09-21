import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support-required',
  templateUrl: './support-required.component.html',
  styleUrls: ['./support-required.component.less']
})
export class SupportRequiredComponent implements OnInit {

  sups = null;

  constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getSupReq()
            .pipe(first())
            .subscribe(sups => this.sups = sups);
    }
  }

import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';

