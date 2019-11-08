import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { NotFoundComponent } from './not-found/not-found.component';
import { GuardService } from './service/guard/guard.service';
import { RoleGuardService } from './service/guard/role-guard.service';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
  },

  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuardService]
  },
  {
    path: '404',
    component: NotFoundComponent,
    canActivate: [GuardService]
  },
  {

    path: 'admin',
    component: SideNavComponent,
    canActivate: [RoleGuardService, GuardService], 
    data: { 
      expectedRole: 'admin'
    } ,
    children: [
      {
        path: '',
        loadChildren: './component/component.module#ComponentModule',
        canActivate: [GuardService, RoleGuardService],
        data: {
          expectedRole: 'admin'
        }
      }
    ]
  },

  {
    path: 'user',
    component: SideNavComponent,
    canActivate: [RoleGuardService, GuardService],
    data: {
      expectedRole: 'individual'
    },
    children: [
      {
        path: '',
        loadChildren: './component/component.module#ComponentModule',
        canActivate: [GuardService, RoleGuardService],
        data: {
          expectedRole: 'individual'
        }
      }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '**', redirectTo: '/404', pathMatch: 'full', canActivate: [GuardService]
  }



];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
