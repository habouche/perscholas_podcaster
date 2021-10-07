import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
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
