import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Params} from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';



import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PushService } from './push.service';
import { UserService } from './services/user.service';
import { ConfigService } from './services/config.service';
import { LoginComponent } from './login/login.component';

const appRoutes=[
  {
    path:'',component:HomeComponent
  }
  ,{
    path: 'login', component: LoginComponent
  }
  ]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpModule,
    FormsModule
    
  ],
  providers: [PushService, ConfigService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
