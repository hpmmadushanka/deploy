import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { QuestionaryComponent } from './questionary/questionary.component';
import { QuestionaryoneComponent } from './questionary/questionaryone.component';
import { AuthGuard } from './_helpers';
import { AdminAuthGuard } from './_helpers/admin.auth.guard';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const questionaryModule = () => import('./questionary/questionary.module').then(x=> x.QuestionaryModule)
const showDataModule = ()  => import('./show-data/show-data.module').then(x=> x.ShowDataModule)

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule},
    { path: 'account', loadChildren: accountModule },
    { path: 'questionary', component: QuestionaryComponent, },
    { path: 'questionary_submitted', component: QuestionaryoneComponent, },
    { path: 'show_data', loadChildren: showDataModule},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }