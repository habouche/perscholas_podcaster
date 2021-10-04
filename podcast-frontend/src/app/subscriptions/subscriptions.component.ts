import { Component, OnInit } from '@angular/core';
import { Podcast } from '../podcasts/podcasts.component';
import { SubscriptionService } from '../service/subscription.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css'],
})
export class SubscriptionsComponent implements OnInit {
  subscriptions: Podcast[];
  context = 'subscriptions';
  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {
    console.log(sessionStorage.getItem('authenticatedUser'));
    this.getSubscriptions();
  }

  getSubscriptions(): void {
    this.subscriptionService
      .getSubscriptions(sessionStorage.getItem('authenticatedUser'))
      .subscribe(
        (response) => {
          this.subscriptions = response;
          console.log(JSON.stringify(response));
        },
        (error) => {
          console.log(JSON.stringify(error));
        }
      );
  }
}
