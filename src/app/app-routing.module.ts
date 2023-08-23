import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { GraphPageComponent } from './graph-page/graph-page.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LayoutComponent },
  // { path: 'graph/:id', component: GraphPageComponent },
  //{ path: 'graph/:id', component: GraphPageComponent, outlet: 'graphOutlet' },
  { path: 'home/:graphId', component: HomePageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}