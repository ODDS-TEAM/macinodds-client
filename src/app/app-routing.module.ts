import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SideNavUserComponent } from './side-nav-user/side-nav-user.component';
import { LoginComponent } from './login/login.component';
import { FirstLoginComponent } from './first-login/first-login.component'

const routes: Routes = [
  {path: 'login', component: LoginComponent,
  // children: [
  //   { path: 'apps', loadChildren: './component/component.module#ComponentModule' }
  // ]
},

  {
    path: '',
    component: LoginComponent,
    // children: [
    //   { path: 'apps', loadChildren: './component/component.module#ComponentModule' }
    // ]
  }, 
  {
    path: 'first-login',
    component: FirstLoginComponent
  },
  {

    path: 'admin',
    component: SideNavComponent,
    children: [
      {
        path: 'app',
        loadChildren: './component/component.module#ComponentModule'
      }
    ]
  },

  {
    path: 'user',
    component: SideNavComponent,
    children: [
      {
        path: 'app',
        loadChildren: './component/component.module#ComponentModule'
      }
    ]
  },

  // {path: 'viewUser', component: ViewUserComponent},
  // { path: 'view-user', component: ViewUserComponent },
   { path: '', redirectTo: 'login' , pathMatch: 'full' }


  // { path: 'view-user', component: ViewUserComponent },
  // { path: '', redirectTo: 'user' , pathMatch: 'full' },
  //  { path: '**', redirectTo: '' },


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
