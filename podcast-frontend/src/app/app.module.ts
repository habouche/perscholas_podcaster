import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './service/http/http-interceptor.service';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { PodcastsComponent } from './podcasts/podcasts.component';
import { LogoutComponent } from './logout/logout.component';
import { CreatorsComponent } from './creators/creators.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { CreatorComponent } from './creator/creator.component';
import { FooterComponent } from './footer/footer.component';
import { CreatorPodcastsComponent } from './creator-podcasts/creator-podcasts.component';
import { CreatorPodcastComponent } from './creator-podcast/creator-podcast.component';
import { PodcastComponent } from './podcast/podcast.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    SignupComponent,
    PodcastsComponent,
    LogoutComponent,
    CreatorsComponent,
    EpisodesComponent,
    CategoriesComponent,
    SubscriptionsComponent,
    CreatorComponent,
    FooterComponent,
    CreatorPodcastsComponent,
    CreatorPodcastComponent,
    PodcastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
