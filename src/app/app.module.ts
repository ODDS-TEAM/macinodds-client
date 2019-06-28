import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
// import { MenuAddDeviceComponent } from './component/menu-add-device/menu-add-device.component';
// import { MenuViewAdminComponent } from './component/menu-view-admin/menu-view-admin.component';

import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { from } from 'rxjs';
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angular-6-social-login';
import { SideNavUserComponent } from './side-nav-user/side-nav-user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuViewUserComponent } from './component/menu-view-user/menu-view-user.component';


export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('15378607653-f9lfgsml8th6lf50jfq93v3v2f4vpkpr.apps.googleusercontent.com')
      },

    ]
  );
  return config;
}




@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    LoginComponent,
    SideNavUserComponent,
    // MenuAddDeviceComponent,
    // MenuViewAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    HttpClientModule,
    RouterTestingModule,
    SocialLoginModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
  ],
  providers: [
    {provide: LocationStrategy,
     useClass: PathLocationStrategy },
     {provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
