import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AuthGuard } from './shared/guards/auth.guard';

import { AppComponent } from './app.component';
import { AppRoutingComponents, RoutingModule } from './app.routing';

import { LocalStorageService } from './shared/utils/storage/local-storage.service';
import { SessionService } from './shared/utils/storage/session.service';
import { CookieService } from './shared/utils/storage/cookie.service';

import { CommunicationServer} from './shared/utils/communication/communication.server';
import { CommunicationService } from './shared/utils/communication/communication.service';

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
        UserService,
        CommunicationService,
        CommunicationServer,
        LocalStorageService,
        SessionService,
        CookieService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
