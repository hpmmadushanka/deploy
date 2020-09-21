import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Component({
  selector: 'app-barriers',
  templateUrl: './barriers.component.html',
  styleUrls: ['./barriers.component.less']
})
export class BarriersComponent implements OnInit {
  barriers = null;

  constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getBarriers()
            .pipe(first())
            .subscribe(barriers => this.barriers = barriers);
    }

}
