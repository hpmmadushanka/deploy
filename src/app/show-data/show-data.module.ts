import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowDataRoutingModule } from './show-data-routing.module';
import { ShowDataComponent } from './show-data.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { InstitutionAvailabilityComponent } from './institution-availability/institution-availability.component';
import { TransparencyActivitiesComponent } from './transparency-activities/transparency-activities.component';
import { BarriersComponent } from './barriers/barriers.component';
import { SupportRequiredComponent } from './support-required/support-required.component';
import { NcBurNdcComponent } from './nc-bur-ndc/nc-bur-ndc.component';
import { DataComponent } from './data/data.component';


@NgModule({
  declarations: [
    ShowDataComponent,
    CountriesListComponent,
    InstitutionAvailabilityComponent,
    TransparencyActivitiesComponent,
    BarriersComponent,
    SupportRequiredComponent,
    NcBurNdcComponent,
    DataComponent
  ],
  imports: [
    CommonModule,
    ShowDataRoutingModule,
    ReactiveFormsModule
  ]

})
export class ShowDataModule { }
