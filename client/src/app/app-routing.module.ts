import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth.guard';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

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
  {
    path: '',
    component: HomeComponent,
    data: { requiredAuth: true },
    canActivate: [AuthGuard],
  },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
