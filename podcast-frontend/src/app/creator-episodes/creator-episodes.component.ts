import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Episode } from '../podcasts/podcasts.component';
import { EpisodeService } from '../service/episode.service';
import { PodcastService } from '../service/podcast.service';

@Component({
  selector: 'app-creator-episodes',
  templateUrl: './creator-episodes.component.html',
  styleUrls: ['./creator-episodes.component.css'],
})
export class CreatorEpisodesComponent implements OnInit {
  podcastId;
  toDelete;
  episodes: Episode[];
  message;
  closeResult: string;
  uploadForm: FormGroup;
  uploadFormData;
  //   title: new FormControl(''),
  //   description: new FormControl(''),
  // });

  // title = new FormControl('');
  // description = new FormControl('');

  constructor(
    private podcastSeervice: PodcastService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private episodeService: EpisodeService
  ) {}

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      audio: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(50)]],
    });
    this.uploadFormData = this.uploadForm.get('title').value;
    this.podcastId = +this.route.snapshot.params.id;
    this.getEpisodes();
  }

  get title(): any {
    return this.uploadForm.get('title');
  }
  get description(): any {
    return this.uploadForm.get('description');
  }
  get audio(): any {
    return this.uploadForm.get('audio');
  }

  getEpisodes(): void {
    this.podcastSeervice
      .getPodcastEpisodesById(this.podcastId)
      .subscribe((response) => {
        this.episodes = response;
      });
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

  // deleteThis(delete, episodeId) :void{}

  deleteThis(content, episodeId): void {
    this.toDelete = episodeId;
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

  createForm(): FormData {
    const formData = new FormData();
    formData.append('audio', this.uploadForm.get('audio').value);
    formData.append('title', this.uploadForm.get('title').value);
    formData.append('description', this.uploadForm.get('description').value);
    formData.append('podcastId', this.podcastId);
    return formData;
  }

  onFileSelect(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('audio').setValue(file);
    }
  }

  saveEpisode(): void {
    this.episodeService.addEpisode(this.createForm()).subscribe(
      (response) => {
        this.getEpisodes();
        this.modalService.dismissAll();
      },
      (error) => {}
    );
  }

  deleteEpisode(episodeId): void {
    console.log('id' + episodeId);
    this.episodeService.deleteEpisode(episodeId).subscribe(
      (response) => {
        this.getEpisodes();
        this.modalService.dismissAll();
      },
      (error) => {}
    );
  }
}
