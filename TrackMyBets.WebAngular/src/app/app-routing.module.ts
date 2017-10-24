import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login.component';
//import { RegisterComponent } from './user/register.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    //{ path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        FormsModule
    ],
  exports: [RouterModule],
  declarations: [
      HomeComponent,
      LoginComponent
  ],
  providers: [
      AuthGuard
  ]
})
export class AppRoutingModule { }
