import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { EditableTableService } from 'ng-editable-table/editable-table/editable-table.service';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

import { Router, ActivatedRoute } from '@angular/router';


import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({
  selector: 'app-questionary',
  templateUrl: './questionary.component.html',

  
})
export class QuestionaryComponent implements OnInit {
  loading = false;
  submitted = false;
      regions: any;
      SAcountries: any;
      SEAcountries: any;
      nc_ndc_bur: any;
      whether: any;
      mainCategoryList: any;
      transparencyActivityList: any;
      sectorList: any;
      statusList: any;
      barriersAndGapList: any;
      q41 = false;
      q42det = false;
      region: any;
      country: any;
      assistanceReq: any;
      q4: any;
      q42: any;
      q43: any;
      q43show = false;
      selectRegion = false;
      public countries: any;
      
      control1: FormArray;
      control2: FormArray;
      control3: FormArray;
      control4: FormArray;
      control5: FormArray;
      control6: FormArray;

      mode: boolean;
     

      touchedRows1: any;
      touchedRows2: any;
      touchedRows3: any;
      touchedRows4: any;
      touchedRows5: any;
      touchedRows6: any;
      institutionList: any;

      


      tableQuestion3: FormGroup;
      institutionAvailabilityTable: FormGroup;
      legallyBoundTable: FormGroup;
      legallyNotBoundTable: FormGroup;
      transparencyActivityTable: FormGroup;
      barriersAndGapTable: FormGroup;


      userTable: FormGroup;
      control: FormArray;
    
      
      
      constructor(private fb1: FormBuilder,
                  private fb2: FormBuilder,
                  private fb3: FormBuilder,
                  private fb4: FormBuilder,
                  private fb5: FormBuilder,
                  private fb6: FormBuilder,
                  private fb: FormBuilder,
                  private route: ActivatedRoute,
                  private router: Router,
                  private accountService: AccountService,
                  private alertService: AlertService
                  ) { }

      ngOnInit(): void {
        this.regions = [{value: 'South Asia', id:'SA'},
                        {value: 'South East Asia', id: 'SEA'}]

        this.SAcountries = [{value: 'Afghanistan', id:'AF'},
                            {value: 'Bangladesh', id:'BD'},
                            {value: 'Bhutan', id:'BT'},
                            {value: 'India', id:'IN'},
                            {value: 'Maldives', id:'MV'},
                            {value: 'Nepal', id:'NP'},
                            {value: 'Pakistan', id:'PK'},
                            {value: 'Sri Lanka', id:'LK'}]

        this.SEAcountries = [{value: 'Brunei', id:'BN'},
                            {value: 'Cambodia', id:'KH'},
                            {value: 'Indonesia', id:'ID'},
                            {value: 'Laos', id:'LA'},
                            {value: 'Malaysia', id:'MY'},
                            {value: 'Myanmar', id:'MM'},
                            {value: 'Philippines', id:'PH'},
                            {value: 'Singapore', id:'SG'},
                            {value: 'Thailand', id:'TH'},
                            {value: 'Vietnam', id:'VN'}]
        this.nc_ndc_bur = [{value: 'National Communication', id:'NC'},
                          {value: 'Nationally Determined Contributions', id: 'NDC'},
                        {value: 'Biennial Update Report', id: 'BUR'}]

        this.mainCategoryList = [{value:'Mitigation'},{value:'Adaption'},{value:'Support'}]

        this.transparencyActivityList= [
          {value:'Emission (GHG inventories)', id: 'Emission'},
          {value:'Policy/ project impacts', id: 'Policy'},
          {value:'GHG projection and scenarios', id: 'GHG'},
          {value:'Vulnerability assesment', id: 'Vulnerability'},
          {value:'Risk assesment', id: 'Risk'},
          {value:'Adaption plans', id: 'Adaption'},
          {value:'Support provided', id: 'Support provided'},
          {value:'Support recieved', id: 'Support recieved'}
        ]

        this.sectorList = [{value:'Energy generation'},{value:'Transport'},{value:'Agriculture'},
        {value:'Forestry'},{value:'Industry'},{value:'Others'},]
        this.whether = [{value:'Yes', id:'Y'},{value:'No', id:'N'}]
        this.statusList = [{value:'Proposed'}, {value: 'ongoing'}]
        this.barriersAndGapList = [{value: 'National Communication', id:'NC'},{value: 'Biennial Update Report', id: 'BUR'}]




        console.log("questionary component")

        this.touchedRows1 = [];
        this.touchedRows2 = [];
        this.touchedRows3 = [];
        this.touchedRows4 = [];
        this.touchedRows5 = [];
        this.touchedRows6 = [];
        this.institutionList = [];


        this.tableQuestion3 = this.fb1.group({
          tableRows: this.fb1.array([])
        });
        this.institutionAvailabilityTable = this.fb2.group({
          tableRows: this.fb2.array([])
        });
        this.legallyBoundTable = this.fb3.group({
          tableRows: this.fb3.array([])
        });
        this.legallyNotBoundTable = this.fb4.group({
          tableRows: this.fb4.array([])
        });
        this.transparencyActivityTable = this.fb5.group({
          tableRows: this.fb5.array([])
        });
        this.barriersAndGapTable = this.fb6.group({
          tableRows: this.fb6.array([])
        });
        this.userTable = this.fb.group({
          tableRows: this.fb.array([])
        });
        
        this.addRow(1);
        this.addRow(2);
        this.addRow(3);
        this.addRow(4);
        this.addRow(5);
        this.addRow(6);
        
      }

