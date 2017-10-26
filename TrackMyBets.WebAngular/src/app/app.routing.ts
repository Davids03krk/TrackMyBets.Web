import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';
import { RoutingConfig } from '../config/routing.config'

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login.component';

const appRoutes: Routes = [
    {
        path: '', component: HomeComponent, canActivate: [AuthGuard], children: [

        ]
    },
    { path: RoutingConfig.LOGIN_USER, component: LoginComponent }
];

export const AppRoutingComponents = [
    HomeComponent,
    LoginComponent
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);
