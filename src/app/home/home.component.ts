import { Component, OnInit } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit{
    user: User;

    constructor(private accountService: AccountService, private router: Router) {
        this.user = this.accountService.userValue;
        
    }
    ngOnInit():void {
        if (this.user.status=='normal'){
            this.router.navigate(['/questionary']);
        }
    }
}