      public onChangeRegion(): void {
        const  x  = this.region;
        if(this.country!=null){
          this.country=null
        }
        console.log(x)
        this.selectRegion = true;
        this.countries = this.getCountries(x);
        console.log(this.countries)
      }
      public questionFour(): void {
        const x = this.q4;
        console.log("question 4",x, this.q41)
        if (x=='Yes'){
          console.log("question 4",x,this.q41)
          this.q41 = true;
          this.q43show = false;
        } else{
          this.q41 = false;
          this.q43show = true;
        }
        
        
      }

      public questionFourTwo(): void {
        const x = this.q42;
        console.log("question 4.2",x)
        if (x=='Yes'){
          this.q42det = true;
          this.q43 = false;
        } else {
          this.q42det = false;
          this.q43 = true;
        }
        
        
      }

      private getCountries(x): any{
        console.log(x,"x value get countries")
        if(x == 'SA'){
          return this.SAcountries
        } else if(x == 'SEA'){
          return this. SEAcountries
        }
      }





      ngAfterOnInit() {
        this.control1 = this.tableQuestion3.get('tableRows') as FormArray;
        this.control2 = this.institutionAvailabilityTable.get('tableRows') as FormArray;
        this.control3 = this.legallyBoundTable.get('tableRows') as FormArray;
        this.control4 = this.legallyNotBoundTable.get('tableRows') as FormArray;
        this.control5 = this.transparencyActivityTable.get('tableRows') as FormArray;
        this.control6 = this.barriersAndGapTable.get('tableRows') as FormArray;
        this.control = this.userTable.get('tableRows') as FormArray;
      }
    
      initiateForm1(): FormGroup {
        return this.fb1.group({
          activity: ['', Validators.required],
          subNumber: ['', [Validators.required]],
          status: ['', [Validators.required]],
          fsup: ['', [Validators.required]],
          tsup: ['', [Validators.required]],
          isEditable: [true]
        });
      }

      initiateForm2(): FormGroup {
        return this.fb2.group({
          institution: ['', Validators.required],
          rolesAndResponsibilities: ['', [Validators.required]],
          regarding: ['', [Validators.required]],
          isEditable: [true]
        });
      }

