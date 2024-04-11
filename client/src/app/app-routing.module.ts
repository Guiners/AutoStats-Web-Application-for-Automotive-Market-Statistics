import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth.guard';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { requiredAuth: false },
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { requiredAuth: false },
    canActivate: [AuthGuard],
  },
  // {
  //   path: '',
  //   component: HomeComponent,
  //   data: { requiredAuth: true },
  //   canActivate: [AuthGuard],
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}