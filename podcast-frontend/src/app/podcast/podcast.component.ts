import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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
  myRate = 6;
  averageRate = 3;
  @Input() podcast: Podcast;
  isSubscribedTo$: Observable<boolean>;
  isSubscribedTo: boolean;

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
    this.modalService.dismissAll('Save Click');
    console.log(this.myRate);
  }

  getMyRating(): void {
    this.podcastService
      .getMyRating(this.podcast.id, sessionStorage.getItem('authenticatedUser'))
      .subscribe(
        (response) => {
          // console.log('response in component:' + response);
          this.myRate = response;
        },
        (error) => {
          console.log(JSON.stringify(error));
        }
      );
  }

  getAverageRating(): void {
    this.podcastService.getAvergaeRating(this.podcast.id).subscribe(
      (response) => {
        // console.log('response in component:' + response);
        this.averageRate = response;
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
    console.log('from subscribe method');
    if (!this.isSubscribedTo) {
      this.podcastService
        .subscribeToPodcast(
          this.podcast.id,
          sessionStorage.getItem('authenticatedUser')
        )
        .subscribe(
          (response) => {
            // console.log('data:' + JSON.stringify(response));
            this.isSubscribedTo = true;
            // this.route.navigate(['podcasts']);
          },
          (error) => {
            console.log(JSON.stringify(error));
          }
        );
    } else {
      this.isSubscribedTo = false;
      // this.podcastService
      //   .unsubscribeFromPodcast(
      //     this.podcast.id,
      //     sessionStorage.getItem('authenticatedUser')
      //   )
      //   .subscribe(
      //     (response) => {
      //       console.log('data:' + JSON.stringify(response));
      //       this.isSubscribedTo = false;
      //       // this.route.navigate(['podcasts']);
      //     },
      //     (error) => {
      //       console.log(JSON.stringify(error));
      //     }
      //   );
    }
  }
}
