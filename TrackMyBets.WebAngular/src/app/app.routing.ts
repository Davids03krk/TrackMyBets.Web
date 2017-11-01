import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';
import { RoutingConfig } from '../config/routing.config'
import { PageNotFoundComponent } from './shared/other-pages/page-not-found/page-not-found.component'

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const appRoutes: Routes = [
    {
        path: '', component: HomeComponent, canActivate: [AuthGuard]//, children: [

        //]
    },
    { path: RoutingConfig.LOGIN_USER, component: LoginComponent },
    { path: RoutingConfig.REGISTER_USER, component: RegisterComponent},
    { path: '**', component: PageNotFoundComponent}
];

export const AppRoutingComponents = [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);
