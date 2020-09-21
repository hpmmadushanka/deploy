import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarriersComponent } from './barriers/barriers.component';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { DataComponent } from './data/data.component';
import { InstitutionAvailabilityComponent } from './institution-availability/institution-availability.component';
import { NcBurNdcComponent } from './nc-bur-ndc/nc-bur-ndc.component';

import { ShowDataComponent } from './show-data.component';
import { SupportRequiredComponent } from './support-required/support-required.component';
import { TransparencyActivitiesComponent } from './transparency-activities/transparency-activities.component';



const routes: Routes = [
  {
    path: '', component: ShowDataComponent,
    children: [
        { path: 'countries', component: CountriesListComponent },
        { path: 'nc_bur_ndc', component: NcBurNdcComponent },
        { path: 'institution_availability', component: InstitutionAvailabilityComponent },
        { path: 'transparency_activities', component: TransparencyActivitiesComponent },
        { path: 'barriers', component: BarriersComponent },
        { path: 'support_required', component: SupportRequiredComponent },
        { path: 'data', component: DataComponent }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowDataRoutingModule { }
