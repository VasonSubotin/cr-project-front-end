import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { ResourceComponent } from './components/resources/resource/resource.component';
import { ScheduleComponent } from './components/resources/resource/schedule/schedule.component';
import { HistoryComponent } from './components/history/history.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'resource/:idResource', component: ResourceComponent },
  { path: 'resource/schedule/:idResource', component: ScheduleComponent },
  { path: 'history', component: HistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
