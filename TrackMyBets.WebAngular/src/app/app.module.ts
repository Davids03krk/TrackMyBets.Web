import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AuthGuard } from './shared/guards/auth.guard';

import { AppComponent } from './app.component';
import { AppRoutingComponents, RoutingModule } from './app.routing';

import { UserService } from './user/user.service';

@NgModule({
    declarations: [
        AppComponent,
        AppRoutingComponents
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RoutingModule
    ],
    providers: [
        AuthGuard,
        UserService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
