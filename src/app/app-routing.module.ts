import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'pet',
    loadChildren: './pet/pet.module#PetModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    loadChildren: './account/account.module#AccountModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    loadChildren: './about/about.module#AboutModule',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'pet',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
