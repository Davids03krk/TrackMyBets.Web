import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppConfig } from './app.config';
import { UserService } from './user/user.service';

@NgModule({
  declarations: [
      AppComponent     
  ],
  imports: [
      BrowserModule,
      HttpModule,
      AppRoutingModule
  ],
  providers: [
      AppConfig,
      UserService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