      initiateForm3(): FormGroup {
        return this.fb3.group({
          ministry: ['', Validators.required],
          legallyBound: ['', [Validators.required]],
          description: ['', [Validators.required]],
          isEditable: [true]
        });
      }

      initiateForm4(): FormGroup {
        return this.fb4.group({
          reg: ['', Validators.required],
          desc: ['', [Validators.required]],
          isEditable: [true]
        });
      }

      initiateForm5(): FormGroup {
        return this.fb5.group({
          mainCategory: ['', Validators.required],
          transparencyActivity: ['', [Validators.required]],
          sector: ['', [Validators.required]],
          financialSup: ['', [Validators.required]],
          technicalSup: ['', [Validators.required]],
          project: ['', [Validators.required]],
          statusOfProject: ['', [Validators.required]],
          references: ['', [Validators.required]],
          isEditable: [true]
        });
      }

      initiateForm6(): FormGroup {
        return this.fb6.group({
          preparing: ['', Validators.required],
          gap: ['', [Validators.required]],
          isEditable: [true]
        });
      }
    
    
      addRow(table: number) {
        if (table==1){
          const control =  this.tableQuestion3.get('tableRows') as FormArray;
          console.log("add row to tableQuestion3")
          control.push(this.initiateForm1());
        } else if (table==2){
          const control =  this.institutionAvailabilityTable.get('tableRows') as FormArray;
          console.log("add row to institutionAvailabilityTable")
          control.push(this.initiateForm2());
          this.getMinistry();

        } else if (table==3){
          const control =  this.legallyBoundTable.get('tableRows') as FormArray;
          console.log("add row to legallyBoundTable")
          control.push(this.initiateForm3());
          
        } else if (table==4){
          const control =  this.legallyNotBoundTable.get('tableRows') as FormArray;
          console.log("add row to legallyNotBoundTable")
          control.push(this.initiateForm4());
          
        } else if (table==5){
          const control =  this.transparencyActivityTable.get('tableRows') as FormArray;
          console.log("add row to transparencyActivityTable")
          control.push(this.initiateForm5());
          
        } else if (table==6){
          const control =  this.barriersAndGapTable.get('tableRows') as FormArray;
          console.log("add row to barriersAndGapTable")
          control.push(this.initiateForm6());
          
        }
        
      }

      getMinistry(){
        const control = this.institutionAvailabilityTable.get('tableRows') as FormArray;
        this.touchedRows2 = control.controls.filter(row => row.touched).map(row => row.value);
        console.log("get ministry touched rows",this.touchedRows2);
        

      }
    
      deleteRow(table:number, index: number) {
        if (table==1){
          
          console.log("remove row from tableQuestion3")
          
          const control =  this.tableQuestion3.get('tableRows') as FormArray;
          control.removeAt(index);
        } else if (table==2){
          
          console.log("remove row from institutionAvailabilityTable")
          
          const control =  this.institutionAvailabilityTable.get('tableRows') as FormArray;
          control.removeAt(index);
        } else if (table==3){
          
          console.log("remove row from legallyBoundTable")
          
          const control =  this.legallyBoundTable.get('tableRows') as FormArray;
          control.removeAt(index);
          
        } else if (table==4){
        
          console.log("remove row from legallyNotBoundTable")
          
          const control =  this.legallyNotBoundTable.get('tableRows') as FormArray;
          control.removeAt(index);
          
        } else if (table==5){
          
          console.log("remove row from transparencyActivityTable")
          
          const control =  this.transparencyActivityTable.get('tableRows') as FormArray;
          control.removeAt(index);
          
        } else if (table==6){
          
          console.log("remove row from barriersAndGapTable")
          
          const control =  this.barriersAndGapTable.get('tableRows') as FormArray;
          control.removeAt(index);
          
        }
        
      }
    
      editRow(group: FormGroup) {
        group.get('isEditable').setValue(true);
      }
    
      doneRow(group: FormGroup) {
        group.get('isEditable').setValue(false);
      }
    
