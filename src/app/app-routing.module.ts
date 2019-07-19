import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { NotFoundComponent } from './not-found/not-found.component';
import { GuardService } from './service/guard/guard.service';

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
    children: [
      {
        path: '',
        loadChildren: './component/component.module#ComponentModule',
        canActivate: [GuardService] 
      }
    ]
  },

  {
    path: 'user',
    component: SideNavComponent,
    children: [
      {
        path: '',
        loadChildren: './component/component.module#ComponentModule',
        canActivate: [GuardService] 
      }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full', canActivate: [GuardService] 
}

  

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
