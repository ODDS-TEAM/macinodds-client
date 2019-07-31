import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
  MatListModule, MatCard, MatCardModule, MatFormFieldModule, MatNativeDateModule, MatInputModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angular-6-social-login';
import { StorageServiceModule } from 'angular-webstorage-service';
import { LyThemeModule, LY_THEME, LY_THEME_GLOBAL_VARIABLES } from '@alyle/ui';
import { LyIconModule } from '@alyle/ui/icon';
import { MinimaLight } from '@alyle/ui/themes/minima';
import { LyButtonModule } from '@alyle/ui/button';
import { LyToolbarModule } from '@alyle/ui/toolbar';
import { LyResizingCroppingImageModule } from '@alyle/ui/resizing-cropping-images';
import { LyTypographyModule } from '@alyle/ui/typography';
import { RegisterComponent } from './register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotFoundComponent } from './not-found/not-found.component';
import { LottieAnimationViewModule } from 'ng-lottie';
import { JwtModule } from '@auth0/angular-jwt';
import * as Raven from 'raven-js';

Raven
  .config('https://de523585870146b080b39534a2b7ce33@sentry.io/1510174')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err.originalError);
  }
}

// @Injectable()
// export class SentryErrorHandler implements ErrorHandler {
//   constructor() { }
//   handleError(error) {
//     const eventId = Sentry.captureException(error.originalError || error);
//     Sentry.showReportDialog({ eventId });
//   }
// }

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        // provider: new GoogleLoginProvider('956316396976-mhb092ad69gn2olis0mtmc1fpe8blgn8.apps.googleusercontent.com')
        provider: new GoogleLoginProvider('15378607653-f9lfgsml8th6lf50jfq93v3v2f4vpkpr.apps.googleusercontent.com')
      },

    ]
  );
  return config;
}

export function tokenGetter() {
  return localStorage.getItem('token');
}


export class GlobalVariables {
  testVal = '#00bcd4';
  Quepal = {
    default: `linear-gradient(135deg,#11998e 0%,#38ef7d 100%)`,
    contrast: '#fff',
    shadow: '#11998e'
  };
  SublimeLight = {
    default: `linear-gradient(135deg,#FC5C7D 0%,#6A82FB 100%)`,
    contrast: '#fff',
    shadow: '#B36FBC'
  };
  Amber = {
    default: '#ffc107',
    contrast: 'rgba(0, 0, 0, 0.87)'
  };
}


@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
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
    MatGridListModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    HttpClientModule,
    SocialLoginModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    LyThemeModule.setTheme('minima-light'),
    LyButtonModule,
    LyToolbarModule,
    LyResizingCroppingImageModule,
    LyIconModule,
    LyTypographyModule,
    MatCardModule,
    MatFormFieldModule, MatNativeDateModule, MatInputModule,
    StorageServiceModule,
    FlexLayoutModule,
    LottieAnimationViewModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs },
    { provide: LY_THEME, useClass: MinimaLight, multi: true },
    { provide: LY_THEME, useClass: MinimaLight, multi: true },
    { provide: LY_THEME_GLOBAL_VARIABLES, useClass: GlobalVariables }, // global variables
    { provide: ErrorHandler, useClass: RavenErrorHandler },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