      // saveTransparencyActivityDetails() {
      //   console.log(this.transparencyTable.value);
      // }
      
    
      get getFormControls1() {
        const control = this.tableQuestion3.get('tableRows') as FormArray;
        return control;
      }
      get getFormControls2() {
        const control = this.institutionAvailabilityTable.get('tableRows') as FormArray;
        return control;
      }
      get getFormControls3() {
        const control = this.legallyBoundTable.get('tableRows') as FormArray;
        return control;
      }
      get getFormControls4() {
        const control = this.legallyNotBoundTable.get('tableRows') as FormArray;
        return control;
      }
      get getFormControls5() {
        const control = this.transparencyActivityTable.get('tableRows') as FormArray;
        return control;
      }
      get getFormControls6() {
        const control = this.barriersAndGapTable.get('tableRows') as FormArray;
        return control;
      }
    
      // submitForm() {
      //   const control = this.transparencyTable.get('tableRows') as FormArray;
      //   this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
      //   console.log(this.touchedRows);
      // }
    
      toggleTheme() {
        this.mode = !this.mode;
      }
      submitForm(tableNum: number) {
        if(tableNum==1){
          const control = this.tableQuestion3.get('tableRows') as FormArray;
          this.touchedRows1 = control.controls.filter(row => row.touched).map(row => row.value);
          console.log(this.touchedRows1);
        } else if (tableNum==2){
          const control = this.institutionAvailabilityTable.get('tableRows') as FormArray;
          this.touchedRows2 = control.controls.filter(row => row.touched).map(row => row.value);
          console.log(this.touchedRows2);
        } else if (tableNum==3){
          const control = this.legallyBoundTable.get('tableRows') as FormArray;
          this.touchedRows3 = control.controls.filter(row => row.touched).map(row => row.value);
          console.log(this.touchedRows3);
        } else if (tableNum==4){
          const control = this.legallyNotBoundTable.get('tableRows') as FormArray;
          this.touchedRows4 = control.controls.filter(row => row.touched).map(row => row.value);
          console.log(this.touchedRows4);
        } else if (tableNum==5){
          const control = this.transparencyActivityTable.get('tableRows') as FormArray;
          this.touchedRows5 = control.controls.filter(row => row.touched).map(row => row.value);
          console.log(this.touchedRows5);
        } else if (tableNum==6){
          const control = this.barriersAndGapTable.get('tableRows') as FormArray;
          this.touchedRows6 = control.controls.filter(row => row.touched).map(row => row.value);
          console.log(this.touchedRows6);
        } 
      }

      checkSubmitAuthentication(){
        this.loading =true;
        console.log(this.region)
        console.log(this.country)
        console.log(this.q4)
        console.log(this.tableQuestion3.value )
        console.log(this.institutionAvailabilityTable.value )
        console.log(this.legallyBoundTable.value )
        console.log(this.legallyNotBoundTable.value )
        console.log(this.transparencyActivityTable.value )
        console.log(this.barriersAndGapTable.value )
    
        this.submitForm(1);
        this.submitForm(2);
        this.submitForm(3);
        this.submitForm(4);
        this.submitForm(5);
        this.submitForm(6);
        console.log(this.assistanceReq)

        if (this.region!=null && this.country!=null && this.q4!=null) {
          this.onSubmit();
        } else {
          this.loading =false;
          this.alertService.warn('Fill Correctly', { keepAfterRouteChange: true });
        }
      }

      onSubmit() {
        
        this.accountService.prepareQuestionaryForm(
          this.region,
          this.country,
          this.q4,
          this.touchedRows1,
          this.touchedRows2,
          this.touchedRows3,
          this.touchedRows4,
          this.touchedRows5,
          this.touchedRows6,
          this.assistanceReq
        )
        this.alertService.success('Form Submitted successfully', { keepAfterRouteChange: true });
        this.router.navigate(['/questionary_submitted'], { relativeTo: this.route });
           
    }

        
        
}








    

    
    


  

