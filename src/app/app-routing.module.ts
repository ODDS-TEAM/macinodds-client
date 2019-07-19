import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { NotFoundComponent } from './not-found/not-found.component';

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
    component: RegisterComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {

    path: 'admin',
    component: SideNavComponent,
    children: [
      {
        path: '',
        loadChildren: './component/component.module#ComponentModule'
      }
    ]
  },

  {
    path: 'user',
    component: SideNavComponent,
    children: [
      {
        path: '',
        loadChildren: './component/component.module#ComponentModule'
      }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }

  

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
