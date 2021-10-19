import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Podcast } from '../podcasts/podcasts.component';
import { PodcastService } from '../service/podcast.service';
import { FormBuilder, FormGroup } from '@angular/forms';

export class PodcastFrom {
  constructor(
    public title: string,
    public description: string,
    public id: string,
    public username: string,
    public image: File
  ) {}
}

@Component({
  selector: 'app-creator-podcast',
  templateUrl: './creator-podcast.component.html',
  styleUrls: ['./creator-podcast.component.css'],
})
export class CreatorPodcastComponent implements OnInit {
  id: number;
  podcastForm: PodcastFrom;
  podcast: Podcast;
  uploadForm: FormGroup;
  constructor(
    private podcastService: PodcastService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      image: [''],
    });
    this.id = +this.route.snapshot.params.id;
    this.podcast = new Podcast(
      null,
      '',
      '',
      '',
      null,
      null,
      null,
      null,
      '',
      null,
      null,
      null,
      null
    );

    if (this.id === -1) {
      // add new podcast
    } else {
      this.podcastService
        .getPodcastById(this.id)
        .subscribe((response) => (this.podcast = response));
    }
  }

  savePodcast(): void {
    if (this.id !== -1) {
      this.podcastService.updatePodcast(this.createForm()).subscribe(
        (response) => {
          this.router.navigate(['mypodcasts']);
        },
        (error) => {}
      );
    } else {
      this.podcastService
        .createPodcast(this.createForm())
        .subscribe((response) => {
          this.router.navigate(['mypodcasts']);
        });
    }
  }

  // updateForm(): PodcastFrom {
  //   const podcastForm = new PodcastFrom(
  //     this.podcast.title,
  //     this.podcast.description,
  //     this.id.toString(),
  //     sessionStorage.getItem('authenticatedUser'),
  //     this.uploadForm.get('image').value
  //   );
  //   return podcastForm;
  // }

  createForm(): FormData {
    const formData = new FormData();
    formData.append('id', this.id.toString() ? this.id.toString() : '');
    formData.append('image', this.uploadForm.get('image').value);
    formData.append('title', this.podcast.title);
    formData.append('description', this.podcast.description);
    formData.append('username', sessionStorage.getItem('authenticatedUser'));
    return formData;
  }

  onFileSelect(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('image').setValue(file);
    }
  }
}
