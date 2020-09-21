import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { EditableTableService } from 'ng-editable-table/editable-table/editable-table.service';

@Component({
  selector: 'app-questionary',
  templateUrl: './questionaryone.component.html',

  
})
export class QuestionaryoneComponent implements OnInit {
      

      
      
  user: User;

  constructor(private accountService: AccountService, private router: Router) {
      this.user = this.accountService.userValue;
      
  }
  ngOnInit():void {
      
  }
}
