import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent)},
  { path: 'waterfall', loadComponent: () => import('./waterfall/waterfall.component').then((m) => m.WaterfallComponent) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
