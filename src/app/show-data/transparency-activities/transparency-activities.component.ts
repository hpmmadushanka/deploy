import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transparency-activities',
  templateUrl: './transparency-activities.component.html',
  styleUrls: ['./transparency-activities.component.less']
})
export class TransparencyActivitiesComponent implements OnInit {
  activities =null;

  constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getTransparencyActivities()
            .pipe(first())
            .subscribe(activities => this.activities = activities);
    }

}

import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';


