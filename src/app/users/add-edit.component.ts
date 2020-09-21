import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    countries: any;
    

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = true;
        
        this.countries = [{value: 'Afghanistan', id:'AF'},
                            {value: 'Bangladesh', id:'BD'},
                            {value: 'Bhutan', id:'BT'},
                            {value: 'India', id:'IN'},
                            {value: 'Maldives', id:'MV'},
                            {value: 'Nepal', id:'NP'},
                            {value: 'Pakistan', id:'PK'},
                            {value: 'Sri Lanka', id:'LK'},
                            {value: 'Brunei', id:'BN'},
                            {value: 'Cambodia', id:'KH'},
                            {value: 'Indonesia', id:'ID'},
                            {value: 'Laos', id:'LA'},
                            {value: 'Malaysia', id:'MY'},
                            {value: 'Myanmar', id:'MM'},
                            {value: 'Philippines', id:'PH'},
                            {value: 'Singapore', id:'SG'},
                            {value: 'Thailand', id:'TH'},
                            {value: 'Vietnam', id:'VN'}]

        
        
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            countryCode: ['', Validators.required],
            role: ['', Validators.required],
            
        });

        
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        this.loading =true;

        // reset alerts on submit
        this.alertService.clear();

        
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('User added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['.', { relativeTo: this.route }]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        
    }
    


    

    private updateUser() {
        this.accountService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['..', { relativeTo: this.route }]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}