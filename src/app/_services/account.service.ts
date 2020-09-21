import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import axios from 'axios'
import firebase from '../_helpers/firebase';
import { analytics } from 'firebase';


export class QuestoinaryForm {
    region: String;
    countryCode: String;
    q3: any;
    q4: String;
    q41: any;
    q42: any;
    q43: any;
    q5: any;
    q6: any;
    q7: String;
  };

  export class NcBurNdc {
    countryName: String;
    countryCode: String;
    subNumber: String;
    status: String;
    fsup: String;
    tsup: String;
  };

  export class IA {
    countryName: String;
    countryCode: String;
    instAvailability: any;
  };
  export class IfNo {
    countryName: String;
    countryCode: String;
    activityCode: String;
    description: String;
    
  };

  export class InstResponsibility {
    countryName: String;
    countryCode: String;
    ministry: any;
    rolesAndRes: String;
    legallyBound: any;
    desc: any;
  };

  export class TransparencyActivity {
    countryName: String;
    countryCode: String;
    mainCategory: any;
    activity: String;
    fsup: any;
    tsup: any;
    projectsup: String;
    status: any;
    desc: any;
  };

  export class Barrier {
    countryName: String;
    countryCode: String;
    barrierNC: any;
    barrierBUR: any;
  };

  export class SupReq {
    countryName: String;
    countryCode: String;
    supReq: any;
  };

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    questionForm: QuestoinaryForm;

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

    async login(email, password) {
        this.removeLocalUser();
        let formattedUser: any;
        console.log('101')
        try {
          const user = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
          console.log(user);
          const {data: userDetails} = await axios.get(`https://sa-sea-dev.herokuapp.com/user/` + email);
    
          console.log(userDetails);
          formattedUser = {
            id: userDetails.uid,
            status: userDetails.role,
            email: email,
            countryCode: userDetails.countryCode,
          };
          console.log(formattedUser)
          localStorage.setItem('user', JSON.stringify(formattedUser));
          this.userSubject.next(formattedUser as User);
          if(formattedUser.status=='normal'){
            this.router.navigate(['/questionary']);
            }   else {
                this.router.navigate(['/']);
            }
            return true

          
        } catch (err) {
            return false
        }
        
      }
      

      async logout() {
        await firebase.auth().signOut();
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
      }

      removeLocalUser(){
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
      }  
    
    

    register(user: User) {
        return this.http.post(`https://sa-sea-dev.herokuapp.com/user`, user);
    }

    getAllUsers() {
        const headers = new HttpHeaders().set('access-control-allow-origin',"http://localhost:4200/");
        const httpHeaders: HttpHeaders = new HttpHeaders({
            'Access-Control-Allow-Origin': '*'
        });
       
        return this.http.get<User[]>(`https://sa-sea-dev.herokuapp.com/user/`);
    }

    getUserById(id: string) {
        return this.http.get<User>(`https://sa-sea-dev.herokuapp.com/user/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`https://sa-sea-dev.herokuapp.com/user/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }

    questionary(){
        this.router.navigate(['/questionary']);
    }

    async submitQuestionary(questionForm: QuestoinaryForm) {
        const axios = require('axios').default;
        const c = {
            region: "string",
            countryCode: "string",
            q3: { "tableRows": [ { "activity": "", "subNumber": "", "status": "", "fsup": "", "tsup": "", "isEditable": true } ] },
            q4: 'Yes',
            q41:  { "tableRows": [ { "institution": "", "rolesAndResponsibilities": "", "regarding": "", "isEditable": true } ] },
            q42:  { "tableRows": [ { "ministry": "", "legallyBound": "", "description": "", "isEditable": true } ] },
            q43: { "tableRows": [ { "reg": "", "desc": "", "isEditable": true } ] },
            q5:  { "tableRows": [ { "mainCategory": "", "transparencyActivity": "", "sector": "", "financialSup": "", "technicalSup": "", "project": "", "statusOfProject": "", "references": "", "isEditable": true } ]},
            q6:  { "tableRows": [ { "preparing": "", "gap": "", "isEditable": true } ] },
            q7: "string",
            
        }
    
        console.log("submitQuestionary",JSON.stringify(questionForm))
        await axios.post('https://sa-sea-dev.herokuapp.com/answer',questionForm)
        
        return this.http.post(`https://sa-sea-dev.herokuapp.com/answer`, JSON.stringify(questionForm))
        
    }



    prepareQuestionaryForm(region:any, country:any, q4:any,t1:any, t2:any, t3:any, t4:any, t5:any, t6:any, assistanceReq: any){
        const q = {
            "region": region,
            "countryCode": country,
            "q3": t1,
            "q4": q4,
            "q41": t2,
            "q42": t3,
            "q43": t4,
            "q5": t5,
            "q6": t6,
            "q7": assistanceReq

        }
        console.log(q)
        
        this.submitQuestionary(q)
       
    }


    // 1 foe NC
    // 2 for NDC
    // 3 for BUR

    getAllNCBURNDC(x: number) {
        if(x==1){
       
        return this.http.get<NcBurNdc[]>(`https://sa-sea-dev.herokuapp.com/answer/activity-plan/NC`);

        } else if(x==2){
            return this.http.get<NcBurNdc[]>(`https://sa-sea-dev.herokuapp.com/answer/activity-plan/NDC`);
            
        } else if(x==3){
            return this.http.get<NcBurNdc[]>(`https://sa-sea-dev.herokuapp.com/answer/activity-plan/BUR`);
            
        }
        
    }

    getIA() {
        const headers = new HttpHeaders().set('access-control-allow-origin',"http://localhost:4200/");
            const httpHeaders: HttpHeaders = new HttpHeaders({
            'Access-Control-Allow-Origin': '*'
        });
       
        return this.http.get<IA[]>(`https://sa-sea-dev.herokuapp.com/answer/is-available-country`);
        
    }
    getIfno(x: number) {
        if(x==1){
       
            return this.http.get<IfNo[]>(`https://sa-sea-dev.herokuapp.com/answer/no-institution/NC`);
    
            } else if(x==2){
                return this.http.get<IfNo[]>(`https://sa-sea-dev.herokuapp.com/answer/no-institution/BUR`);
                
            } 
        
        
        
    }

    getInstRes(x: number) {
        if(x==1){
            const headers = new HttpHeaders().set('access-control-allow-origin',"http://localhost:4200/");
            const httpHeaders: HttpHeaders = new HttpHeaders({
            'Access-Control-Allow-Origin': '*'
        });
       
        return this.http.get<InstResponsibility[]>(`https://sa-sea-dev.herokuapp.com/answer/responsibility/NC`);

        } else if(x==2){

            return this.http.get<InstResponsibility[]>(`https://sa-sea-dev.herokuapp.com/answer/responsibility/NDC`);
            
        } else if(x==3){
            return this.http.get<InstResponsibility[]>(`https://sa-sea-dev.herokuapp.com/answer/responsibility/BUR`);
            
        }
        
    }

    getTransparencyActivities() {
        const headers = new HttpHeaders().set('access-control-allow-origin',"http://localhost:4200/");
            const httpHeaders: HttpHeaders = new HttpHeaders({
            'Access-Control-Allow-Origin': '*'
        });
       
        return this.http.get<TransparencyActivity[]>(`https://sa-sea-dev.herokuapp.com/answer/transparency-activity`);
        
    }

    getBarriers() {
        
       
        return this.http.get<Barrier[]>(`https://sa-sea-dev.herokuapp.com/answer/barrier`);
        
    }

    getSupReq() {
        const headers = new HttpHeaders().set('access-control-allow-origin',"http://localhost:4200/");
            const httpHeaders: HttpHeaders = new HttpHeaders({
            'Access-Control-Allow-Origin': '*'
        });
       
        return this.http.get<SupReq[]>(`https://sa-sea-dev.herokuapp.com/answer/support`);
        
    }
    
}