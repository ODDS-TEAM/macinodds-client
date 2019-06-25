import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent,
  // children: [
  //   { path: 'apps', loadChildren: './component/component.module#ComponentModule' }
  // ]
},
  {
    path: 'admin', component: SideNavComponent,
    children: [
      { path: 'app', loadChildren: './component/component.module#ComponentModule' }
    ]
  },
  {path: 'viewUser', component: ViewUserComponent,}
  // { path: 'view-user', component: ViewUserComponent },
   // { path: '', redirectTo: 'user' , pathMatch: 'full' },
  //  { path: '**', redirectTo: '' },


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
