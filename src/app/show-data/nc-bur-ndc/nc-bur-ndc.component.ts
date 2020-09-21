import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Component({
  selector: 'app-nc-bur-ndc',
  templateUrl: './nc-bur-ndc.component.html',
  styleUrls: ['./nc-bur-ndc.component.less']
})
export class NcBurNdcComponent implements OnInit {

  ncs = null;
  ndcs = null;
  burs = null;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.getAllNCBURNDC(1)
        .pipe(first())
        .subscribe(ncBurNdc => this.ncs = ncBurNdc);
        this.accountService.getAllNCBURNDC(2)
        .pipe(first())
        .subscribe(NcBurNdc => this.ndcs = NcBurNdc);
        this.accountService.getAllNCBURNDC(3)
        .pipe(first())
        .subscribe(NcBurNdc => this.burs = NcBurNdc);
       console.log(this.ncs)
}

}


