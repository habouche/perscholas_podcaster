import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Podcast } from '../podcasts/podcasts.component';
import { PodcastService } from '../service/podcast.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.css'],
})
export class PodcastComponent implements OnInit {
  myRate: number;
  averageRate: number;
  @Input() podcast: Podcast;
  isSubscribedTo$: Observable<boolean>;
  isSubscribedTo: boolean;
  @ViewChild('subscribe_confirm') subscribeModal: ElementRef;
  @ViewChild('unsubscribe_confirm') unSubscribeModal: ElementRef;

  likedClass = 'not_liked';
  closeResult = '';

  constructor(
    public podcastService: PodcastService,
    private http: HttpClient,
    private route: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.isSubscribedTo$ = this.podcastService.isSubscribed(
      this.podcast.id.toString()
    );
    this.isSubscribedTo$.subscribe(
      (response) => {
        // console.log('response in component:' + response);
        this.isSubscribedTo = response;
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
    this.getMyRating();
    this.getAverageRating();
  }

  rate(): void {
    this.podcastService
      .ratePodcast(
        sessionStorage.getItem('authenticatedUser'),
        this.podcast.id,
        this.myRate
      )
      .subscribe(
        (response) => {
          // console.log('my rating response in component:' + response);
          this.averageRate = this.round(response);
          this.modalService.dismissAll('Save Click');
        },
        (error) => {
          console.log(JSON.stringify(error));
        }
      );
  }

  getMyRating(): void {
    this.podcastService
      .getMyRating(this.podcast.id, sessionStorage.getItem('authenticatedUser'))
      .subscribe(
        (response) => {
          // console.log('my rating response in component:' + response);
          this.myRate = response;
        },
        (error) => {
          console.log(JSON.stringify(error));
        }
      );
  }

  // roundToTwo(num): number {
  //   return +(Math.round(num + e + 2) + e - 2);
  // }

  round(num): number {
    const m = Number((Math.abs(num) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
  }

  getAverageRating(): void {
    this.podcastService.getAvergaeRating(this.podcast.id).subscribe(
      (response) => {
        // console.log('response in component:' + response);
        this.averageRate = this.round(response);
        console.log('Average:' + Number(response.toFixed(2)));
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }

  open(content): void {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

  setActiveLikedClass(): void {
    if (this.likedClass === 'not_liked') {
      this.likedClass = 'liked';
      this.podcast.likes++;
    } else {
      this.likedClass = 'not_liked';
      this.podcast.likes--;
    }
  }

  subscribe(): void {
    if (!this.isSubscribedTo) {
      console.log('from subscribe method');
      this.podcastService
        .subscribeToPodcast(
          this.podcast.id,
          sessionStorage.getItem('authenticatedUser')
        )
        .subscribe(
          (response) => {
            // console.log('data:' + JSON.stringify(response));
            this.isSubscribedTo = true;
            this.modalService.open(this.subscribeModal, {
              ariaLabelledBy: 'subscribe_confirm',
            });
            // this.route.navigate(['podcasts']);
          },
          (error) => {
            console.log(JSON.stringify(error));
          }
        );
    } else {
      // this.isSubscribedTo = false;
      console.log('from unsubscribe method');
      this.podcastService
        .unsubscribeFromPodcast(
          this.podcast.id,
          sessionStorage.getItem('authenticatedUser')
        )
        .subscribe(
          (response) => {
            console.log('data:' + JSON.stringify(response));
            this.isSubscribedTo = false;
            this.modalService.open(this.unSubscribeModal, {
              ariaLabelledBy: 'unsubscribe_confirm',
            });

            // this.route.navigate(['podcasts']);
          },
          (error) => {
            console.log(JSON.stringify(error));
          }
        );
    }
  }
}
