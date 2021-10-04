import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PodcastsComponent } from './podcasts/podcasts.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { CreatorsComponent } from './creators/creators.component';
import { CategoriesComponent } from './categories/categories.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'podcasts',
    component: PodcastsComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'creators',
    component: CreatorsComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'episodes',
    component: EpisodesComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'episodes/:podcast',
    component: EpisodesComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'subscriptions',
    component: SubscriptionsComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'signup',
    component: SignupComponent,
    // canActivate: [RouteGuardService],
  },
  // {
  //   path: 'todos/:id',
  //   component: TodoComponent,
  //   canActivate: [RouteGuardService],
  // },
  // { path: '**', component: ErrorComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule, CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
