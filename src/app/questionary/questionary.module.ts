import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionaryRoutingModule } from './questionary-routing.module';
import { QuestionaryComponent } from './questionary.component';
import { QuestionaryoneComponent } from './questionaryone.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';

import {NgSelectModule, NgOption} from '@ng-select/ng-select';


@NgModule({
  declarations: [
    QuestionaryComponent,
    QuestionaryoneComponent,

  ],
  imports: [
    CommonModule,
    QuestionaryRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    BrowserAnimationsModule,
    NgSelectModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class QuestionaryModule { }
