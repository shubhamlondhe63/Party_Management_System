import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PartyListComponent } from './pages/party-list/party-list.component';
import { PartyFormComponent } from './pages/party-form/party-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'parties', component: PartyListComponent },
  { path: 'parties/new', component: PartyFormComponent },
  { path: 'parties/edit/:id', component: PartyFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
