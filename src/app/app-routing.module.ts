import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./account/login.component";
import {RegisterComponent} from "./account/register.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: 'account/login', component: LoginComponent},
  {path: 'account/register', component: RegisterComponent},
  // if you make a path to AppComponent you load <router-outlet> twice
  {path: 'home', component: HomeComponent},
  // always redirect to account/login for now, change this when you have a landing page
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
