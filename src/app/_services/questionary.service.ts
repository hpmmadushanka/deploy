import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';


@Injectable({ providedIn: 'root' })
export class QuestionaryService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    
    // public questionForm: QuestoinaryForm

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    // submitQuestionary(questionForm: QuestoinaryForm) {
    //     console.log(questionForm)
    //     return this.http.post(`https://sa-sea-dev.herokuapp.com/answer`, questionForm);
    // }

    // prepareQuestionaryForm(region:any, country:any, q4:any,t1:any, t2:any, t3:any, t4:any, t5:any, t6:any, assistanceReq: any){
    //     this.questionForm.region=region;
    //     this.questionForm.countryCode=country;
    //     this.questionForm.q3=t1;
    //     this.questionForm.q4=q4
    //     this.questionForm.q41=t2
    //     this.questionForm.q42=t3;
    //     this.questionForm.q43=t4;
    //     this.questionForm.q5=t5;
    //     this.questionForm.q6=t6;
    //     this.questionForm.q7=assistanceReq;
    // }
   
    

    
}