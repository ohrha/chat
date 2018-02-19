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

const appRoutes=[
  {
    path:'',component:HomeComponent
  }
  ]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpModule,
    FormsModule
    
  ],
  providers: [PushService],
  bootstrap: [AppComponent]
})
export class AppModule { }
