


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

//MSAL
import {MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent} from '@azure/msal-angular';
import {InteractionType, PublicClientApplication} from '@azure/msal-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


//Angular material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { AzureAdDemoService } from './azure-ad-demo.service';


const isIE = window.navigator.userAgent.indexOf('MSIE')> -1 || window.navigator.userAgent.indexOf('Trident/') >-1
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MsalModule.forRoot(new PublicClientApplication(
      {
        auth:{
          clientId: '9726291d-ad1f-4bed-a171-3a0499e3a390',
          redirectUri: 'http://localhost:4200',
          authority: 'https://login.microsoftonline.com/5519430b-51d9-4fae-aa73-1f997828c015'
        },
        cache:{
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: isIE
        }
      }
    ),
    {
      interactionType: InteractionType.Redirect,
      authRequest:{
        scopes: ['user.read']
      }
    },
    {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map(
        [
          ['https://graph.microsoft.com/v1.0/me', ['user.Read']]
        ]        
      )
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard,
    AzureAdDemoService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
