import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobRepComponent } from './home/components/jobrep/jobrep.component';
import { AboutUsComponent } from './home/components/about-us/about-us.component';
import { MatchComponent } from './home/components/match/match.component';
import { ForgotPasswordComponent } from './home/components/forgot-password/forgot-password.component';
import { EmployerComponent } from './home/components/employer/employer.component';

const routes: Routes = [{
  path:'',
  component:HomeComponent,
  children:[]
},
{
  path:'jobrep',
  component:JobRepComponent
}
,
// {
//   path:'about-us',
//   component:AboutUsComponent
// },
{
  path:'match',
  component:MatchComponent
},
{
  path:'forgot-pwd',
  component:ForgotPasswordComponent
},
{
  path:'employers',
  component:EmployerComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
