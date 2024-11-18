import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { HelpComponent } from './pages/help/help.component';
import { AboutComponent } from './pages/about/about.component';
import { PrivacySecurityComponent } from './pages/privacy-security/privacy-security.component';
import {ClientComponent} from './pages/client/client.component';
import {NewClientComponent} from './pages/new-client/new-client.component';
import {VipClientComponent} from './pages/vip-client/vip-client.component';
import { NotFoundComponent } from './shared/NotFound/NotFound.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clients', component: ClientsComponent },
  {path: 'clients/new', component: NewClientComponent},
  {path: 'clients/vip', component: VipClientComponent},
  {path:'clients/:id', component: ClientComponent },

  { path: 'help', component: HelpComponent },
  { path: 'about', component: AboutComponent },
  { path: 'privacy-security', component: PrivacySecurityComponent },
  { path: '**', component: NotFoundComponent }, // Redirect for invalid URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
