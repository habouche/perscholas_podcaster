import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Episode, Podcast } from '../podcasts/podcasts.component';
import { PodcastService } from '../service/podcast.service';
import { AngMusicPlayerComponent } from 'ang-music-player';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export class Audio {
  constructor(public url: string, public title: string, public cover: string) {}
}

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css'],
})
export class EpisodesComponent implements OnInit {
  episodes: Episode[];
  podcast: Podcast;
  // audioList: Audio[] = new Audio()[];
  audioList: Audio[] = [];
  @ViewChild('musicPlayer') musicPlayer: AngMusicPlayerComponent;
  // @ViewChildren('musicPlayer') musicPlayer: AngMusicPlayerComponent;
  s3AudioLinks =
    'https://ferhat-perscholas-bucket.s3.us-east-1.amazonaws.com/audios/';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private podcastService: PodcastService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getPodcastById();
    this.getEpisodesByPodcastId();
  }

  playAudio(content, episode: Episode): void {
    this.audioList = [
      new Audio(this.s3AudioLinks + episode.audioLink, episode.title, ''),
    ];
    // this.musicPlayer.audioList = this.audioList;
    // this.musicPlayer.initiateAudioPlayer();
    // this.musicPlayer.play();

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          // this.musicPlayer.pause();
        },
        (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  getPodcastById(): void {
    const id = this.route.snapshot.params.podcast;
    this.podcastService.getPodcastById(id).subscribe(
      (response) => {
        this.podcast = response;
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }

  getEpisodesByPodcastId(): void {
    const id = this.route.snapshot.params.podcast;
    this.podcastService.getPodcastEpisodesById(id).subscribe(
      (response) => {
        this.episodes = response;
        this.episodes.forEach((episode) => {
          this.audioList.push(
            new Audio(this.s3AudioLinks + episode.audioLink, episode.title, '')
          );
        });
        console.log('audios:' + JSON.stringify(this.audioList));
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }
}
